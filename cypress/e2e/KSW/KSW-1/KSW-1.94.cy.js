import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.94 - Ubah filter/search saat ada data terpilih', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.94: Ubah filter/search saat ada data terpilih', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); ProgressActivityPage.searchKeyword("Filter");
  });
});
