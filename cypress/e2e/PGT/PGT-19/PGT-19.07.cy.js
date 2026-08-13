import PermissionTimePage from '../../../pages/PermissionTimePage';
import testData from '../../../fixtures/permissionTimeData.json';

describe('PGT-19.7 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.7 Cek helper text saat toggle ON', () => {
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.helperText().should('be.visible');
  });
});
