import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.12 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.12: Isi Nama Kategori dengan nama yang SUDAH ADA di kategori Nonaktif ("Info 2026") → klik Simpan', () => {
    const categoryName = testData.validData.validNamaAlphanumeric; // "Info 2026" (dibuat pada PGT-20.10)

    // 1. Edit baris spesifik kategori "Info 2026" -> ubah statusnya menjadi Tidak Aktif
    AnnouncementCategoryPage.clickEditRowByName(categoryName);
    cy.wait(1000);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1000);

    // 2. Klik Tambah -> coba buat kategori baru dengan nama "Info 2026" yang sama
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: categoryName, status: 'Aktif' });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi sistem menolak duplikasi nama & tutup modal
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });
});
