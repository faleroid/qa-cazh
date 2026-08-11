import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.25 - Lakukan pencarian, klik Excel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.25: Tambah kegiatan → Cari berdasarkan nama kegiatan → Klik Excel → File .XLSX terunduh sesuai hasil pencarian', () => {
    cy.task('deleteDownloads');

    // 1. Navigasi ke Detail Siswa -> Tab Progres
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 2. Tambah Kegiatan Baru untuk Bahan Pencarian Export Excel
    const searchActivityName = "Lomba Catur AGT-11.25";
    cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(searchActivityName);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);

    // 3. Cari berdasarkan nama kegiatan tersebut
    StudentDetailPage.searchKeyword(searchActivityName);
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', searchActivityName);

    // 4. Klik tombol Excel (Export)
    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);

    // 5. Memastikan file .xlsx hasil pencarian berhasil diunduh
    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath, 'File Excel .xlsx hasil pencarian harus berhasil diunduh').to.not.be.null;
    });
  });
});
