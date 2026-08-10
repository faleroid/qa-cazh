import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.05 - Klik tab Progres', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.05: Buka Detail Siswa → Klik tab Progres → Sistem menampilkan list Progres Kegiatan siswa', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('contain.text', 'Progres');
  });
});
