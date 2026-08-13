import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.10 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.10: Cek label, dropzone, & info message di section Tanda Tangan Digital', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);

    // 1. Verifikasi Label Field "Foto Tanda Tangan (Opsional)"
    LegalityPage.elements.signatureLabel().should('be.visible');

    // 2. Verifikasi Dropzone File Upload Container
    LegalityPage.elements.signatureDropzone().should('be.visible');

    // 3. Verifikasi Tombol "Pilih File" & teks "Untuk diunggah"
    LegalityPage.elements.signatureSelectFileBtn().should('be.visible');
    LegalityPage.elements.signatureUploadText().should('be.visible');

    // 4. Verifikasi Teks Petunjuk/Info Message Foto Tanda Tangan
    LegalityPage.elements.infoMessage().should('be.visible');
  });
});
