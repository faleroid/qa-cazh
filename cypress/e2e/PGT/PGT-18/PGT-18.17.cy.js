import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.17 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.17 Input Nama Tipe Pelanggaran yang sudah ada (duplikat) -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '950',
      maxPoin: '960'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.duplicate);
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('not.be.disabled');
  });
});
