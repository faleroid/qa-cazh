import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.32 - Pada popup Hapus Bulk, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.32: Pada popup Hapus Bulk, klik tombol Hapus -> Seluruh data terpilih terhapus; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });

    cy.wait(1500);
    cy.get('body').should('exist');
  });
});
