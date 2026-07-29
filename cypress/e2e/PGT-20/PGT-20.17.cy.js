import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.17 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.17: Cek Aksi di setiap row', () => {
    AnnouncementCategoryPage.elements.tableRows().first().within(() => {
      cy.get('button, a').filter(':has(svg.lucide-square-pen), :has(svg.lucide-pencil), :contains("Edit")').should('be.visible');
      cy.get('button, a').filter(':has(svg.lucide-trash), :contains("Hapus")').should('be.visible');
    });
  });
});
