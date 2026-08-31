import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.3: Cek kolom pada tabel List Prestasi', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.3: Cek kolom pada tabel List Prestasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();
    StudentDetailPage.verifyPrestasiTableColumns();
  });
});
