import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.09 - Cari data dengan keyword Deskripsi yang cocok', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.09: Tab Progres → Cari keyword Deskripsi → Sistem menampilkan list sesuai hasil pencarian', () => {
    // 1. Navigasi ke Detail Siswa -> Tab Progres
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 2. Cari keyword Deskripsi (menggunakan data dari kegiatan yang sudah dibuat)
    const descKeyword = "seni dan budaya";
    StudentDetailPage.searchKeyword(descKeyword);

    // 3. Verifikasi data kegiatan dengan deskripsi yang cocok tampil pada baris tabel
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', descKeyword);
  });
});
