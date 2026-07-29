import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.28 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.28: Klik tombol Hapus di row kategori', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.elements.deleteModal().should('be.visible');
  });
});
