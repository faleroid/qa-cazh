import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.14 - Upload file dengan format/struktur data yang tidak sesuai template', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.14: Upload file dengan format/struktur data yang tidak sesuai template', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
