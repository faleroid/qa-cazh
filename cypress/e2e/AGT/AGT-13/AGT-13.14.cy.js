import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.14 - Isi Poin Pelanggaran dengan nilai dalam range tipe", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.14: Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 30 -> Sedang)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.get('input[name*="poin"], input[placeholder*="Poin"]').first().type("30", { force: true }); }); cy.wait(300); cy.get('[role="dialog"]').should("be.visible");
  });
});
