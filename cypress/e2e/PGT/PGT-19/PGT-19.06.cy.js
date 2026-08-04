import PermissionTimePage from '../../../pages/PermissionTimePage';

describe('PGT-19.6 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it("PGT-19.6 Aktifkan toggle 'Batas Waktu Maksimal Pengajuan Perizinan'", () => {
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.timeInput().should('be.visible');
  });
});
