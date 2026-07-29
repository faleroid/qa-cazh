import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.43 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.43: Ubah Nama Kategori → cek di pengumuman existing yang pakai kategori tersebut', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: 'Pengumuman Terbaru Renamed' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm('Pengumuman Terbaru Renamed', true);
  });
});
