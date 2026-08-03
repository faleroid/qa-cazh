import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.32 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.32 Aktifkan Filter Instansi + Status secara bersamaan (kombinasi)', () => {
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().last().click({ force: true });
    cy.wait(500);
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    cy.wait(1000);
  });
});
