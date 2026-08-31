import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.2: Cek header Poin Prestasi Terkumpul', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.2: Cek header Poin Prestasi Terkumpul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();
    StudentDetailPage.verifyPrestasiHeaderPoin();
  });
});
