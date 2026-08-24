import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.10 - Klik tombol Tambah Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.10: Klik tombol Tambah Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').should("be.visible");
  });
});
