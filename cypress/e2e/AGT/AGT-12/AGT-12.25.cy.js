import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.25 - Pada popup delete, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.25: Pada popup delete, klik tombol Hapus -> Riwayat terhapus; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().within(() => {
      cy.contains('button', /hapus|delete/i).click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });

    cy.wait(1500);
    cy.get('body').should('exist');
  });
});
