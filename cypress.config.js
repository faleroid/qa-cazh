const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

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
  screenshotsFolder: "cypress/screenshots",
  downloadsFolder: "cypress/downloads",
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://academicdemo.cazh.id/",
    supportFile: path.join(__dirname, "cypress/support/e2e.js"),
    setupNodeEvents(on, config) {
      on('task', {
        // 1. Task Membersihkan Folder downloads
        deleteDownloads() {
          const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
          if (fs.existsSync(downloadsFolder)) {
            const files = fs.readdirSync(downloadsFolder);
            for (const file of files) {
              try {
                fs.unlinkSync(path.join(downloadsFolder, file));
              } catch (e) {}
            }
          }
          return null;
        },

        // 2. Task Mencari File Hasil Download Terbaru (dengan polling/penungguan file selesai diunduh)
        findDownloadedFile(params = {}) {
          const downloadsFolder = params.folderPath || path.join(__dirname, 'cypress', 'downloads');
          const ext = params.fileExtension || 'xlsx';
          if (!fs.existsSync(downloadsFolder)) {
            return null;
          }
          const files = fs.readdirSync(downloadsFolder);
          // Abaikan file sementara .crdownload atau .tmp
          const matchingFiles = files.filter(f => {
            const lower = f.toLowerCase();
            return lower.endsWith('.' + ext.toLowerCase()) && !lower.endsWith('.crdownload') && !lower.endsWith('.tmp');
          });
          if (matchingFiles.length === 0) {
            return null;
          }
          matchingFiles.sort((a, b) => {
            const statA = fs.statSync(path.join(downloadsFolder, a));
            const statB = fs.statSync(path.join(downloadsFolder, b));
            return statB.mtimeMs - statA.mtimeMs;
          });
          return path.join(downloadsFolder, matchingFiles[0]);
        },

        // 3. Task Membaca File Excel .xlsx
        readExcel({ filePath }) {
          if (!filePath || !fs.existsSync(filePath)) {
            return null;
          }
          try {
            const XLSX = require("xlsx");
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            return XLSX.utils.sheet_to_json(sheet);
          } catch (err) {
            console.error("XLSX library error:", err.message);
            return null;
          }
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
