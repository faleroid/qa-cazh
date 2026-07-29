import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.41 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.41: Set status kategori "Aktif" → buka fitur Tambah/Edit Pengumuman', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Aktif' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(testData.validData.validNamaUpdated, true);
  });
});
