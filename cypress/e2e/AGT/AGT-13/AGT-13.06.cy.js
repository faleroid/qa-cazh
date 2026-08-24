import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.6 - Cari pelanggaran dengan keyword Deskripsi", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.6: Cari pelanggaran dengan keyword Deskripsi", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.deskripsi);
    cy.wait(800);
    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("body").should("contain.text", testData.pelanggaranData.deskripsi);
  });
});


