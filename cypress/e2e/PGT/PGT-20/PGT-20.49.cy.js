import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.49 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.49: Setelah hapus sukses → buka fitur Tambah/Edit Pengumuman → cek dropdown kategori', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.confirmDelete();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm('Kategori Dihapus Test', false);
  });
});
