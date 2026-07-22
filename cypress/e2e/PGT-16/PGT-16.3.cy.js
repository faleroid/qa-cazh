import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.3 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.3: Pilih Instansi dari dropdown -> Data konfigurasi legalitas ter-load', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.elements.dialogContainer().should('not.contain', 'Loading...');
  });
});
