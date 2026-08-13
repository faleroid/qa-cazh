import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.01 - Klik tab Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.01: Pada halaman Detail Siswa, klik tab Kesehatan -> Tampil 3 section: Kesehatan, Imunisasi, List Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    StudentDetailPage.verifyKesehatanSections();
  });
});
