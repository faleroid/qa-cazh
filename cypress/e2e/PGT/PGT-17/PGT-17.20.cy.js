import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.20 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.20 Klik dropdown Pagination Page Size Selector', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length', 6);
  });
});
