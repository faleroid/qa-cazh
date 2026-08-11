import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.08 - Cari data dengan keyword Kegiatan yang cocok', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.08: Tambah kegiatan baru → Cari keyword Kegiatan → Sistem menampilkan list sesuai hasil pencarian', () => {
    // 1. Navigasi ke Detail Siswa -> Tab Progres
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 2. Tambah Kegiatan Baru
    cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(testData.newActivity.name);
      cy.get('textarea[name="description"]').clear().type(testData.newActivity.description);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);

    // 3. Cari keyword Kegiatan yang baru saja dibuat
    StudentDetailPage.searchKeyword(testData.newActivity.name);

    // 4. Verifikasi data kegiatan tampil pada tabel hasil pencarian
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', testData.newActivity.name);
  });
});
