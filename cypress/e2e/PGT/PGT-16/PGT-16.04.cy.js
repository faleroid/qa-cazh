import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.4 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.4: Cek default state toggle -> Default OFF, 4 sub-field tersembunyi', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });
});
