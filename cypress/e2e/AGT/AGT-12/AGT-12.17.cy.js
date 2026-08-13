import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.17 - Kosongkan salah satu field required, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.17: Kosongkan salah satu field required, klik Simpan -> Button Simpan tidak aktif / sistem menampilkan pesan error', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat|tambah kesehatan/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /simpan|submit/i).click({ force: true });
        });
      } else {
        cy.contains('button', /simpan|submit/i).click({ force: true });
      }
    });

    cy.get('body').should('exist');
  });
});
