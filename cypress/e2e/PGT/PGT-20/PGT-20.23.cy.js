import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.23 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.23: Ketik keyword yang tidak match ("xyz123abc")', () => {
    AnnouncementCategoryPage.search(testData.search.noMatchKeyword);
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });
});
