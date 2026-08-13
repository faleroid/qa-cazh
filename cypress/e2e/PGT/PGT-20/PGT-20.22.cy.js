import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.22 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.22: Ketik nama kategori partial (misal "inf") di search box', () => {
    const keyword = testData.search.partialMatchKeyword; // "inf"
    AnnouncementCategoryPage.search(keyword);
    cy.wait(1000);

    // Verifikasi seluruh baris hasil pencarian secara case-insensitive (misal: "Informasi Beasiswa" vs "inf")
    AnnouncementCategoryPage.elements.tableRows().should('have.length.at.least', 1).each(($row) => {
      cy.wrap($row).invoke('text').should((text) => {
        expect(text.toLowerCase()).to.include(keyword.toLowerCase());
      });
    });
  });
});
