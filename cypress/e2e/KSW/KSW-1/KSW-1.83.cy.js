import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.83 - Pada baris List Progres Kegiatan, klik Aksi → Hapus', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.83: Pada baris List Progres Kegiatan, klik Aksi → Hapus', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
