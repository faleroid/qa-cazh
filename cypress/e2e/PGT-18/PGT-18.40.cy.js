import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

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
      ViolationTypePage.elements.modalInstansiDropdown().click({ force: true });
      cy.wait(1000);
      ViolationTypePage.elements.selectOptions().then(($options) => {
        let differentIndex = 0;
        $options.each((idx, opt) => {
          const optText = Cypress.$(opt).text().trim();
          if (optText && !optText.toLowerCase().includes(currentInstansiText.trim().toLowerCase())) {
            differentIndex = idx;
            return false;
          }
        });
        cy.wrap($options.eq(differentIndex)).click({ force: true });
        cy.wait(1000);
      });
    });

    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
