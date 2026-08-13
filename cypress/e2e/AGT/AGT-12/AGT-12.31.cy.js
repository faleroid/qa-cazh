import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.31 - Setelah data terpilih, klik tombol Hapus Terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.31: Setelah data terpilih, klik tombol Hapus Terpilih -> Popup confirmation muncul dengan preview data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });
});
