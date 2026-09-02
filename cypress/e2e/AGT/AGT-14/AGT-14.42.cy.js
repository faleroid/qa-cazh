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


describe('AGT-14.42: Export tanpa filter', () => {
  beforeEach(() => {
    cy.login();
    cy.task('deleteDownloads');
    cy.wait(1000);
  });

  const ensurePrestasiRows = (retries = 5) => {
    StudentDetailPage.ensurePrestasiDataExists();

    return cy.get('body', { timeout: 20000 }).then(($body) => {
      const rows = Array.from($body.find('[data-slot="card"] tbody tr')).filter((row) => {
        const text = (row.textContent || '').replace(/\s+/g, ' ').trim();
        return text && !/tidak ditemukan|belum ada|kosong|empty/i.test(text) &&
          Array.from(row.querySelectorAll('td')).some((td) => {
            const cell = (td.textContent || '').trim();
            return cell && !/^(---|-|â€”)$/.test(cell);
          });
      });

      if (rows.length === 0 && retries > 0) {
        cy.wait(1000);
        return ensurePrestasiRows(retries - 1);
      }

      expect(rows.length, 'Tab Prestasi harus memiliki data valid sebelum export').to.be.greaterThan(0);
      return rows;
    });
  };

  it('AGT-14.42: Export tanpa filter', () => {
    openPrestasi();
    ensurePrestasiRows().then((rows) => {
      const visibleRowCount = rows.length;

      cy.contains('button, a, [role="button"]', /excel|export/i, { timeout: 20000 })
        .scrollIntoView({ offset: { top: -120, left: 0 } })
        .should('be.visible')
        .first()
        .click({ force: true });

      waitForExcelFile().then((filePath) => {
        expect(filePath, 'File Excel hasil export Prestasi harus dibuat').to.not.be.null;

        cy.task('readExcel', { filePath }).then((excelRows) => {
          const rowsToCheck = Array.isArray(excelRows) ? excelRows : [];
          expect(rowsToCheck, 'File Excel hasil export harus menghasilkan array data').to.be.an('array');
          expect(rowsToCheck.length, 'File Excel hasil export harus memuat seluruh data Prestasi tanpa filter').to.be.at.least(visibleRowCount);

          const headers = Object.keys(rowsToCheck[0] || {}).map((header) => String(header).trim());
          const expectedTerms = ['No', 'Nama', 'Kategori', 'Poin', 'Deskripsi', 'Apresiasi'];
          const hasExpectedColumns = expectedTerms.some((term) => headers.some((header) => header.toLowerCase().includes(term.toLowerCase())));
          expect(hasExpectedColumns, `File Excel harus memuat kolom yang relevan untuk Prestasi: ${headers.join(', ')}`).to.be.true;
        });
      });
    });
  });
});

