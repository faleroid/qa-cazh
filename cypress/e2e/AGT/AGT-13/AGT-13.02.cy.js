import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.2 - Cek header Poin Pelanggaran Terkumpul", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.2: Cek header Poin Pelanggaran Terkumpul", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.verifyPelanggaranHeaderPoin();
  });
});
