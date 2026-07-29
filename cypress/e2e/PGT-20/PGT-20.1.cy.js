import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.1 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.1: Isi form Tambah dengan Nama Kategori valid → klik Simpan', () => {
    // Clean up all existing categories to ensure 100% clean state
    AnnouncementCategoryPage.deleteAllCategoriesIfExists();

    // Proceed to Add Category
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNama });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.contains('tbody tr', testData.validData.validNama).should('be.visible');
    cy.contains('tbody tr', testData.validData.validNama).should('contain.text', 'Aktif');
  });
});
