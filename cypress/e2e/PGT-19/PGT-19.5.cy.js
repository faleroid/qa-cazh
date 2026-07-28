import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.5 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.5 Cek helper text saat toggle OFF', () => {
    PermissionTimePage.toggleOff();
    cy.contains('p', /Jika diaktifkan, pengajuan perizinan untuk hari yang sama hanya dapat dilakukan sebelum batas waktu yang ditentukan/i, { timeout: 10000 }).should('be.visible');
  });
});
