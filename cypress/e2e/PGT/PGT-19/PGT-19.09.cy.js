import PermissionTimePage from '../../../pages/PermissionTimePage';

describe('PGT-19.9 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.9 Aktifkan toggle + kosongkan field jam -> klik Simpan', () => {
    // 1. Reset toggle OFF & Simpan untuk mengembalikan konfigurasi awal ke kondisi bersih
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    cy.wait(1000);

    // 2. Aktifkan toggle ON (field jam otomatis muncul dalam kondisi default kosong --:--)
    PermissionTimePage.toggleOn();
    cy.wait(800);

    // 3. Tanpa menyentuh/mengetik pada field jam, langsung klik Simpan
    PermissionTimePage.save();

    // 4. Verifikasi sistem menolak dan menampilkan pesan validasi error wajib diisi
    PermissionTimePage.elements.validationError().should('be.visible');
  });
});
