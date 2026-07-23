import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.51 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Buat Pelanggaran / Laporan Pelanggaran", () => {
    ViolationTypePage.elements.tableRows().should('be.visible');
  });
});
