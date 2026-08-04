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
  downloadsFolder: "cypress/downloads",

  e2e: {
    baseUrl: "https://v3.cazh.id",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {

      // Task Pembersihan Otomatis & Pembacaan Excel
      const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
      const resolveDownloadPath = (filePath) =>
        path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);

      const findLatestDownloadedFile = ({ extension = '.xlsx' } = {}) => {
        if (!fs.existsSync(downloadsFolder)) {
          return null;
        }
        const files = fs.readdirSync(downloadsFolder)
          .filter((file) => file.toLowerCase().endsWith(extension.toLowerCase()));
        if (files.length === 0) {
          return null;
        }
        files.sort((a, b) => {
          const aTime = fs.statSync(path.join(downloadsFolder, a)).mtimeMs;
          const bTime = fs.statSync(path.join(downloadsFolder, b)).mtimeMs;
          return bTime - aTime;
        });
        return path.join(downloadsFolder, files[0]);
      };

      on('task', {
        // 1. Task Membersihkan Folder downloads
        deleteDownloads() {
          if (fs.existsSync(downloadsFolder)) {
            const files = fs.readdirSync(downloadsFolder);
            for (const file of files) {
              fs.unlinkSync(path.join(downloadsFolder, file));
            }
          }
          return null;
        },

        // 2. Task Membaca File Excel .xlsx
        readExcel({ filePath }) {
          const resolvedPath = resolveDownloadPath(filePath);
          if (!fs.existsSync(resolvedPath)) {
            return null;
          }
          const workbook = XLSX.readFile(resolvedPath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          return XLSX.utils.sheet_to_json(sheet);
        },

        // 3. Task Mencari file terbaru di folder downloads
        findDownloadedFile({ extension = '.xlsx' } = {}) {
          return findLatestDownloadedFile({ extension });
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
