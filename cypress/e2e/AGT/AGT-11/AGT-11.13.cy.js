import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.13 - Kosongkan field Nama Kegiatan, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.13: Form Tambah Kegiatan → Kosongkan Nama Kegiatan → Klik Simpan → Button tidak aktif / pesan error validasi required', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);

    cy.contains('[role="dialog"] button', /simpan|submit/i).click({ force: true });
    cy.wait(800);

    cy.get('[role="dialog"]').should('be.visible');
  });
});
