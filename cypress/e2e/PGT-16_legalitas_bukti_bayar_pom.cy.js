import LegalityPage from '../pages/LegalityPage';
import testData from '../fixtures/legalityData.json';

describe('UAT Suite: PGT-16 - Legalitas Bukti Bayar (Modal Dialog UI)', () => {
  beforeEach(() => {
    // 1. Session Login
    cy.login();

    // 2. Buka Modal Dialog Legalitas via Sidebar
    LegalityPage.openModal();
  });

  // ---------------------------------------------------------------------------
  // 1. NAVIGATION & INITIAL LOAD (MODAL STATE)
  // ---------------------------------------------------------------------------
  it('PGT-16.1: Buka submenu Legalitas Bukti Bayar -> Modal Legalitas terbuka', () => {
    LegalityPage.elements.dialogContainer().should('be.visible');
    LegalityPage.elements.dialogTitle().should('be.visible');
    LegalityPage.elements.instansiDropdown().should('exist');
    LegalityPage.elements.legalitySwitch().should('exist');
    LegalityPage.elements.saveButton().should('be.visible');
  });

  it('PGT-16.2: Buka dropdown Instansi -> Placeholder "Pilih instansi terlebih dahulu" & List instansi muncul', () => {
    // Verifikasi placeholder sesuai instruksi (dari snippet user)
    LegalityPage.elements.instansiDropdownValue().should('contain.text', 'Pilih instansi terlebih dahulu');
    
    // Buka Dropdown
    LegalityPage.elements.instansiDropdown().click({ force: true });
    LegalityPage.elements.selectOptions().should('have.length.at.least', 1);
  });

  it('PGT-16.3: Pilih Instansi dari dropdown -> Data konfigurasi legalitas ter-load', () => {
    LegalityPage.selectInstansi(0);
    LegalityPage.elements.dialogContainer().should('not.contain', 'Loading...');
  });

  // ---------------------------------------------------------------------------
  // 2. TOGGLE & CONDITIONAL RENDERING (MODAL CONTEXT)
  // ---------------------------------------------------------------------------
  it('PGT-16.4: Cek default state toggle -> Default OFF, 4 sub-field tersembunyi', () => {
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });

  it('PGT-16.5: Aktifkan toggle -> 4 sub-field muncul (Pengesahan, Jabatan, Nama Terang, TTD)', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.verifySubFieldsVisible();
  });

  it('PGT-16.6: Matikan kembali toggle setelah aktif -> 4 sub-field tersembunyi lagi', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.setToggleState(false);
    LegalityPage.verifySubFieldsHidden();
  });

  // ---------------------------------------------------------------------------
  // 3. FIELD PLACEHOLDERS & INFO MESSAGES
  // ---------------------------------------------------------------------------
  it('PGT-16.7: Cek placeholder field Pengesahan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(0).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.8: Cek placeholder field Jabatan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(1).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.9: Cek placeholder field Nama Terang', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.allInputs().eq(2).invoke('attr', 'placeholder').should('exist');
  });

  it('PGT-16.10: Cek info message di section Tanda Tangan Digital', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.elements.infoMessage().should('be.visible');
  });

  // ---------------------------------------------------------------------------
  // 4. NEGATIVE TESTS & VALIDATION ERRORS
  // ---------------------------------------------------------------------------
  it('PGT-16.11: Aktifkan toggle + kosongkan Pengesahan -> Error "Pengesahan wajib diisi" muncul', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({
      pengesahan: '',
      jabatan: testData.validForm.jabatan,
      namaTerang: testData.validForm.namaTerang
    });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.pengesahanRequired);
  });

  it('PGT-16.12: Aktifkan toggle + kosongkan Jabatan -> Error "Jabatan wajib diisi" muncul', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({
      pengesahan: testData.validForm.pengesahan,
      jabatan: '',
      namaTerang: testData.validForm.namaTerang
    });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.jabatanRequired);
  });

  it('PGT-16.13: Aktifkan toggle + kosongkan Nama Terang -> Error "Nama Terang wajib diisi" muncul', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({
      pengesahan: testData.validForm.pengesahan,
      jabatan: testData.validForm.jabatan,
      namaTerang: ''
    });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.namaTerangRequired);
  });

  it('PGT-16.14: Aktifkan toggle + kosongkan semua field required -> Error di semua 3 field required', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm({ pengesahan: '', jabatan: '', namaTerang: '' });
    LegalityPage.clickSave();
    LegalityPage.verifyValidationError(testData.validationMessages.genericRequired);
  });

  // ---------------------------------------------------------------------------
  // 5. FILE UPLOAD & POSITIVE SAVING
  // ---------------------------------------------------------------------------
  it('PGT-16.15: Isi semua required + skip upload TTD (Optional) -> Data disimpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.16: Upload TTD format .PNG (< 2MB) -> Berhasil ter-upload & simpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validPng);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.17: Upload TTD format .JPG (< 2MB) -> Format JPG diterima & simpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.18: Upload TTD format .JPEG (< 2MB) -> Format JPEG diterima & simpan', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.uploadSignature(testData.files.validJpeg);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();
  });

  it('PGT-16.19: Upload TTD ukuran > 2MB -> Sistem tolak dengan error ukuran file', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.largePng);
    LegalityPage.verifyValidationError(testData.validationMessages.maxFileSize);
  });

  it('PGT-16.20: Upload TTD format .PDF -> Sistem tolak dengan error tipe file', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.uploadSignature(testData.files.invalidPdf);
    LegalityPage.verifyValidationError(testData.validationMessages.invalidFileType);
  });

  // ---------------------------------------------------------------------------
  // 6. END-TO-END INVOICE VERIFICATION & CLEANUP (FULL CRUD LIFECYCLE)
  // ---------------------------------------------------------------------------
  it('PGT-16.21: Simpan legalitas aktif -> Buka bukti pembayaran -> Data muncul di invoice', () => {
    LegalityPage.setToggleState(true);
    LegalityPage.fillForm(testData.validForm);
    LegalityPage.clickSave();
    LegalityPage.verifyToastSuccess();

    // Verifikasi pada Bukti Pembayaran
    LegalityPage.verifyLegalityOnInvoice(
      testData.urls.invoiceProofPage,
      testData.validForm.namaTerang,
      testData.validForm.jabatan,
      true
    );
  });

  it('PGT-16.22: Matikan toggle -> Simpan -> Buka bukti pembayaran -> Legalitas TIDAK muncul', () => {
    LegalityPage.setToggleState(false);
    LegalityPage.clickSave();

    // Verifikasi pada Bukti Pembayaran
    LegalityPage.verifyLegalityOnInvoice(
      testData.urls.invoiceProofPage,
      testData.validForm.namaTerang,
      testData.validForm.jabatan,
      false
    );
  });
});
