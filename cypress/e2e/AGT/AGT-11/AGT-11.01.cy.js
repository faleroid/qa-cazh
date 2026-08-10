import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.01 - Login admin → menu Anggota → Siswa → Aksi → Detail', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.01: Navigasi ke Detail Siswa → Verifikasi header info (Foto, Tahun Ajaran, Tingkat, Kelas, Semester, Instansi, Total Tagihan, Total Transaksi)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyHeaderInfo();
  });
});
