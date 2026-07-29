import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.40 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.40: Simulasi gagal simpan (server error) di halaman Edit', () => {
    cy.intercept('PUT', '**/api/v3/announcements/categories/*', {
      statusCode: 500,
      body: { message: testData.validationMessages.serverSaveError }
    }).as('editServerError500');

    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaUpdated });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.serverSaveError);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
  });
});
