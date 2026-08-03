import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.10 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.10: Isi Nama Kategori dengan kombinasi huruf, angka, spasi (misal "Info 2026") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaAlphanumeric });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.contains('tbody tr', testData.validData.validNamaAlphanumeric).should('be.visible');
  });
});
