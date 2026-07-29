import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.3 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.3: Tutup modal Tambah Kategori dengan tombol "Close (X)"', () => {
    // 1. Buka modal Tambah Kategori
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: 'Draft Kategori Sementara' });

    // 2. Klik tombol Close (X) dengan icon lucide-x di kanan atas modal
    AnnouncementCategoryPage.elements.modalCloseXBtn().click({ force: true });
    cy.wait(1000);

    // 3. Verifikasi modal Tambah Kategori tertutup dan data tidak tersimpan
    AnnouncementCategoryPage.elements.formModal().should('not.exist');
    cy.contains('tbody tr', 'Draft Kategori Sementara').should('not.exist');
  });
});
