const fs = require("fs");
const path = require("path");

const TOKEN_PATH = "token.json";

function get(token_path) {
  try {
    return JSON.parse(
      fs
        .readFileSync(token_path || path.resolve(__dirname, TOKEN_PATH))
        .toString()
    );
  } catch (error) {
    throw new Error("No token found.");
  }
}

function store(token, token_path) {
  fs.writeFileSync(
    token_path || path.resolve(__dirname, TOKEN_PATH),
    JSON.stringify(token)
  );
}

module.exports = {
  get,
  store,
};
