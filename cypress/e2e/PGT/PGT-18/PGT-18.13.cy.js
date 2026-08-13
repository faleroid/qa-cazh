import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.13 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.13 Input Min Poin > Max Poin (misal Min=15, Max=10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '15',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.minGreaterMax);
  });
});
