import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.12 - Cek field pada form Tambah Kegiatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.12: Buka form Tambah Kegiatan → Verifikasi field Nama Kegiatan* (required) dan Deskripsi (optional)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('label', /nama kegiatan/i).should('exist');
      cy.contains('label', /deskripsi/i).should('exist');
    });
  });
});
