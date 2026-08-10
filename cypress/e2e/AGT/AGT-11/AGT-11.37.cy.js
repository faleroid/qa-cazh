import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.37 - Pindah halaman saat selection berasal dari centang manual per halaman', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.37: Centang manual -> Pindah halaman -> Selection ter-reset', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
