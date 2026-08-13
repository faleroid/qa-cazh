import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.96 - Pindah halaman saat selection berasal dari centang manual per halaman', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.96: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });
});
