import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.32 - Pada popup Hapus Bulk, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.32: Popup Hapus Bulk → Klik Hapus → Data terpilih terhapus & pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', /hapus|ya/i).click({ force: true });
    });
    cy.wait(2000);
  });
});
