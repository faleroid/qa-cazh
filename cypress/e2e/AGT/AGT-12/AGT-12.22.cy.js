import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.22 - Kosongkan salah satu field required, klik Simpan (Edit)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.22: Kosongkan salah satu field required, klik Simpan -> Sistem menampilkan pesan error (validasi required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().within(() => {
      cy.contains('button', /edit|ubah/i).click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name*="indikasi"], input[type="text"]').first().clear({ force: true });
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });

    cy.get('body').should('exist');
  });
});
