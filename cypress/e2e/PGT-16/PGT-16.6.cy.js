import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.6 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.6: Matikan kembali toggle setelah aktif -> 4 sub-field tersembunyi lagi', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });
});
