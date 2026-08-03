import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.15 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.15: Isi semua required + skip upload TTD (Optional) -> Data disimpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });
});
