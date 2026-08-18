import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.42 - Cek isi kolom file hasil Export Riwayat Kesehatan', () => {
  beforeEach(() => {
    cy.login();
    cy.task('deleteDownloads');
  });

  it('AGT-12.42: Cek isi kolom file hasil Export Riwayat Kesehatan -> File berisi kolom: No, Nama, Nomor Kartu, Instansi, Tingkat-Kelas, Tanggal, Indikasi, Tindakan, Keterangan, Dibuat Oleh', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll ke Card 3 Riwayat Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Klik tombol Excel di Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, a', /excel|export/i, { timeout: 10000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .first()
          .click({ force: true });
      });

    // 3. VERIFIKASI PRESISI NAMA KOLOM HEADER DI DALAM FILE EXCEL (.XLSX) DENGAN RETRY POLLING:
    const waitForExcelFile = (retries = 15) => {
      return cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
        if (!filePath && retries > 0) {
          cy.wait(1000);
          return waitForExcelFile(retries - 1);
        }
        return filePath;
      });
    };

    waitForExcelFile().then((filePath) => {
      expect(filePath, 'File Excel hasil download harus ditemukan').to.not.be.null;

      cy.task('readExcel', { filePath }).then((excelRows) => {
        expect(excelRows, 'Isi file Excel memuat array data').to.be.an('array').that.is.not.empty;

        // Ambil nama-nama kolom header dari baris pertama file Excel
        const headers = Object.keys(excelRows[0]);
        cy.log('Kolom Excel ditemukan:', JSON.stringify(headers));

        // Verifikasi persis sesuai header kolom Excel aktual
        const expectedColumns = [
          'No',
          'Nama',
          'Nomor Kartu',
          'Instansi',
          'Tingkat-Kelas',
          'Tanggal',
          'Indikasi',
          'Tindakan',
          'Keterangan',
          'Dibuat Oleh'
        ];

        expectedColumns.forEach((col) => {
          const hasCol = headers.some((h) => h.toLowerCase().trim() === col.toLowerCase().trim() || h.toLowerCase().includes(col.toLowerCase()));
          expect(hasCol, `File Excel harus memuat kolom "${col}"`).to.be.true;
        });
      });
    });
  });
});
