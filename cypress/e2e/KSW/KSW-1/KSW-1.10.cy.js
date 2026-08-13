import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.10 - Pada halaman List Progres Kegiatan, klik tombol Import Progres', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.10: Pada halaman List Progres Kegiatan, klik tombol Import Progres', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });
});
