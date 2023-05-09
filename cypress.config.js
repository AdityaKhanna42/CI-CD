const { defineConfig } = require("cypress");
const gmailTester = require("gmail-tester");
const path = require("path");

module.exports = defineConfig({
  retries: {
    runMode: 0,
    openMode: 0,
  },

  video: true,
  chromeWebSecurity: false,
  failOnStatusCode: false,
  videoUploadOnPasses: false,
  failOnNonZeroExit: false,
  defaultCommandTimeout: 20000,
  execTimeout: 30000,
  pageLoadTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 80000,
  viewportWidth: 1600,
  viewportHeight: 1200,
  screenshotOnRunFailure: true,

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        "gmail:get-messages": async (args) => {
          const messages = await gmailTester.get_messages(
            path.resolve(__dirname, "././gmail-utils/credentials.json"),
            path.resolve(__dirname, "././gmail-utils/token.json"),
            args.options
          );
          return messages;
        },
      });
      on("task", {
        "gmail:check-messages": async (args) => {
          const message = await gmailTester.check_inbox(
            path.resolve(__dirname, "././gmail-utils/credentials.json"),
            path.resolve(__dirname, "././gmail-utils/token.json"),
            args.options
          );
          return message;
        },
      });
      return require("./cypress/plugin/index.js")(on, config);
    },
    specPattern: "cypress/integration",
  },
});
