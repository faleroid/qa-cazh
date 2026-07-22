import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.18 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.18: Upload TTD format .JPEG (< 2MB) -> Format JPEG diterima & simpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpeg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });
});
