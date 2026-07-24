import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.24 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.24 Ketik keyword yang match dengan Nama Kategori existing', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.search(testData.search.validKeyword);
    InventoryCategoryPage.elements.tableRows().should('have.length.at.least', 1);
  });
});
