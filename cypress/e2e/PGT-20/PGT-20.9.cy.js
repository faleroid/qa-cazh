import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.9 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.9: Isi Nama Kategori dengan karakter khusus DIIZINKAN (misal "Info & Update.") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaAllowedChar });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.contains('tbody tr', testData.validData.validNamaAllowedChar).should('be.visible');
  });
});
