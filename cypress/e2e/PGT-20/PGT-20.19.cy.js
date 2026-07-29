import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.19 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.19: Tambah 2 kategori berturut-turut → reload halaman', () => {
    const cat1 = 'Pengumuman Akademik';
    const cat2 = 'Informasi Beasiswa';

    // 1. Tambah kategori pertama ("Pengumuman Akademik")
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: cat1 });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1000);

    // 2. Tambah kategori kedua ("Informasi Beasiswa")
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: cat2 });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1000);

    // 3. Reload halaman dan verifikasi kedua kategori tetap tampil di tabel
    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    cy.contains('tbody tr', cat1).should('be.visible');
    cy.contains('tbody tr', cat2).should('be.visible');
  });
});
