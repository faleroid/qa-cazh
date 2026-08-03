import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.20 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.20: Cek pagination default value', () => {
    AnnouncementCategoryPage.elements.pageSizeDropdown().should('contain.text', '10');
  });
});
