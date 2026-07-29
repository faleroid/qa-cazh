import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.46 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.46: Klik btn "Ya, Hapus" pada kategori yang MASIH DIPAKAI oleh pengumuman aktif', () => {
    cy.intercept('DELETE', '**/api/v3/announcements/categories/*', {
      statusCode: 400,
      body: { message: testData.validationMessages.deleteInUseError }
    }).as('deleteInUseErrorResponse');

    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.confirmDelete();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.deleteInUseError);
  });
});
