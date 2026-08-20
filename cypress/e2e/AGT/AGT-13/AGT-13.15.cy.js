import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.15 - Isi Poin Pelanggaran dengan nilai di luar range tipe", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.15: Isi Poin Pelanggaran dengan nilai di luar range tipe (mis. 999)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.get('input[name*="poin"], input[placeholder*="Poin"]').first().type("999", { force: true }); cy.contains("button[type=\"submit\"], button", /simpan/i).click({ force: true }); }); cy.wait(400); cy.get('[role="dialog"]').should("be.visible");
  });
});
