import PermissionTimePage from '../../../pages/PermissionTimePage';
import testData from '../../../fixtures/permissionTimeData.json';

describe('PGT-19.10 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.10 Aktifkan toggle + isi field jam valid (format 24-jam, misal 09:00) -> klik Simpan', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime(testData.validTime);
    PermissionTimePage.save();
    PermissionTimePage.elements.toastMessage().should('be.visible');
  });
});
