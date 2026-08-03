import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.25 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.25 Ketik keyword yang tidak match ('xyz123abc')", () => {
    InventoryCategoryPage.search(testData.search.invalidKeyword);
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });
});
