import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.78 - Cek field pada form Edit Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.78: Cek field pada form Edit Progres Kegiatan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
