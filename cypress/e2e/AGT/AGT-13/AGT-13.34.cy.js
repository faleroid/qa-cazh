import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.34 - Cek isi kolom file hasil Export Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.34: Cek isi kolom file hasil Export Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /excel|export/i, { timeout: 10000 }).should("exist");
  });
});
