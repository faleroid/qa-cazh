import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.30 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.30 Aktifkan Filter Status = 'Aktif'", () => {
    ViolationTypePage.ensureDataExists();
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });

    // 2. Klik opsi "Aktif" secara presisi (exact match ^Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Aktif\s*$/i).first().click({ force: true });
    cy.wait(1500);

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Aktif'
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Aktif');
    });
  });
});
