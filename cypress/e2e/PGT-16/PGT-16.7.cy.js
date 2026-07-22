import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.7 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.7: Cek placeholder field Pengesahan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(0).invoke('attr', 'placeholder').should('exist');
  });
});
