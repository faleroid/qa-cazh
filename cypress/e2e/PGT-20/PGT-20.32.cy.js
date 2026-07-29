import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.32 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.32: Ubah Status dari "Aktif" ke "Tidak Aktif" → klik Simpan', () => {
    // 1. Filter data berstatus Aktif
    AnnouncementCategoryPage.filterStatus('Aktif');
    cy.wait(1000);

    // 2. Klik Edit pada baris pertama dan ubah status ke Tidak Aktif
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();

    // 3. Verifikasi notifikasi toast & perubahan badge status menjadi "Tidak Aktif"
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
    AnnouncementCategoryPage.filterStatus('Tidak Aktif');
    AnnouncementCategoryPage.elements.rowStatusBadge(0).should('contain.text', 'Tidak Aktif');

    // Clean up: Reset filter ke Semua
    AnnouncementCategoryPage.filterStatus('Semua');
  });
});
