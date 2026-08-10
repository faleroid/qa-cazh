import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.11 - Cek field pada form Import Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.11: Cek field pada form Import Progres Kegiatan', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
