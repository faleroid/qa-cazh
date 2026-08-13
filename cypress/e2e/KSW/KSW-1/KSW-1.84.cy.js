import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.84 - Pada popup delete confirmation, klik tombol Hapus', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.84: Pada popup delete confirmation, klik tombol Hapus', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.contains('[role="dialog"] button', /hapus|delete|ya|confirm/i).click({ force: true });
  });
});
