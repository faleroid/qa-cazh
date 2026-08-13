import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.19 - Klik tombol Batal pada form Tambah Riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.19: Klik tombol Batal pada form Tambah Riwayat -> Sistem menutup form tanpa menyimpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat|tambah kesehatan/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /batal|cancel/i).click({ force: true });
        });
      } else {
        cy.contains('button', /batal|cancel/i).click({ force: true });
      }
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
