import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.2 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.2: Klik btn "Tambah" di halaman list', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.elements.modalTitle().should('contain.text', 'Tambah Kategori');
    AnnouncementCategoryPage.elements.modalCancelBtn().should('be.visible');
    AnnouncementCategoryPage.elements.modalNamaInput().should('have.value', '');
  });
});
