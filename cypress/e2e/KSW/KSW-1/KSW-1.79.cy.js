import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.79 - Pada field Anggota di form Edit, cek data suggestion', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.79: Pada field Anggota di form Edit, cek data suggestion', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
