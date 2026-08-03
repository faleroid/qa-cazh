const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'czwj6u',
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  scrollBehavior: false,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 15000,

  e2e: {
    baseUrl: "https://v3.cazh.id",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
