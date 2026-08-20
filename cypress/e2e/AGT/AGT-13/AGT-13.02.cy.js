import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.02 - Cek header Poin Pelanggaran Terkumpul", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.02: Cek header Poin Pelanggaran Terkumpul -> Menampilkan angka total poin pelanggaran siswa", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.verifyPelanggaranHeaderPoin();
  });
});
