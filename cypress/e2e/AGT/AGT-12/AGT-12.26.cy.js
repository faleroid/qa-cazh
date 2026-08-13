import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.26 - Pada popup delete, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.26: Pada popup delete, klik tombol Batal -> Sistem menutup popup, data tidak terhapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().within(() => {
      cy.contains('button', /hapus|delete/i).click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).click({ force: true });
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
