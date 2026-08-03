import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.35 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.35 Klik tombol Edit di row tipe pelanggaran', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });
});
