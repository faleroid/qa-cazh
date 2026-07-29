import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.16 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.16: Buka halaman Daftar Kategori Pengumuman', () => {
    // 1. Verifikasi Judul Halaman Utama <h1> "Kategori Pengumuman"
    cy.contains('h1', 'Kategori Pengumuman').should('be.visible');

    // 2. Verifikasi Judul Card Header <h3> "Data Kategori Pengumuman"
    cy.contains('[data-slot="card-title"], h3', 'Data Kategori Pengumuman').should('be.visible');

    // 3. Verifikasi Tombol "Tambah Kategori"
    cy.contains('button', 'Tambah Kategori').should('be.visible');

    // 4. Verifikasi Kolom Header Tabel "Nama Kategori" dan "Status"
    cy.get('thead').should('contain.text', 'Nama Kategori').and('contain.text', 'Status');
  });
});
