import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.20 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.20: Upload TTD format .PDF -> Sistem tolak dengan error tipe file', () => {
    LegalityPage.selectInstansi(0);
    cy.wait(1000);
    LegalityPage.setToggleState(true);
    cy.wait(100);
    LegalityPage.uploadSignature(testData.files.invalidPdf);
    cy.wait(100);
    LegalityPage.verifyValidationError(testData.validationMessages.invalidFileType);
  });
});
