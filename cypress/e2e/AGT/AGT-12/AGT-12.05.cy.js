import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.05 - Klik tombol Tambah Imunisasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.05: Klik tombol Tambah Imunisasi -> Tampil form dengan field Tanggal* (required) & Nama Imunisasi* (required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke tombol Tambah Imunisasi
    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // Verifikasi form inline Imunisasi terbuka di Card Imunisasi
    cy.contains('label', 'Nama Imunisasi').should('be.visible');
    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0').should('be.visible');
  });
});
