import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.13 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.13 Simpan config di Instansi A (toggle ON, jam 09:00) -> ganti dropdown ke Instansi B', () => {
    // Config Instansi A
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    // Ganti ke Instansi B & verifikasi independen
    PermissionTimePage.selectInstansi(testData.instansi.instansiB);
    PermissionTimePage.elements.instansiValue().should('contain.text', testData.instansi.instansiB);
  });
});
