import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.47 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.47 Ubah Min Poin > Max Poin di Edit -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '50', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
