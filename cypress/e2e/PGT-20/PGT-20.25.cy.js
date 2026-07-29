import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.25 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.25: Filter berdasarkan Status (misal: pilih Status "Tidak Aktif")', () => {
    // 1. Langsung edit baris pertama yang ada dari PGT-20.19 menjadi Tidak Aktif
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();

    // 2. Filter status "Tidak Aktif" dan verifikasi hasilnya
    AnnouncementCategoryPage.filterStatus('Tidak Aktif');
    AnnouncementCategoryPage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Tidak Aktif');
    });
  });
});
