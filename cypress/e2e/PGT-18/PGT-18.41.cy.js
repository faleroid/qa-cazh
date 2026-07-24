import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.41 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.41 Ubah field di form Edit -> klik Batal', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Meninggalkan Kelas Tanpa Izin' });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
