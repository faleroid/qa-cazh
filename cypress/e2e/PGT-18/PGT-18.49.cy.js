import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.49 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.49 Ubah Nama Tipe Pelanggaran jadi > 100 karakter -> error validation 100 karakter', () => {
    const longName = 'B'.repeat(105);
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: longName });
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
