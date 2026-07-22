import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.17 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.17: Upload TTD format .JPG (< 2MB) -> Format JPG diterima & simpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });
});
