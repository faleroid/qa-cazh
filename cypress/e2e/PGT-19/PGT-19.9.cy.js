import PermissionTimePage from '../../pages/PermissionTimePage';

describe('PGT-19.9 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.9 Aktifkan toggle + kosongkan field jam -> klik Simpan', () => {
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('');
    PermissionTimePage.save();
    cy.contains(/wajib diisi|harus diisi|required/i, { timeout: 10000 }).should('be.visible');
  });
});
