import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.92 - Pada popup Hapus Bulk, klik tombol Batal', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.92: Pada popup Hapus Bulk, klik tombol Batal', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });
});
