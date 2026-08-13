import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.53 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.53 Klik btn 'Hapus' di popup konfirmasi", () => {
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
