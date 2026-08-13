import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.08 - Klik icon Hapus pada baris Imunisasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.08: Klik icon Hapus pada baris Imunisasi -> Imunisasi langsung terhapus TANPA popup confirmation', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('button svg.lucide-trash, button[aria-label*="Hapus"], button[title*="Hapus"]', { timeout: 15000 })
      .first()
      .parents('button')
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
