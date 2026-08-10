import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.48 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.48 Ubah Max Poin > 999 di Edit -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ maxPoin: '1000' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
