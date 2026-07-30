import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.18 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.18: Cek tampilan jika data kosong (Empty State)', () => {
    // 1. Hapus data kategori jika ada data di tabel
    AnnouncementCategoryPage.deleteAllCategoriesIfExists();
    cy.wait(1000);

    // 2. Verifikasi elemen dan pesan data kosong (Empty State)
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });
});
