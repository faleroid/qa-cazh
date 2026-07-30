import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.40 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.40: Simulasi gagal simpan (server error) di halaman Edit', () => {
    // Intercept seluruh request PUT/PATCH/POST ke API saat simpan Edit
    cy.intercept({ method: /PUT|PATCH|POST/i, url: '**/api/**' }, {
      statusCode: 500,
      body: { message: testData.validationMessages.serverSaveError }
    }).as('editServerError500');

    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaUpdated });
    AnnouncementCategoryPage.saveForm();
    cy.wait('@editServerError500');

    // Verifikasi pesan error 'Gagal menyimpan kategori. Silakan coba lagi.' & pengguna tetap berada di form modal
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.serverSaveError);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.clickBackButton();
  });
});
