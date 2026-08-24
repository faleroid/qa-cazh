import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.7 - Cari pelanggaran dengan keyword Sanksi", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.7: Cari pelanggaran dengan keyword Sanksi", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.sanksi);
    cy.wait(800);
    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("body").should("contain.text", testData.pelanggaranData.sanksi);
  });
});


