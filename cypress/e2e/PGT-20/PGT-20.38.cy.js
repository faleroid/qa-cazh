import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.38 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.38: Ubah Nama Kategori jadi karakter khusus tidak diizinkan (misal "@#$") → klik Simpan', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.disallowedChars });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.disallowedCharsError);
  });
});
