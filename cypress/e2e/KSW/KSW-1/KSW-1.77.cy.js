import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.77 - Pada baris List Progres Kegiatan, klik Aksi → Edit', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.77: Pada baris List Progres Kegiatan, klik Aksi → Edit', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
