import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.17 - Isi Poin Pelanggaran dengan angka > 100", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.17: Isi Poin Pelanggaran dengan angka > 100 (mis. 101)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.get('input[name*="poin"]').first().type("101", { force: true }); cy.contains("button[type=\"submit\"], button", /simpan/i).click({ force: true }); }); cy.wait(400); cy.get('[role="dialog"]').should("be.visible");
  });
});
