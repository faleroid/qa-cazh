import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.3 - Cek kolom pada tabel List Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.3: Cek kolom pada tabel List Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.verifyPelanggaranTableColumns();
  });
});
