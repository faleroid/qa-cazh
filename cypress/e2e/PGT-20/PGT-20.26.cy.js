import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.26 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.26: Aktifkan filter → tidak ada hasil match', () => {
    cy.intercept('GET', '**/api/v3/announcements/categories*', {
      statusCode: 200,
      body: { data: [], total: 0 }
    }).as('getFilteredEmpty');

    AnnouncementCategoryPage.filterStatus('Nonaktif');
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });
});
