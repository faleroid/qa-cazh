import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.14 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.14 Input Min Poin = Max Poin (misal keduanya 10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '10',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError();
  });
});
