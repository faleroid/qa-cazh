import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.15 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.15: Setelah tambah sukses → buka fitur Tambah/Edit Pengumuman → cek dropdown Kategori', () => {
    const newCategoryName = testData.validData.validNamaKategori2; // "Kegiatan Ekstrakurikuler"

    // 1. Langsung klik Tambah Kategori tanpa pencarian awal
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: newCategoryName });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);

    // 2. Pindah ke halaman Buat Pengumuman & cek ketersediaan kategori baru di dropdown "Pilih kategori"
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(newCategoryName, true);
  });
});
