import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.46 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.46 Ubah Range Poin jadi OVERLAP dengan tipe pelanggaran existing lain -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
