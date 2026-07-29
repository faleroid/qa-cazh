import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.47 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.47: Buka modal konfirmasi → klik btn "Batal"', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.cancelDelete();
    AnnouncementCategoryPage.elements.deleteModal().should('not.exist');
  });
});
