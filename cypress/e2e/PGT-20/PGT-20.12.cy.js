import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.12 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.12: Isi Nama Kategori dengan nama yang SUDAH ADA di kategori Nonaktif → klik Simpan', () => {
    // 1. Langsung Edit status kategori pada baris pertama menjadi Tidak Aktif
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1000);

    // 2. Klik Tambah dan isi nama yang sama ("Informasi Kegiatan Sekolah")
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNama });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });
});
