import PermissionTimePage from '../../pages/PermissionTimePage';
import testData from '../../fixtures/permissionTimeData.json';

describe('PGT-19.12 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visit();
  });

  it('PGT-19.12 Aktifkan toggle + isi jam dengan format tidak valid (misal 25:00) -> sistem menolak input', () => {
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('25:00');
    cy.get('[data-slot="datefield"] [data-type="hour"]').invoke('text').should('not.eq', '25');
  });
});
