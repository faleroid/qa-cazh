import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.15 - Klik tombol Tambah Riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.15: Klik tombol Tambah Riwayat -> Sistem menampilkan dialog modal Tambah Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // Assert dialog modal terbuka dengan title 'Tambah Riwayat Kesehatan'
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('[data-slot="dialog-title"]').should('contain.text', 'Tambah Riwayat Kesehatan');
    });
  });
});
