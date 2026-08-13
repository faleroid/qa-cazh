import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.90 - Setelah data terpilih, klik tombol Hapus Terpilih', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.90: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true });
  });
});
