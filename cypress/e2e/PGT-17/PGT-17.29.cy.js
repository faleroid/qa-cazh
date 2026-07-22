import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.29 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.29: Buka dropdown filter -> klik area luar -> Dropdown tertutup tanpa apply', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.elements.filterDropdown().should('be.visible');
    cy.get('body').click(0, 0);
    InventoryCategoryPage.elements.filterDropdown().should('not.exist');
  });
});
