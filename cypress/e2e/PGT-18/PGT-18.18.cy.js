import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.18 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.18 Input Nama Tipe Pelanggaran > 100 karakter -> klik Simpan', () => {
    const longName = 'A'.repeat(105);
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: longName,
      minPoin: '91',
      maxPoin: '95'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.modalNamaInput()
      .should('have.attr', 'maxlength', '100')
      .should('have.attr', 'aria-invalid', 'true')
      .closest('[data-slot="form-item"]')
      .should('have.attr', 'data-invalid', 'true');
    ViolationTypePage.verifyValidationError(testData.validationMessages.namaMaxLength);
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
