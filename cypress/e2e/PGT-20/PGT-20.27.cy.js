import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.27 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.27: Klik tombol Edit di row kategori', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
  });
});
