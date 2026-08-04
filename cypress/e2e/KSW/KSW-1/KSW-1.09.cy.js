import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.09 - Cek isi kolom file hasil Export Progres Kegiatan', () => {
  before(() => {
    cy.task('deleteDownloads');
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.09: Membuktikan secara ketat file Excel memuat 10 kolom real DOM: No, Instansi, Nama Siswa, No Kartu Siswa, Tingkat-Kelas, Tanggal Dibuat, Dibuat Oleh, Kegiatan, Deskripsi, Pencapaian Terakhir', () => {
    // 1. Unduh file Excel
    cy.contains('button', 'Excel').should('be.visible').click({ force: true });
    cy.wait(2500);

    // 2. Baca file Excel dari cypress/downloads/
    cy.task('findDownloadedFile', { extension: '.xlsx' })
      .should('be.a', 'string')
      .then((filePath) => cy.task('readExcel', { filePath }))
      .then((rows) => {
        expect(rows, 'File Excel harus berisi data').to.be.an('array').that.is.not.empty;

        const firstRow = rows[0];
        const actualColumns = Object.keys(firstRow);

      // 3. Daftar 10 kolom real aktual dari file Excel CAZH V3
      const expectedColumns = [
        'No',
        'Instansi',
        'Nama Siswa',
        'No Kartu Siswa',
        'Tingkat-Kelas',
        'Tanggal Dibuat',
        'Dibuat Oleh',
        'Kegiatan',
        'Deskripsi',
        'Pencapaian Terakhir'
      ];

      // 4. Verifikasi ketat ke-10 kolom real wajib ada di header Excel
      expectedColumns.forEach((col) => {
        const isColumnPresent = actualColumns.some((actualCol) =>
          actualCol.toLowerCase().includes(col.toLowerCase())
        );
        expect(isColumnPresent, `File Excel wajib memuat kolom '${col}'`).to.be.true;
      });
    });
  });
});
