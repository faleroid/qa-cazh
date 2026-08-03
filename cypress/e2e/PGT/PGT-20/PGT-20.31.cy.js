import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.31 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.31: Ubah Nama Kategori ke nilai valid baru → klik Simpan', () => {
    const updatedName = testData.validData.validNamaUpdated; // "Informasi Kegiatan Sekolah Terbaru"

    // 1. Klik tombol Edit pada baris pertama
    AnnouncementCategoryPage.clickEditRow(0);

    // 2. Isi nama kategori baru & Simpan
    AnnouncementCategoryPage.fillForm({ namaKategori: updatedName });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi toast sukses & data baru muncul di tabel
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
    cy.contains('tbody tr', updatedName).should('be.visible');
  });
});
