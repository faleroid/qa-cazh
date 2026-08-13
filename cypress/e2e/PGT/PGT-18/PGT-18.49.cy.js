import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.49 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.49 Ubah Nama Tipe Pelanggaran jadi > 100 karakter -> pangkas 100 karakter & klik Simpan', () => {
    const longName = 'B'.repeat(105);
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: longName });
    cy.contains(/Batas 100 karakter tercapai/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.contains('B'.repeat(100), { timeout: 10000 }).should('be.visible');
  });
});
