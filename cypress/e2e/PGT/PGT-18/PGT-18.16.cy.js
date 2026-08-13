import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.16 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.16 Input Range Poin yang OVERLAP dengan tipe pelanggaran existing -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Merokok di Lingkungan Sekolah',
      minPoin: '1',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.overlap);
  });
});
