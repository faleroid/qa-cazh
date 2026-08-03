import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.14 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.14: Simulasi gagal simpan (server error 500) saat klik Simpan dengan data valid', () => {
    const namaValidTanpaTabrakan = testData.validData.validNamaKategori2;

    // Intercept seluruh request POST simpan dan simulasikan HTTP 500 dari Cypress
    cy.intercept('POST', '**/api/**', {
      statusCode: 500,
      body: { message: testData.validationMessages.serverSaveError }
    }).as('serverError500');

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: namaValidTanpaTabrakan });
    AnnouncementCategoryPage.saveForm();

    // Verifikasi pesan error 'Gagal menyimpan kategori...' & form modal tetap terbuka
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.serverSaveError);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.elements.modalNamaInput().should('have.value', namaValidTanpaTabrakan);

    // Clean up: tutup modal dialog
    AnnouncementCategoryPage.clickBackButton();
  });
});
