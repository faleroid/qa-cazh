import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.45 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.45 Ubah Nama Tipe Pelanggaran jadi nama yang SUDAH ADA (duplikat) -> klik Simpan', () => {
    // 1. Buat data dummy terlebih dahulu untuk diedit
    const timestamp = Date.now().toString().slice(-4);
    const dummyName = `Dummy Edit Duplikat ${timestamp}`;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: dummyName,
      minPoin: '25',
      maxPoin: '30'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 2. Klik Edit pada data dummy yang baru dibuat
    cy.contains('tbody tr', dummyName)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)')
      .first()
      .click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.formModal().should('be.visible');

    // 3. Ganti nama dengan nama yang sudah ada dari PGT-18.22 ('Penggunaan Ponsel Saat KBM')
    ViolationTypePage.fillModalForm({ nama: 'Penggunaan Ponsel Saat KBM' });
    ViolationTypePage.saveForm();

    // 4. Verifikasi Notif Error 'Nama tipe pelanggaran sudah ada' / Toast error muncul
    ViolationTypePage.verifyValidationError('sudah');

    // 5. Data tidak tersimpan (modal tetap terbuka & tombol simpan tetap aktif)
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('be.enabled');

    // 6. Tutup modal secara manual agar tidak mengganggu tes berikutnya
    ViolationTypePage.cancelForm();
  });
});
