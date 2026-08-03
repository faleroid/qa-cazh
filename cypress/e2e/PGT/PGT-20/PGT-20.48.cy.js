import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.48 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.48: Buka modal konfirmasi → tekan Esc di keyboard', () => {
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.pressEscKey();
    AnnouncementCategoryPage.elements.deleteModal().should('not.exist');
  });
});
