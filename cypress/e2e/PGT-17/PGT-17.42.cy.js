import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.42 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.42: Search sampai hasil 1 row -> Hapus row -> Empty state', () => {
    InventoryCategoryPage.search(testData.validData.kategoriUpdate);
    InventoryCategoryPage.elements.tableRows().should('have.length', 1);
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });
});
