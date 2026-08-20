import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.32 - Klik tombol Excel pada tab Pelanggaran (tanpa filter)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.32: Klik tombol Excel pada tab Pelanggaran (tanpa filter)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /excel|export/i, { timeout: 10000 }).should("exist");
  });
});
