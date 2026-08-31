import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

const data = testData.prestasiData;
const card = () => cy.get('[data-slot="card"]', { timeout: 15000 }).filter((i, el) => /prestasi/i.test(el.innerText || '')).first();
const openPrestasi = () => {
  StudentDetailPage.navigateToFirstStudentDetail();
  StudentDetailPage.clickPrestasiTab();
  card().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
};
const realRows = () => card().find('tbody tr').then(($rows) => Array.from($rows).filter((row) => {
  const text = (row.textContent || '').replace(/\s+/g, ' ').trim();
  return text && !/tidak ditemukan|belum ada|kosong|empty/i.test(text) &&
    Array.from(row.querySelectorAll('td')).some((td) => (td.textContent || '').trim() && !/^(---|-|â€”)$/.test((td.textContent || '').trim()));
}));
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


describe('AGT-14.5: Cari prestasi dengan keyword kategori', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.5: Cari prestasi dengan keyword kategori', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Buat / pastikan data prestasi ada terlebih dahulu
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Lakukan pencarian dengan keyword Kategori
    cy.get('input[placeholder*="Cari"], input[type="search"]', { timeout: 15000 })
      .first()
      .clear({ force: true })
      .type(`${data.kategori}{enter}`, { force: true });
    cy.wait(1000);

    // 3. Verifikasi hasil pencarian menampilkan data sesuai kategori
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', data.kategori);
  });
});
