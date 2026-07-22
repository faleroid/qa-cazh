import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.10 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.10: Cek info message di section Tanda Tangan Digital', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.infoMessage().should('be.visible');
  });
});
