"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const opn = require("open");
const destroyer = require("server-destroy");

const keyPath = path.join(__dirname, "secret.json");
let keys = { redirect_uris: [""] };
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

async function authenticate(oauth2Client, scopes, tokensFile) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(tokensFile)) {
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes.join(" "),
      });
      console.log(`Authorize this app by visiting this url: ${authorizeUrl}`);
      const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf("/") > -1) {
              const qs = new url.URL(req.url, "http://localhost:80")
                .searchParams;
              res.end(
                "Authentication successful! Please return to the console."
              );
              server.destroy();
              const { tokens } = await oauth2Client.getToken(qs.get("code"));
              fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
              oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
              resolve(oauth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(80, () => {
          opn(authorizeUrl, { wait: false }).then((cp) => cp.unref());
        });
      destroyer(server);
    } else {
      oauth2Client.credentials = tokensFile; // eslint-disable-line require-atomic-updates
      resolve(oauth2Client);
    }
  });
}

module.exports = { authenticate };
