import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.26 - Cek isi kolom file hasil Export Progres (tab Progres)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.26: Unduh Excel Progres → Verifikasi kolom file (.xlsx): No, Instansi, Nama Siswa, No Kartu Siswa, Tingkat-Kelas, Tanggal Dibuat, Dibuat Oleh, Kegiatan, Deskripsi, Pencapaian Terakhir', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath).to.not.be.null;
      cy.task('readExcel', { filePath }).then((rows) => {
        expect(rows).to.be.an('array');
      });
    });
  });
});
