import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.45 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.45: Klik btn "Ya, Hapus" di modal konfirmasi (kategori TIDAK dipakai pengumuman aktif)', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.confirmDelete();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.deleteSuccess);
  });
});
