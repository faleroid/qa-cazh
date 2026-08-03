import PermissionTimePage from '../../../pages/PermissionTimePage';

describe('PGT-19.2 - Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visitWithoutSelect();
  });

  it('PGT-19.2 Buka dropdown Instansi', () => {
    PermissionTimePage.elements.instansiDropdown().click({ force: true });
    cy.wait(800);
    PermissionTimePage.elements.selectOptions().should('be.visible').and('have.length.at.least', 1);
  });
});
