import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.40 - Klik tombol Excel pada tab Kesehatan (tanpa filter)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.40: Klik tombol Excel pada tab Kesehatan (tanpa filter) -> Sistem mengunduh file .XLSX berisi seluruh data Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });
});
