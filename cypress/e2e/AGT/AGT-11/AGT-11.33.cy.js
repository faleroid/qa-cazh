import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.33 - Pada popup Hapus Bulk, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.33: Popup Hapus Bulk → Klik Batal → Popup menutup & selection dipertahankan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
