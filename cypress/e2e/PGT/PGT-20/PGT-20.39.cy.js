import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.39 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.39: Ubah Nama Kategori jadi nama yang sudah ada di kategori Aktif atau Nonaktif lain → klik Simpan', () => {
    const existingName = 'Pengumuman Akademik'; // Nama dari PGT-20.19
    const testCatName = 'Kategori Uji Duplikat Edit';

    // 1. Buat data kategori baru
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testCatName });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    // 2. Edit kategori baru tersebut dan ubah namanya menjadi nama yang sudah ada ("Pengumuman Akademik")
    AnnouncementCategoryPage.clickEditRowByName(testCatName);
    AnnouncementCategoryPage.fillForm({ namaKategori: existingName });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi sistem menolak duplikasi nama pada form Edit & tutup modal
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });
});
