import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.42 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.42: Set status kategori "Nonaktif" → buka fitur Tambah/Edit Pengumuman', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Nonaktif' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(testData.validData.validNamaUpdated, false);
  });
});
