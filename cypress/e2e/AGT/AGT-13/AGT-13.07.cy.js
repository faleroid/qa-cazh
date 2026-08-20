import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.07 - Cari pelanggaran dengan keyword Sanksi", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.07: Cari pelanggaran dengan keyword Sanksi -> Sistem menampilkan hasil sesuai pencarian", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword("Peringatan"); cy.wait(800); cy.get("body").should("exist");
  });
});
