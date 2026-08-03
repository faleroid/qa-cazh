import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.34 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.34: Kosongkan Nama Kategori di Edit → klik Simpan', () => {
    // 1. Klik Edit pada baris pertama
    AnnouncementCategoryPage.clickEditRow(0);

    // 2. Berikan jeda waktu agar modal Edit terbuka sempurna & data ter-load
    cy.wait(1500);

    // 3. Kosongkan input Nama Kategori & klik Simpan
    AnnouncementCategoryPage.fillForm({ namaKategori: '' });
    AnnouncementCategoryPage.saveForm();

    // 4. Verifikasi pesan validasi error "Nama kategori harus diisi." & tutup modal
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
    AnnouncementCategoryPage.clickBackButton();
  });
});
