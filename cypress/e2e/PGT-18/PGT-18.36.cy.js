import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.36 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.36 Ubah Nama Tipe Pelanggaran ke nama BARU -> klik Simpan', () => {
    const newName = 'Pengrusakan Fasilitas Sekolah';
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: newName });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });
});
