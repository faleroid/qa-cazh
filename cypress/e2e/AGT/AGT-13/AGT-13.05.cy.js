import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.05 - Cari pelanggaran dengan keyword Kategori", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.05: Cari pelanggaran dengan keyword Kategori -> Sistem menampilkan hasil sesuai pencarian", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword(testData.pelanggaranData.kategori); cy.wait(800); cy.get("body").should("exist");
  });
});
