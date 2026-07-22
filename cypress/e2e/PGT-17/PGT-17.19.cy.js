import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.19 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.19: Cek default value Pagination Page Size Selector = 10', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });
});
