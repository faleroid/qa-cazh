import PermissionTimePage from '../../pages/PermissionTimePage';

describe('PGT-19.4 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it("PGT-19.4 Cek default state toggle 'Batas Waktu Maksimal Pengajuan Perizinan'", () => {
    PermissionTimePage.toggleOff();
    PermissionTimePage.elements.timeInput().should('not.exist');
  });
});
