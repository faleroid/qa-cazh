import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.01 - Klik tab Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.01: Pada halaman Detail Siswa, klik tab Pelanggaran -> Sistem menampilkan tab Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").should("contain.text", "Pelanggaran");
  });
});
