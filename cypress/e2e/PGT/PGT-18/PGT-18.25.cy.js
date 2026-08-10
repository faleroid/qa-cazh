import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.25 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.25 Ganti page size ke 50/100/500/1000', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.changePageSize(50);
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });
});
