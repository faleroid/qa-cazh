import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.29 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.29 Aktifkan Filter Instansi (pilih 1 instansi)', () => {
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().eq(1).click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });
});
