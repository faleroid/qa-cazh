import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.12 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.12: Aktifkan toggle + kosongkan Jabatan -> Error "Jabatan wajib diisi"', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: '', namaTerang: testData.validForm.namaTerang });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.jabatanRequired);
  });
});
