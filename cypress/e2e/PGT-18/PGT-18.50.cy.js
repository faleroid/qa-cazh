import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.50 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it("PGT-18.50 Set status 'Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.contains('h1', 'Pelanggaran').should('be.visible');
    cy.get('table[data-slot="data-grid-table"]').should('be.visible');
  });
});
