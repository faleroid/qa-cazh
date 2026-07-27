import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.42 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.42 Kosongkan Nama Tipe Pelanggaran di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().first().scrollIntoView().should('exist');
    ViolationTypePage.cancelForm();
  });
});
