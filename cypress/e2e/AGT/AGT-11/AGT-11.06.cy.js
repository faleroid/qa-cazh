import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.06 - Cek kolom pada tabel List Progres Kegiatan (tab Progres)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.06: Klik tab Progres → Verifikasi kolom tabel (Checkbox, Dibuat, Dibuat Oleh, Kegiatan, Deskripsi, Pencapaian Terakhir, Aksi)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.verifyProgresTableColumns();
  });
});
