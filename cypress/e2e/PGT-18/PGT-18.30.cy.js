import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.30 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.30 Aktifkan Filter Status = 'Aktif'", () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    ViolationTypePage.ensureDataExists();
    cy.wait(2000);
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);

    // 2. Klik opsi "Aktif" secara presisi (exact match ^Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Aktif\s*$/i).first().click({ force: true });
    
    // Jeda lebih lama (4 detik) agar API backend filter status selesai memuat data dan tabel ter-render ulang secara penuh
    cy.wait(4000);
    cy.get('tbody', { timeout: 15000 }).should('be.visible');

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Aktif'
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').then(($rows) => {
      $rows.each((_, row) => {
        expect(Cypress.$(row).text()).to.include('Aktif');
      });
    });
  });
});
