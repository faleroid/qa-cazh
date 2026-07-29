import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.44 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.44: Klik tombol Hapus di row kategori (misal kategori "Info")', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.elements.deleteModal().should('be.visible');
    AnnouncementCategoryPage.elements.deleteModal().contains('button', /ya, hapus|hapus/i).should('be.visible');
    AnnouncementCategoryPage.elements.deleteModal().contains('button, a', /batal|cancel/i).should('be.visible');
  });
});
