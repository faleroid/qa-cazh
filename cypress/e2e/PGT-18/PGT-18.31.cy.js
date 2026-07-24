import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.31 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.31 Aktifkan Filter Status = 'Tidak Aktif'", () => {
    ViolationTypePage.ensureInactiveDataExists();
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });

    // 2. Klik opsi "Tidak Aktif" secara presisi (exact match ^Tidak Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Tidak Aktif\s*$/i).first().click({ force: true });
    cy.wait(1500);

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Tidak Aktif'
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Tidak Aktif');
    });
  });
});
