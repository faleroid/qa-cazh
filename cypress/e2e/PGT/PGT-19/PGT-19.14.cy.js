import PermissionTimePage from '../../../pages/PermissionTimePage';
import testData from '../../../fixtures/permissionTimeData.json';

describe('PGT-19.14 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  // SKIPPED: Cross-feature integration test (fitur diuji pada suite integrasi terpisah)
  it.skip('PGT-19.14 Cross-feature: Set toggle OFF di instansi A -> login sebagai user Cards Parents -> coba ajukan izin', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });
});
