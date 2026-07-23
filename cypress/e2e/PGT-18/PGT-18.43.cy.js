import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.43 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.43 Status selalu memiliki nilai terpilih (Aktif / Tidak Aktif) & tidak dapat dikosongkan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.modalStatusDropdown().invoke('text').should('match', /aktif|tidak aktif/i);
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
