import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.26 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.26 Ketik Nama Tipe Pelanggaran di search box', () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    ViolationTypePage.search('Ponsel');
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().first().should('contain.text', 'Ponsel');
  });
});
