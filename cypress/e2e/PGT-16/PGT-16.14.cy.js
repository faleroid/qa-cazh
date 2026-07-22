import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.14 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.14: Aktifkan toggle + kosongkan semua field required -> Error di semua 3 field', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: '', jabatan: '', namaTerang: '' });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.genericRequired);
  });
});
