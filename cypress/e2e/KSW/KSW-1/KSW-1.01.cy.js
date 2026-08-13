import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.01 - Login admin → menu Kesiswaan → submenu Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.01: Login admin → menu Kesiswaan → submenu Progres Kegiatan', () => {
    cy.url().should("include", "/student-affairs/progress"); ProgressActivityPage.verifyListHeaderAndActions();
  });
});
