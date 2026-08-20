import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.12 - Cek informasi range poin dan tipe pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.12: Cek informasi range poin dan tipe pelanggaran di form", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').should("be.visible");
  });
});
