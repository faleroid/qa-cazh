import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.82 - Klik tombol Batal pada form Edit Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.82: Klik tombol Batal pada form Edit Progres Kegiatan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });
});
