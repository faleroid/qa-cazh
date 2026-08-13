import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';

describe('PGT-20.21 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.21: Ganti pagination ke 50 atau 100', () => {
    AnnouncementCategoryPage.changePageSize(50);
    AnnouncementCategoryPage.elements.pageSizeDropdown().should('contain.text', '50');
  });
});
