import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.08 - Cari pelanggaran dengan keyword Poin", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.08: Cari pelanggaran dengan keyword Poin -> Sistem menampilkan hasil sesuai pencarian", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.poin);
    cy.wait(800);
    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("body").should("exist");
  });
});


