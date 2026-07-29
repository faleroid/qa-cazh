import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.33 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.33: Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan', () => {
    // 1. Filter data berstatus Tidak Aktif
    AnnouncementCategoryPage.filterStatus('Tidak Aktif');
    cy.wait(1000);

    // 2. Klik Edit pada baris pertama dan ubah status ke Aktif
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Aktif' });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi notifikasi toast & perubahan badge status menjadi "Aktif"
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
    AnnouncementCategoryPage.filterStatus('Aktif');
    AnnouncementCategoryPage.elements.rowStatusBadge(0).should('contain.text', 'Aktif');

    // Clean up: Reset filter ke Semua
    AnnouncementCategoryPage.filterStatus('Semua');
  });
});
