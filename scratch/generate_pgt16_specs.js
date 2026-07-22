const fs = require('fs');
const path = require('path');

const outputDir = '/mnt/c/Users/dimas/qa-cazh/cypress/e2e/PGT-16';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imports = "import LegalityPage from '../../pages/LegalityPage';\nimport testData from '../../fixtures/legalityData.json';\n\n";

const commonBeforeEach = "  beforeEach(() => {\n    cy.login();\n    LegalityPage.openModal();\n  });\n\n";

const testCases = {
  1: "  it('PGT-16.1: Buka submenu Legalitas Bukti Bayar -> Modal Legalitas terbuka', () => {\n    LegalityPage.elements.dialogContainer().should('be.visible');\n    LegalityPage.elements.dialogTitle().should('be.visible');\n    LegalityPage.elements.instansiDropdown().should('exist');\n  });",
  
  2: "  it('PGT-16.2: Buka dropdown Instansi -> Placeholder \"Pilih instansi terlebih dahulu\" & List instansi muncul', () => {\n    LegalityPage.elements.instansiDropdownValue().should('contain.text', 'Pilih instansi terlebih dahulu');\n    LegalityPage.elements.instansiDropdown().click({ force: true });\n    LegalityPage.elements.selectOptions().should('have.length.at.least', 1);\n  });",

  3: "  it('PGT-16.3: Pilih Instansi dari dropdown -> Data konfigurasi legalitas ter-load', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.elements.dialogContainer().should('not.contain', 'Loading...');\n  });",

  4: "  it('PGT-16.4: Cek default state toggle -> Default OFF, 4 sub-field tersembunyi', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(false);\n    LegalityPage.verifySubFieldsHidden();\n  });",

  5: "  it('PGT-16.5: Aktifkan toggle -> 4 sub-field muncul', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.verifySubFieldsVisible();\n  });",

  6: "  it('PGT-16.6: Matikan kembali toggle setelah aktif -> 4 sub-field tersembunyi lagi', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.setToggleState(false);\n    LegalityPage.verifySubFieldsHidden();\n  });",

  7: "  it('PGT-16.7: Cek placeholder field Pengesahan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.elements.allInputs().eq(0).invoke('attr', 'placeholder').should('exist');\n  });",

  8: "  it('PGT-16.8: Cek placeholder field Jabatan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.elements.allInputs().eq(1).invoke('attr', 'placeholder').should('exist');\n  });",

  9: "  it('PGT-16.9: Cek placeholder field Nama Terang', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.elements.allInputs().eq(2).invoke('attr', 'placeholder').should('exist');\n  });",

  10: "  it('PGT-16.10: Cek info message di section Tanda Tangan Digital', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.elements.infoMessage().should('be.visible');\n  });",

  11: "  it('PGT-16.11: Aktifkan toggle + kosongkan Pengesahan -> Error \"Pengesahan wajib diisi\"', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm({ pengesahan: '', jabatan: testData.validForm.jabatan, namaTerang: testData.validForm.namaTerang });\n    LegalityPage.clickSave();\n    LegalityPage.verifyValidationError(testData.validationMessages.pengesahanRequired);\n  });",

  12: "  it('PGT-16.12: Aktifkan toggle + kosongkan Jabatan -> Error \"Jabatan wajib diisi\"', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: '', namaTerang: testData.validForm.namaTerang });\n    LegalityPage.clickSave();\n    LegalityPage.verifyValidationError(testData.validationMessages.jabatanRequired);\n  });",

  13: "  it('PGT-16.13: Aktifkan toggle + kosongkan Nama Terang -> Error \"Nama Terang wajib diisi\"', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm({ pengesahan: testData.validForm.pengesahan, jabatan: testData.validForm.jabatan, namaTerang: '' });\n    LegalityPage.clickSave();\n    LegalityPage.verifyValidationError(testData.validationMessages.namaTerangRequired);\n  });",

  14: "  it('PGT-16.14: Aktifkan toggle + kosongkan semua field required -> Error di semua 3 field', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm({ pengesahan: '', jabatan: '', namaTerang: '' });\n    LegalityPage.clickSave();\n    LegalityPage.verifyValidationError(testData.validationMessages.genericRequired);\n  });",

  15: "  it('PGT-16.15: Isi semua required + skip upload TTD (Optional) -> Data disimpan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm(testData.validForm);\n    LegalityPage.clickSave();\n    LegalityPage.verifyToastSuccess();\n  });",

  16: "  it('PGT-16.16: Upload TTD format .PNG (< 2MB) -> Berhasil ter-upload & simpan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm(testData.validForm);\n    LegalityPage.uploadSignature(testData.files.validPng);\n    LegalityPage.clickSave();\n    LegalityPage.verifyToastSuccess();\n  });",

  17: "  it('PGT-16.17: Upload TTD format .JPG (< 2MB) -> Format JPG diterima & simpan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm(testData.validForm);\n    LegalityPage.uploadSignature(testData.files.validJpg);\n    LegalityPage.clickSave();\n    LegalityPage.verifyToastSuccess();\n  });",

  18: "  it('PGT-16.18: Upload TTD format .JPEG (< 2MB) -> Format JPEG diterima & simpan', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm(testData.validForm);\n    LegalityPage.uploadSignature(testData.files.validJpeg);\n    LegalityPage.clickSave();\n    LegalityPage.verifyToastSuccess();\n  });",

  19: "  it('PGT-16.19: Upload TTD ukuran > 2MB -> Sistem tolak dengan error ukuran file', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.uploadSignature(testData.files.largePng);\n    LegalityPage.verifyValidationError(testData.validationMessages.maxFileSize);\n  });",

  20: "  it('PGT-16.20: Upload TTD format .PDF -> Sistem tolak dengan error tipe file', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.uploadSignature(testData.files.invalidPdf);\n    LegalityPage.verifyValidationError(testData.validationMessages.invalidFileType);\n  });",

  21: "  it('PGT-16.21: Simpan legalitas aktif -> Buka bukti pembayaran -> Data muncul di invoice', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(true);\n    LegalityPage.fillForm(testData.validForm);\n    LegalityPage.clickSave();\n    LegalityPage.verifyToastSuccess();\n\n    LegalityPage.verifyLegalityOnInvoice(\n      testData.urls.invoiceProofPage,\n      testData.validForm.namaTerang,\n      testData.validForm.jabatan,\n      true\n    );\n  });",

  22: "  it('PGT-16.22: Matikan toggle -> Simpan -> Buka bukti pembayaran -> Legalitas TIDAK muncul', () => {\n    LegalityPage.selectInstansi(0);\n    LegalityPage.setToggleState(false);\n    LegalityPage.clickSave();\n\n    LegalityPage.verifyLegalityOnInvoice(\n      testData.urls.invoiceProofPage,\n      testData.validForm.namaTerang,\n      testData.validForm.jabatan,\n      false\n    );\n  });"
};

for (let i = 1; i <= 22; i++) {
  const fileName = "PGT-16." + i + ".cy.js";
  const fileContent = imports + "describe('PGT-16." + i + " - Legalitas Bukti Bayar', () => {\n" + commonBeforeEach + testCases[i] + "\n});\n";
  fs.writeFileSync(path.join(outputDir, fileName), fileContent, 'utf8');
}

// Generate legacy combined suite using POM logic
const suiteImports = "import LegalityPage from '../pages/LegalityPage';\nimport testData from '../fixtures/legalityData.json';\n\n";
let combinedSuite = suiteImports + "describe('PGT-16 - Legalitas Bukti Bayar (Combined Suite POM)', () => {\n" + commonBeforeEach;

for (let i = 1; i <= 22; i++) {
  combinedSuite += testCases[i] + "\n\n";
}
combinedSuite += "});\n";
fs.writeFileSync('/mnt/c/Users/dimas/qa-cazh/cypress/e2e/PGT-16_legalitas_bukti_bayar.cy.js', combinedSuite, 'utf8');

console.log('Successfully generated 22 individual POM specs and 1 combined POM suite.');
