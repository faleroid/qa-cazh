import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.11 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.11: Aktifkan toggle + kosongkan Pengesahan -> Error "Pengesahan wajib diisi"', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: '', jabatan: testData.validForm.jabatan, namaTerang: testData.validForm.namaTerang });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.pengesahanRequired);
  });
});
