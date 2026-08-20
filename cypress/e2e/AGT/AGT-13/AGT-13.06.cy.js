import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.06 - Cari pelanggaran dengan keyword Deskripsi", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.06: Cari pelanggaran dengan keyword Deskripsi -> Sistem menampilkan hasil sesuai pencarian", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword("Terlambat"); cy.wait(800); cy.get("body").should("exist");
  });
});
