import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.16 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.16: Upload TTD format .PNG (< 2MB) -> Berhasil ter-upload & simpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validPng);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });
});
