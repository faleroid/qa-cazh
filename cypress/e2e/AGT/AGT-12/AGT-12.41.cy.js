import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.41 - Lakukan pencarian, klik Excel', () => {
  beforeEach(() => {
    cy.login();
    cy.task('deleteDownloads');
  });

  it('AGT-12.41: Lakukan pencarian, klik Excel -> Sistem mengunduh file .XLSX sesuai hasil pencarian saja', () => {
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

    // 2. Lakukan pencarian berdasarkan keyword spesifik
    const keyword = testData.search.indikasiKeyword;
    StudentDetailPage.searchKeyword(keyword);
    cy.wait(800);

    // Catat jumlah baris yang tampil di tabel UI setelah filter
    let visibleRowCount = 0;
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        visibleRowCount = $rows.length;
        cy.log(`Jumlah baris di tabel UI hasil pencarian: ${visibleRowCount}`);
      });

    // 3. Klik tombol Excel di Card 3
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

    // 4. ASERSI KETAT MEMBACA ISI FILE EXCEL (.XLSX) DENGAN RETRY POLLING:
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
      expect(filePath, 'File Excel hasil download harus ditemukan di folder downloads').to.not.be.null;

      cy.task('readExcel', { filePath }).then((excelRows) => {
        expect(excelRows, 'Isi file Excel harus berupa array data').to.be.an('array').that.is.not.empty;

        // Filter baris yang TIDAK cocok dengan keyword pencarian
        const nonMatchingRows = excelRows.filter((row) => {
          const rowString = JSON.stringify(row).toLowerCase();
          return !rowString.includes(keyword.toLowerCase());
        });

        cy.log(`Total baris di Excel: ${excelRows.length}, Baris tidak cocok: ${nonMatchingRows.length}`);

        // ASERSI KETAT:
        // 1. Tidak boleh ada baris data di Excel yang tidak cocok dengan keyword filter
        expect(nonMatchingRows.length, `Setiap baris file Excel harus sesuai keyword filter "${keyword}". Jika ada data lain, export bermasalah.`).to.equal(0);

        // 2. Jumlah baris di Excel harus persis sama dengan jumlah baris terfilter di UI (bukan seluruh data database)
        expect(excelRows.length, 'Jumlah baris file Excel harus sesuai dengan jumlah baris terfilter di UI').to.equal(visibleRowCount);
      });
    });
  });
});
