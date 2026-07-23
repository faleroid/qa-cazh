import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.45 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.45 Ubah Nama Tipe Pelanggaran jadi nama yang SUDAH ADA (duplikat) -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Pelanggaran Auto 1' });
    ViolationTypePage.saveForm();

    // Notif Error 'Nama tipe pelanggaran sudah ada, silakan gunakan nama lain' muncul
    ViolationTypePage.verifyValidationError('sudah');

    // Data tidak tersimpan (modal tetap terbuka & tombol simpan tetap aktif)
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('be.enabled');
  });
});
