import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.21 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it.skip('PGT-16.21: Simpan legalitas aktif -> Buka bukti pembayaran -> Data muncul di invoice', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();

    LegalityPage.verifyLegalityOnInvoice(
      testData.urls.invoiceProofPage,
      testData.validForm.namaTerang,
      testData.validForm.jabatan,
      true
    );
  });
});
