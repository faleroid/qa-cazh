import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.5 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.5: Isi Nama Kategori dengan 1 karakter (misal "A") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.singleChar });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameMinLength);
  });
});
