import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.19 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.19 Load halaman list Tipe Pelanggaran', () => {
    ViolationTypePage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/tipe pelanggaran|nama/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/range/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/status/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/aksi/i).should('be.visible');
  });
});
