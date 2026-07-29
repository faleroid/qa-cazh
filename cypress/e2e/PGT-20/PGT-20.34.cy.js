import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.34 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.34: Kosongkan Nama Kategori di Edit → klik Simpan', () => {
    // 1. Klik Edit pada baris pertama
    AnnouncementCategoryPage.clickEditRow(0);

    // 2. Kosongkan input Nama Kategori & klik Simpan
    AnnouncementCategoryPage.fillForm({ namaKategori: '' });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi pesan validasi error "Nama kategori harus diisi."
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
  });
});
