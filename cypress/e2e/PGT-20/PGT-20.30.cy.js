import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.30 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.30: Klik btn "Kembali" / Close (X) di atas modal Edit', () => {
    // 1. Buka modal Edit Kategori
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');

    // 2. Klik tombol Close (X) dengan icon lucide-x di kanan atas modal
    AnnouncementCategoryPage.elements.modalCloseXBtn().click({ force: true });
    cy.wait(1000);

    // 3. Verifikasi modal Edit Kategori tertutup
    AnnouncementCategoryPage.elements.formModal().should('not.exist');
  });
});
