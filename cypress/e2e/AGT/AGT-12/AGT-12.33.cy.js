import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.33 - Pada popup Hapus Bulk, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.33: Pada popup Hapus Bulk, klik tombol Batal -> Selection tetap dipertahankan; kembali ke tab Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).click({ force: true });
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
  });
});
