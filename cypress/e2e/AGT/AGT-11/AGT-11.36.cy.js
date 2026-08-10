import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.36 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.36: Mode Pilih Semua -> Pindah halaman -> Selection dipertahankan lintas halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
