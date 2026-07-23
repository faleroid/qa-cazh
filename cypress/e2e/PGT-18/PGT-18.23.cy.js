import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.23 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.23 Cek default value pagination page size', () => {
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });
});
