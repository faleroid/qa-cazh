import PermissionTimePage from '../../../pages/PermissionTimePage';
import testData from '../../../fixtures/permissionTimeData.json';

describe('PGT-19.1 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visitWithoutSelect();
  });

  it('PGT-19.1 Buka submenu Waktu Perizinan dari Pengaturan > Kesiswaan', () => {
    PermissionTimePage.elements.dialogContainer().should('be.visible');
    PermissionTimePage.elements.dialogTitle().should('be.visible');
    PermissionTimePage.elements.instansiDropdown().should('be.visible');
    PermissionTimePage.elements.instansiValue().should('contain.text', 'Pilih Instansi');
  });
});
