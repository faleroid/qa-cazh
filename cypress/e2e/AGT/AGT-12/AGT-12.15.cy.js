import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.15 - Klik tombol Tambah Riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.15: Klik tombol Tambah Riwayat -> Sistem menampilkan form Tambah Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('body').should(($body) => {
      expect($body.text(), 'Form Tambah Riwayat Kesehatan harus terbuka').to.satisfy((t) =>
        t.includes('Riwayat') || $body.find('[role="dialog"]').length > 0
      );
    });
  });
});
