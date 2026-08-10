import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.02 - Cek Filter History Siswa pada halaman Detail Siswa', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.02: Buka Detail Siswa → Verifikasi keberadaan filter History Siswa (Tahun Ajaran, Tingkat, Kelas, Semester)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyHistoryFilters();
  });
});
