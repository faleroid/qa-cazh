import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

const data = testData.prestasiData;
const card = () => cy.get('[data-slot="card"]', { timeout: 15000 }).filter((i, el) => /prestasi/i.test(el.innerText || '')).first();
const openPrestasi = () => {
  StudentDetailPage.navigateToFirstStudentDetail();
  StudentDetailPage.clickPrestasiTab();
  card().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
};
const realRows = () => card().then(($card) => {
  const rows = $card.find('tbody tr');
  if (!rows.length) return [];

  return Array.from(rows).filter((row) => {
    const text = (row.textContent || '').replace(/\s+/g, ' ').trim();
    return text && !/tidak ditemukan|belum ada|kosong|empty/i.test(text) &&
      Array.from(row.querySelectorAll('td')).some((td) => {
        const cell = (td.textContent || '').trim();
        return cell && !/^(---|-|â€”)$/.test(cell);
      });
  });
});
const waitForExcelFile = (retries = 20) => cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
  if (!filePath && retries > 0) {
    cy.wait(1000);
    return waitForExcelFile(retries - 1);
  }
  return filePath;
});
const matchingRows = ($body) => Array.from($body.find('[data-slot="card"] tbody tr')).filter((row) => {
  const text = (row.textContent || '').replace(/\s+/g, ' ').trim();
  return text && !/tidak ditemukan|belum ada|kosong|empty/i.test(text) &&
    Array.from(row.querySelectorAll('td')).some((td) => {
      const cell = (td.textContent || '').trim();
      return cell && !/^(---|-|â€”)$/.test(cell);
    });
});
const waitForSearchResults = (keyword, retries = 10) => cy.get('body', { timeout: 20000 }).then(($body) => {
  const rows = matchingRows($body);
  const text = ($body.text() || '').toLowerCase();
  const hasKeyword = text.includes(keyword.toLowerCase());

  if ((rows.length === 0 || !hasKeyword) && retries > 0) {
    cy.wait(1000);
    return waitForSearchResults(keyword, retries - 1);
  }

  return { rows, hasKeyword };
});
const openForm = () => {
  cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
  cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should('be.visible');
};
const fillPrestasi = (overrides = {}) => {
  const value = { ...data, ...overrides };
  cy.get('[role="dialog"]').within(() => {
    cy.get('button[name="date"], button[data-slot="form-control"], button[data-slot="popover-trigger"], button:contains("Tanggal")').first().click({ force: true });
  });
  cy.get('table.rdp-month_grid tbody button, [role="gridcell"] button, .rdp-day button, .rdp-day').filter(':visible').first().click({ force: true });
  cy.get('[role="dialog"]').within(() => {
    cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(value.kategori, { force: true });
    cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type(value.poin, { force: true });
    cy.get('input[name="description"], textarea[name="description"], textarea').first().clear({ force: true }).type(value.deskripsi, { force: true });
    cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea').last().clear({ force: true }).type(value.apresiasi, { force: true });
    cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
  });
};


describe('AGT-14.43: Export hasil pencarian', () => {
  beforeEach(() => {
    cy.login();
    cy.task('deleteDownloads');
    cy.wait(1000);
  });

  it('AGT-14.43: Lakukan pencarian, klik Excel', () => {
    openPrestasi();

    const searchKeyword = `Export Search ${Date.now()}`;
    StudentDetailPage.addSinglePrestasi({
      kategori: searchKeyword,
      poin: '10',
      deskripsi: `Deskripsi ${searchKeyword}`,
      apresiasi: `Apresiasi ${searchKeyword}`
    });

    StudentDetailPage.searchKeyword(searchKeyword);

    waitForSearchResults(searchKeyword).then(({ rows, hasKeyword }) => {
      expect(hasKeyword, `Keyword "${searchKeyword}" harus muncul di hasil pencarian Prestasi`).to.be.true;
      expect(rows.length, 'Hasil pencarian Prestasi harus menampilkan data valid').to.be.greaterThan(0);

      cy.get('[data-slot="card"]', { timeout: 15000 })
        .filter((i, el) => /prestasi/i.test(el.innerText || ''))
        .first()
        .within(() => {
          cy.contains('button, a, [role="button"]', /excel|export/i, { timeout: 15000 })
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .should('be.visible')
            .first()
            .click({ force: true });
        });

      waitForExcelFile().then((filePath) => {
        expect(filePath, 'File Excel hasil pencarian Prestasi harus diunduh').to.not.be.null;

        cy.task('readExcel', { filePath }).then((excelRows) => {
          expect(excelRows, 'File Excel hasil pencarian harus bisa dibaca').to.be.an('array').that.is.not.empty;

          const nonMatchingRows = excelRows.filter((row) => {
            const rowString = JSON.stringify(row).toLowerCase();
            return !rowString.includes(searchKeyword.toLowerCase());
          });

          expect(nonMatchingRows.length, `Semua baris Excel harus sesuai keyword pencarian "${searchKeyword}"`).to.equal(0);
          expect(excelRows.length, 'Jumlah baris Excel harus sesuai jumlah baris hasil pencarian UI').to.equal(rows.length);
        });
      });
    });
  });
});

