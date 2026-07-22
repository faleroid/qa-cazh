const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pj42mc',
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: "https://v3.cazh.id",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
