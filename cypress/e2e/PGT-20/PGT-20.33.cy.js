import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.33 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.33: Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan', () => {
    // 1. Cari baris yang berstatus Tidak Aktif langsung di tabel tanpa menggunakan filter
    cy.contains('tbody tr', 'Tidak Aktif', { timeout: 15000 }).then(($row) => {
      const rowIndex = $row.index();

      // 2. Klik Edit pada baris berstatus Tidak Aktif tersebut dan ubah ke Aktif
      AnnouncementCategoryPage.clickEditRow(rowIndex);
      AnnouncementCategoryPage.fillForm({ status: 'Aktif' });
      AnnouncementCategoryPage.saveForm();

      // 3. Verifikasi notifikasi toast success & verifikasi badge status baris tersebut menjadi "Aktif"
      AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
      AnnouncementCategoryPage.elements.rowStatusBadge(rowIndex).should('contain.text', 'Aktif');
    });
  });
});
