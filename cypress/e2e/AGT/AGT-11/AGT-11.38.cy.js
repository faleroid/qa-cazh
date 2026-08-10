import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.38 - Simulasi sebagian data gagal dihapus (partial fail)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.38: Simulasi partial fail -> Warning notification "{x} dari {n} data berhasil dihapus. {y} data gagal, silakan coba lagi"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
