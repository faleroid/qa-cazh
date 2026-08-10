import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.13 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.13: Cek state tombol Simpan saat form belum valid (Nama kosong atau invalid)', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.elements.modalSaveBtn().then(($btn) => {
      if (!$btn.is(':disabled')) {
        AnnouncementCategoryPage.saveForm();
        AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
      } else {
        expect($btn).to.be.disabled;
      }
    });
    AnnouncementCategoryPage.clickBackButton();
  });
});
