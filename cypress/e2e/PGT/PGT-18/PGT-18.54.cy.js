import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.54 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.54 Buka popup Hapus -> klik btn 'Batal'", () => {
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.cancelDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });
});
