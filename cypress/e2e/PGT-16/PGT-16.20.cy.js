import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.20 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.20: Upload TTD format .PDF -> Sistem tolak dengan error tipe file', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.invalidPdf);
    LegalityPage.verifyValidationError(testData.validationMessages.invalidFileType);
  });
});
