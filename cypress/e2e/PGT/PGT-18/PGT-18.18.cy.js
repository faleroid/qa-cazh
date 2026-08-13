import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.18 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.18 Input Nama Tipe Pelanggaran > 100 karakter -> pangkas 100 karakter & klik Simpan', () => {
    const longName = 'A'.repeat(105);
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: longName,
      minPoin: '91',
      maxPoin: '95'
    });
    cy.contains(/Batas 100 karakter tercapai/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.contains('A'.repeat(100), { timeout: 10000 }).should('be.visible');
  });
});
