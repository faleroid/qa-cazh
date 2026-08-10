import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.04 - Cek daftar Tab pada halaman Detail Siswa', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.04: Buka Detail Siswa → Verifikasi keberadaan 11 tab (Data Diri s/d Progres)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyElevenTabs();
  });
});
