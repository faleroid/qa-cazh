import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.24 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.24: Aktifkan Filter Status = "Aktif"', () => {
    AnnouncementCategoryPage.filterStatus('Aktif');
    cy.wait(1000);

    // Directly target status badge elements in the table natively
    cy.get('tbody tr [data-slot="badge"]', { timeout: 15000 })
      .should('have.length.at.least', 1)
      .each(($badge) => {
        cy.wrap($badge).should('contain.text', 'Aktif');
      });
  });
});
