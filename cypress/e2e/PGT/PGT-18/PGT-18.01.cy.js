import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.1 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.1 Isi form Tambah Tipe Pelanggaran dengan semua field valid (Instansi + Nama + Min Poin + Max Poin) -> klik Simpan', () => {
    ViolationTypePage.deleteAllDataIfExists();
    const namaBaru = testData.validData.namaBaru;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: namaBaru,
      minPoin: testData.validData.minPoin,
      maxPoin: testData.validData.maxPoin
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.contains(namaBaru, { timeout: 10000 }).should('be.visible');
  });
});
