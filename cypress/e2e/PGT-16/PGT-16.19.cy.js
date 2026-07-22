import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.19 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.19: Upload TTD ukuran > 2MB -> Sistem tolak dengan error ukuran file', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.largePng);
    LegalityPage.verifyValidationError(testData.validationMessages.maxFileSize);
  });
});
