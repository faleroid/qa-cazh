const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

module.exports = defineConfig({
  projectId: 'czwj6u',
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  scrollBehavior: false,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 15000,
  video: true,
  videoCompression: 32,
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",


  e2e: {
    baseUrl: "https://v3.cazh.id",
    // Use a relative path for the support file so Cypress can locate it reliably
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      on('task', {
        deleteDownloads() {
          const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
          if (fs.existsSync(downloadsFolder)) {
            const files = fs.readdirSync(downloadsFolder);
            for (const file of files) {
              fs.unlinkSync(path.join(downloadsFolder, file));
            }
          }
          return null;
        },
        readExcel({ filePath }) {
          if (!fs.existsSync(filePath)) {
            return null;
          }
          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          return XLSX.utils.sheet_to_json(sheet);
        },
        // Find the most recently downloaded file with the given extension (default: .xlsx)
        findDownloadedFile({ ext = '.xlsx' } = {}) {
          const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
          if (!fs.existsSync(downloadsFolder)) return null;
          const files = fs.readdirSync(downloadsFolder).filter((f) => fs.statSync(path.join(downloadsFolder, f)).isFile() && f.endsWith(ext));
          if (!files.length) return null;
          files.sort((a, b) => fs.statSync(path.join(downloadsFolder, b)).mtimeMs - fs.statSync(path.join(downloadsFolder, a)).mtimeMs);
          return path.join(downloadsFolder, files[0]);
        }
      });
    },

  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
