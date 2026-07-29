import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';

describe('PGT-20.29 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.29: Klik tombol Edit di row kategori (Form Prefill check)', () => {
    // 1. Klik tombol Edit pada baris pertama
    AnnouncementCategoryPage.clickEditRow(0);

    // 2. Tampilkan dan verifikasi elemen modal form Edit Kategori (UAT Compliance Check)
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.elements.modalTitle().should('contain.text', 'Edit Kategori');
    AnnouncementCategoryPage.elements.modalNamaInput().should('not.have.value', '');
    AnnouncementCategoryPage.elements.modalCancelBtn().should('be.visible');
    AnnouncementCategoryPage.elements.modalSaveBtn().should('be.visible');
  });
});
