import PermissionTimePage from '../../../pages/PermissionTimePage';
import testData from '../../../fixtures/permissionTimeData.json';

describe('PGT-19.11 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.11 Toggle OFF + klik Simpan (field jam hidden, tidak diisi)', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    PermissionTimePage.elements.toastMessage().should('be.visible');
  });
});
