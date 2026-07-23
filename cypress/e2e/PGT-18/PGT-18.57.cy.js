import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.57 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.57 Buka Form Tambah Pelanggaran / Laporan Pelanggaran', () => {
    ViolationTypePage.elements.tableRows().should('be.visible');
  });
});
