import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.18 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
  });

  it('PGT-20.18: Cek tampilan jika data kosong (Empty State)', () => {
    // Simulasikan respon API list kategori kosong tanpa menghapus data asli di database
    cy.intercept('GET', '**/api/**', {
      statusCode: 200,
      body: { data: [], total: 0, meta: { total: 0 } }
    }).as('getEmptyCategories');

    AnnouncementCategoryPage.visitList();
    cy.wait(1000);

    cy.contains('h3', 'Belum Ada Kategori').should('be.visible');
    cy.contains('div, span, p', /anda dapat membuat kategori baru/i).should('be.visible');
  });
});
