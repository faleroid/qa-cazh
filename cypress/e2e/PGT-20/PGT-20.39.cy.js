import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.39 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.39: Ubah Nama Kategori jadi nama yang sudah ada di kategori Aktif atau Nonaktif lain → klik Simpan', () => {
    cy.intercept('PUT', '**/api/v3/announcements/categories/*', {
      statusCode: 400,
      body: { message: testData.validationMessages.nameAlreadyUsed }
    }).as('editDuplicateName');

    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.existingActiveCategory });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
  });
});
