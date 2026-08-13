import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.22 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it.skip('PGT-16.22: Matikan toggle -> Simpan -> Buka bukti pembayaran -> Legalitas TIDAK muncul', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(false);
    LegalityPage.clickSave();

    LegalityPage.verifyLegalityOnInvoice(
      testData.urls.invoiceProofPage,
      testData.validForm.namaTerang,
      testData.validForm.jabatan,
      false
    );
  });
});
