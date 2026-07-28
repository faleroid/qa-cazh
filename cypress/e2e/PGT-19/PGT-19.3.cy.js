import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.3 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.3 Pilih Instansi dari dropdown', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.elements.instansiValue().should('contain.text', testData.instansi.instansiA);
    PermissionTimePage.elements.toggleLabel().should('be.visible');
  });
});
