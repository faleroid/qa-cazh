import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.31 - Setelah data terpilih, klik tombol Hapus Terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.31: Centang data → Klik Hapus Terpilih → Popup confirmation Hapus Bulk muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible');
  });
});
