import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.11 - Klik tombol Tambah Kegiatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.11: Tab Progres → Klik tombol Tambah Kegiatan → Sistem menampilkan form Tambah Kegiatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');
  });
});
