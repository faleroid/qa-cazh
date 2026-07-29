import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.22 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.22: Ketik nama kategori partial (misal "inf") di search box', () => {
    AnnouncementCategoryPage.search(testData.search.partialMatchKeyword);
    AnnouncementCategoryPage.elements.tableRows().each(($row) => {
      cy.wrap($row).invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include(testData.search.partialMatchKeyword.toLowerCase());
      });
    });
  });
});
