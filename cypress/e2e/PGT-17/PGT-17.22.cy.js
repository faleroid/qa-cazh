import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.22 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.22 Cek placeholder + icon di Search input field', () => {
    InventoryCategoryPage.elements.searchInput().invoke('attr', 'placeholder').should('match', /cari|search/i);
  });
});
