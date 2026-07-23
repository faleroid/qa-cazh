import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.40 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.40 Ubah Instansi tipe pelanggaran -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    cy.wait(500);
    
    // Toggle instansi secara dinamis agar re-runnable (A <-> B)
    ViolationTypePage.elements.modalInstansiValue().invoke('text').then((currentText) => {
      const targetIndex = currentText.includes('Sekolah Digital') ? 1 : 0;
      ViolationTypePage.fillModalForm({ instansiIndex: targetIndex });
    });

    cy.wait(500);
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
