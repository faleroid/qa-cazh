import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.13 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.13: Aktifkan toggle + kosongkan Nama Terang -> Error "Nama Terang wajib diisi"', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: testData.validForm.jabatan, namaTerang: '' });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.namaTerangRequired);
  });
});
