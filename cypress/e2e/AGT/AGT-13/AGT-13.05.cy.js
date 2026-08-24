import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.5 - Cari pelanggaran dengan keyword Kategori", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.5: Cari pelanggaran dengan keyword Kategori", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    
    // Pastikan data pelanggaran tersedia terlebih dahulu sebelum melakukan pencarian
    StudentDetailPage.ensurePelanggaranDataExists();
    
    StudentDetailPage.searchKeyword(testData.pelanggaranData.kategori);
    cy.wait(800);
    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("body").should("contain.text", testData.pelanggaranData.kategori);
  });
});

