import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.21 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.21 Buka halaman list Tipe Pelanggaran saat belum ada data', () => {
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr button:has(svg.lucide-trash)');
      if (rows.length > 0) {
        cy.wrap(rows.first()).click({ force: true });
        ViolationTypePage.confirmDelete();
        cy.wait(1000);
        cy.reload();
      }
    });
    ViolationTypePage.elements.emptyState().should('be.visible');
  });
});
