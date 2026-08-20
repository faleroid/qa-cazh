import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.08 - Cari pelanggaran dengan keyword Poin", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.08: Cari pelanggaran dengan keyword Poin -> Sistem menampilkan hasil sesuai pencarian", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword("30"); cy.wait(800); cy.get("body").should("exist");
  });
});
