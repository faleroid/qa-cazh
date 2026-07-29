import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.24 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.24: Aktifkan Filter Status = "Aktif"', () => {
    AnnouncementCategoryPage.filterStatus('Aktif');
    AnnouncementCategoryPage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Aktif');
    });
  });
});
