import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.55 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.55 Buka popup Hapus -> tekan Esc di keyboard', () => {
    ViolationTypePage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });
});
