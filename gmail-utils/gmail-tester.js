const gmail = require("./gmail");
const tokenStore = require("./token-store");

function _get_header(name, headers) {
  const found = headers.find((h) => h.name === name);
  return found && found.value;
}

function _init_query(options) {
  const { to, from, subject, before, after } = options;
  let query = "";
  if (to) {
    query += `to:"${to}" `;
  }
  if (from) {
    query += `from:"${from}" `;
  }
  if (subject) {
    query += `subject:(${subject}) `;
  }
  if (after) {
    const after_epoch = Math.round(new Date(after).getTime() / 1000);
    query += `after:${after_epoch} `;
  }
  if (before) {
    const before_epoch = Math.round(new Date(before).getTime() / 1000);
    query += `before:${before_epoch} `;
  }
  query = query.trim();
  return query;
}

async function _get_recent_email(credentials, token, options = {}) {
  const emails = [];

  const query = _init_query(options);
  // Load client secrets from a local file.
  const oAuth2Client = await gmail.authorize(credentials, token);
  const gmail_emails = await gmail.get_recent_email(
    oAuth2Client,
    query,
    options.label
  );
  for (const gmail_email of gmail_emails) {
    const email = {
      from: _get_header("From", gmail_email.payload.headers),
      subject: _get_header("Subject", gmail_email.payload.headers),
      receiver: _get_header("Delivered-To", gmail_email.payload.headers),
      date: new Date(+gmail_email["internalDate"]),
    };
    if (options.include_body) {
      let email_body = {
        html: "",
        text: "",
      };
      const { body } = gmail_email.payload;
      if (body.size) {
        switch (gmail_email.payload.mimeType) {
          case "text/html":
            email_body.html = Buffer.from(body.data, "base64").toString("utf8");
            break;
          case "text/plain":
          default:
            email_body.text = Buffer.from(body.data, "base64").toString("utf8");
            break;
        }
      } else {
        let parts = [...gmail_email.payload.parts];
        while (parts.length) {
          let part = parts.shift();

          if (part.parts) {
            parts = parts.concat(part.parts);
          }

          if (part.mimeType === "text/plain") {
            email_body.text = Buffer.from(part.body.data, "base64").toString(
              "utf8"
            );
          } else if (part.mimeType === "text/html") {
            email_body.html = Buffer.from(part.body.data, "base64").toString(
              "utf8"
            );
          }
        }
      }

      email.body = email_body;
    }

    if (options.include_attachments) {
      email.attachments = await gmail.get_email_attachments(
        oAuth2Client,
        gmail_email
      );
    }
    emails.push(email);
  }
  return emails;
}

async function __check_inbox(credentials, token, options = {}) {
  const { subject, from, to, wait_time_sec, max_wait_time_sec } = options;
  try {
    console.log(
      `[gmail] Checking for message from '${from}', to: ${to}, contains '${subject}' in subject...`
    );
    let found_emails = null;
    let done_waiting_time = 0;
    do {
      const emails = await _get_recent_email(credentials, token, options);
      if (emails.length > 0) {
        console.log(`[gmail] Found!`);
        found_emails = emails;
        break;
      }
      console.log(
        `[gmail] Message not found. Waiting ${wait_time_sec} seconds...`
      );
      done_waiting_time += wait_time_sec;
      if (done_waiting_time >= max_wait_time_sec) {
        console.log("[gmail] Maximum waiting time exceeded!");
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, wait_time_sec * 1000));
    } while (!found_emails);
    return found_emails;
  } catch (err) {
    console.log("[gmail] Error:", err);
    throw err;
  }
}

async function check_inbox(
  credentials,
  token,
  options = {
    subject: undefined,
    from: undefined,
    to: undefined,
    wait_time_sec: 30,
    max_wait_time_sec: 30,
    include_body: false,
    label: "INBOX",
  }
) {
  if (typeof options !== "object") {
    console.error(
      "[gmail-tester] This functionality is obsolete! Please pass all params of check_inbox() in options object."
    );
    process.exit(1);
  }
  return __check_inbox(credentials, token, options);
}

async function get_messages(credentials, token, options) {
  try {
    return await _get_recent_email(credentials, token, options);
  } catch (err) {
    console.log("[gmail] Error:", err);
  }
}

async function refresh_access_token(credentials, token) {
  const oAuth2Client = await gmail.authorize(credentials, token);
  const refresh_token_result = await oAuth2Client.refreshToken(
    oAuth2Client.credentials.refresh_token
  );
  if (refresh_token_result && refresh_token_result.tokens) {
    const new_token = tokenStore.get(token);
    if (refresh_token_result.tokens.access_token) {
      new_token.access_token = refresh_token_result.tokens.access_token;
    }
    if (refresh_token_result.tokens.refresh_token) {
      new_token.refresh_token = refresh_token_result.tokens.refresh_token;
    }
    if (refresh_token_result.tokens.expiry_date) {
      new_token.expiry_date = refresh_token_result.tokens.expiry_date;
    }
    tokenStore.store(new_token, token);
  } else {
    throw new Error(
      `Refresh access token failed! Respose: ${JSON.stringify(
        refresh_token_result
      )}`
    );
  }
}

module.exports = {
  check_inbox,
  get_messages,
  refresh_access_token,
};
