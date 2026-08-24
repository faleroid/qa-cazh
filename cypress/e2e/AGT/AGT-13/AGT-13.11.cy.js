import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.11 - Cek field pada form Tambah Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.11: Cek field pada form Tambah Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.contains("label", /tanggal/i).should("be.visible"); cy.contains("label", /kategori/i).should("be.visible"); cy.contains("label", /poin/i).should("be.visible"); });
  });
});
