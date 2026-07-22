import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.13 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.13: Buka list Kategori Inventaris saat belum ada data -> Empty state UI', () => {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0) {
        InventoryCategoryPage.elements.emptyState().should('be.visible');
      }
    });
  });
});
