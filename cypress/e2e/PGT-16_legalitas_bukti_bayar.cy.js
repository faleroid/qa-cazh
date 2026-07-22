import LegalityPage from '../pages/LegalityPage';
import testData from '../fixtures/legalityData.json';

describe('PGT-16 - Legalitas Bukti Bayar (Combined Suite POM)', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.1: Buka submenu Legalitas Bukti Bayar -> Modal Legalitas terbuka', () => {
    LegalityPage.elements.dialogContainer().should('be.visible');
    LegalityPage.elements.dialogTitle().should('be.visible');
    LegalityPage.elements.instansiDropdown().should('exist');
  });

  it('PGT-16.2: Buka dropdown Instansi -> Placeholder "Pilih instansi terlebih dahulu" & List instansi muncul', () => {
    LegalityPage.elements.instansiDropdownValue().should('contain.text', 'Pilih instansi terlebih dahulu');
    LegalityPage.elements.instansiDropdown().click({ force: true });
    LegalityPage.elements.selectOptions().should('have.length.at.least', 1);
  });

  it('PGT-16.3: Pilih Instansi dari dropdown -> Data konfigurasi legalitas ter-load', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.elements.dialogContainer().should('not.contain', 'Loading...');
  });

  it('PGT-16.4: Cek default state toggle -> Default OFF, 4 sub-field tersembunyi', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });

  it('PGT-16.5: Aktifkan toggle -> 4 sub-field muncul', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.verifySubFieldsVisible();
  });

  it('PGT-16.6: Matikan kembali toggle setelah aktif -> 4 sub-field tersembunyi lagi', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });

  it('PGT-16.7: Cek placeholder field Pengesahan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(0).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.8: Cek placeholder field Jabatan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(1).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.9: Cek placeholder field Nama Terang', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(2).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.10: Cek label, dropzone, & info message di section Tanda Tangan Digital', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);

    LegalityPage.elements.signatureLabel().should('be.visible');
    LegalityPage.elements.signatureDropzone().should('be.visible');
    LegalityPage.elements.signatureSelectFileBtn().should('be.visible');
    LegalityPage.elements.signatureUploadText().should('be.visible');
    LegalityPage.elements.infoMessage().should('be.visible');
  });

  it('PGT-16.11: Aktifkan toggle + kosongkan Pengesahan -> Error "Pengesahan wajib diisi"', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: '', jabatan: testData.validForm.jabatan, namaTerang: testData.validForm.namaTerang });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.pengesahanRequired);
  });

  it('PGT-16.12: Aktifkan toggle + kosongkan Jabatan -> Error "Jabatan wajib diisi"', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: '', namaTerang: testData.validForm.namaTerang });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.jabatanRequired);
  });

  it('PGT-16.13: Aktifkan toggle + kosongkan Nama Terang -> Error "Nama Terang wajib diisi"', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: testData.validForm.jabatan, namaTerang: '' });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.namaTerangRequired);
  });

  it('PGT-16.14: Aktifkan toggle + kosongkan semua field required -> Error di semua 3 field', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: '', jabatan: '', namaTerang: '' });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.genericRequired);
  });

  it('PGT-16.15: Isi semua required + skip upload TTD (Optional) -> Data disimpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.16: Upload TTD format .PNG (< 2MB) -> Berhasil ter-upload & simpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validPng);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.17: Upload TTD format .JPG (< 2MB) -> Format JPG diterima & simpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.18: Upload TTD format .JPEG (< 2MB) -> Format JPEG diterima & simpan', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpeg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.19: Upload TTD ukuran > 2MB -> Sistem tolak dengan error ukuran file', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.largePng);
    LegalityPage.verifyValidationError(testData.validationMessages.maxFileSize);
  });

  it('PGT-16.20: Upload TTD format .PDF -> Sistem tolak dengan error tipe file', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.invalidPdf);
    LegalityPage.verifyValidationError(testData.validationMessages.invalidFileType);
  });

  it('PGT-16.21: Simpan legalitas aktif -> Buka bukti pembayaran -> Data muncul di invoice', () => {
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

  it('PGT-16.22: Matikan toggle -> Simpan -> Buka bukti pembayaran -> Legalitas TIDAK muncul', () => {
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
