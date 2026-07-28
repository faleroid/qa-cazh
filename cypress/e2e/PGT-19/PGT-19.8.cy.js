import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.8 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.8 Matikan kembali toggle setelah aktif -> cek form', () => {
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.timeInput().should('be.visible');
    PermissionTimePage.toggleOff();
    cy.wait(1000);
    PermissionTimePage.elements.timeInput().should('not.exist');
  });
});
