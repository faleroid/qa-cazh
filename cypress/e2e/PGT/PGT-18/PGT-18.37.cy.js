import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.37 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.37 Ubah Range Poin (Min-Max) valid & tidak overlap -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '15', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
