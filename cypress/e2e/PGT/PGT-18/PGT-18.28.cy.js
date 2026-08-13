import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.28 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.28 Setelah search, clear search box', () => {
    ViolationTypePage.ensureDataExists();
    
    // 1. Ketik kata kunci pencarian yang tidak match ('xyz123abc') -> Muncul Empty State
    ViolationTypePage.search(testData.search.invalidKeyword);
    cy.wait(1000);
    ViolationTypePage.elements.emptyState().should('be.visible');

    // 2. Kosongkan (clear) search box
    ViolationTypePage.search('');
    cy.wait(1000);

    // 3. Verifikasi list kembali menampilkan seluruh data
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });
});
