import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.20 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.20 Cek Aksi di setiap row', () => {
    ViolationTypePage.elements.rowEditBtn().should('exist');
    ViolationTypePage.elements.rowDeleteBtn().should('exist');
  });
});
