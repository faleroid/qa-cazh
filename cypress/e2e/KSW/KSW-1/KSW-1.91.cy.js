import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.91 - Pada popup Hapus Bulk, klik tombol Hapus', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.91: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true }); cy.contains('[role="dialog"] button', /hapus|delete|ya|confirm/i).click({ force: true });
  });
});
