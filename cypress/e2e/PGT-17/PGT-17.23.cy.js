import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.23 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.23: Klik Search input field -> Siap input keyword', () => {
    InventoryCategoryPage.elements.searchInput().click().should('have.focus');
  });
});
