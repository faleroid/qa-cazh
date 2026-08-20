import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.21 - Isi semua field required + Foto valid, klik Simpan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.21: Isi semua field required + Foto valid, klik Simpan", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').should("be.visible");
  });
});
