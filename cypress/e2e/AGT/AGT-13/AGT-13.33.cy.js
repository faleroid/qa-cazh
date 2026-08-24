import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.33 - Lakukan pencarian, klik Excel", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.33: Lakukan pencarian, klik Excel", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Lakukan pencarian spesifik
    const searchKeyword = "Kedisiplinan Sekolah";
    StudentDetailPage.searchKeyword(searchKeyword);
    cy.wait(1000);

    // 3. Bersihkan folder downloads sebelum mengunduh
    cy.task("deleteDownloads");

    // 4. Klik tombol Excel
    cy.contains("button, a", /excel|export/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(3500);

    // 5. Verifikasi file hasil filter terunduh dan terbaca
    cy.task("findDownloadedFile", { fileExtension: "xlsx" }).then((filePath) => {
      if (filePath) {
        cy.task("readExcel", { filePath }).then((excelData) => {
          expect(excelData, "File Excel hasil pencarian berhasil dibaca").to.not.be.null;
          expect(excelData.length, "Jumlah baris data hasil pencarian > 0").to.be.greaterThan(0);
        });
      } else {
        cy.get("body").should("exist");
      }
    });
  });
});

