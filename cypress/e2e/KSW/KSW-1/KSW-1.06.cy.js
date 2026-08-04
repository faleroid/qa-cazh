import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.06 - Cari data dengan keyword yang tidak cocok/tidak ditemukan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.06: Cari data dengan keyword yang tidak cocok/tidak ditemukan', () => {
    ProgressActivityPage.searchKeyword("KeywordTidakDitemukanXYZ999"); ProgressActivityPage.verifyEmptyState();
  });
});
