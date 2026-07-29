import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.11 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.11: Isi Nama Kategori dengan nama yang SUDAH ADA di kategori Aktif → klik Simpan', () => {
    // Langsung klik Tambah dan isi nama yang sudah ada dari PGT-20.1 ("Informasi Kegiatan Sekolah")
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNama });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });
});
