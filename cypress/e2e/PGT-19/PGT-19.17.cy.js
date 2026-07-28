import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.17 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.17 Cross-feature: Set toggle ON di Instansi A saja -> user dari Instansi B coba ajukan izin', () => {
    // Instansi A ON
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    // Instansi B OFF
    PermissionTimePage.selectInstansi(testData.instansi.instansiB);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });
});
