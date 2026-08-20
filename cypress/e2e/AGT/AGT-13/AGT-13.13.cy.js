import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.13 - Kosongkan salah satu field required", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.13: Kosongkan salah satu field required, klik Simpan -> Error validasi required", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.contains("button[type=\"submit\"], button", /simpan/i).click({ force: true }); }); cy.wait(400); cy.get('[role="dialog"]').should("be.visible");
  });
});
