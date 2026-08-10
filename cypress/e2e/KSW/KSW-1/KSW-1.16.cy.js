import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.16 - Klik tombol Batal pada form Import Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.16: Klik tombol Batal pada form Import Progres Kegiatan', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });
});
