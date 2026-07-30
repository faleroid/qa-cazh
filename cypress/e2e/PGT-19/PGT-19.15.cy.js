import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.15 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  // SKIPPED: Cross-feature integration test (fitur diuji pada suite integrasi terpisah)
  it.skip('PGT-19.15 Cross-feature: Set toggle ON di instansi A dengan batas 09:00 -> user ajukan izin SEBELUM jam 09:00', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });
});
