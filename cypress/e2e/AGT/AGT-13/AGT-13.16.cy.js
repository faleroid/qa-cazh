import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.16 - Isi Poin Pelanggaran dengan nilai negatif", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.16: Isi Poin Pelanggaran dengan nilai negatif (mis. -5)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.get('input[name*="poin"]').first().type("-5", { force: true }); }); cy.wait(300); cy.get('[role="dialog"]').should("be.visible");
  });
});
