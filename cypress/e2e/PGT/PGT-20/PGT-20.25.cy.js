import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';

describe('PGT-20.25 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.25: Filter berdasarkan Status (misal: pilih Status "Tidak Aktif")', () => {
    // 1. Edit baris pertama (row 0) menjadi status "Tidak Aktif"
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    // 2. Filter status "Tidak Aktif"
    AnnouncementCategoryPage.filterStatus('Tidak Aktif');
    cy.wait(1000);

    // 3. Directly target status badge elements in the table natively
    cy.get('tbody tr [data-slot="badge"]', { timeout: 15000 })
      .should('have.length.at.least', 1)
      .each(($badge) => {
        cy.wrap($badge).should('contain.text', 'Tidak Aktif');
      });
  });
});
