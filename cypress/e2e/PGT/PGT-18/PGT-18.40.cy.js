import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.40 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.40 Ubah Instansi tipe pelanggaran -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    cy.wait(1000);
    
    // Dapatkan nama instansi terpilih saat ini lalu pilih instansi yang BERBEDA
    ViolationTypePage.elements.modalInstansiValue().invoke('text').then((currentInstansiText) => {
      const cleanCurrent = currentInstansiText.trim();
      const targetNewInstansi = cleanCurrent.includes('QA') ? 'Academy Cazh' : 'Academy QA Engineer';
      ViolationTypePage.fillModalForm({ instansiText: targetNewInstansi });
    });

    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
