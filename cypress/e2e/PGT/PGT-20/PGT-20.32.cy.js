import AnnouncementCategoryPage from '../../../pages/AnnouncementCategoryPage';
import testData from '../../../fixtures/announcementCategoryData.json';

describe('PGT-20.32 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.32: Ubah Status dari "Aktif" ke "Tidak Aktif" → klik Simpan', () => {
    // 1. Cari baris yang berstatus Aktif langsung di tabel tanpa menggunakan filter
    cy.contains('tbody tr', 'Aktif', { timeout: 15000 }).then(($row) => {
      const rowIndex = $row.index();

      // 2. Klik Edit pada baris berstatus Aktif tersebut dan ubah ke Tidak Aktif
      AnnouncementCategoryPage.clickEditRow(rowIndex);
      AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
      AnnouncementCategoryPage.saveForm();

      // 3. Verifikasi notifikasi toast success & verifikasi badge status baris tersebut menjadi "Tidak Aktif"
      AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
      AnnouncementCategoryPage.elements.rowStatusBadge(rowIndex).should('contain.text', 'Tidak Aktif');
    });
  });
});
