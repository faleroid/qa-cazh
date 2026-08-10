import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.85 - Pada popup delete confirmation, klik tombol Batal', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.85: Pada popup delete confirmation, klik tombol Batal', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });
});
