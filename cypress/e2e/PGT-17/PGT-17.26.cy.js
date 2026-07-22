import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.26 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.26 Klik btn 'Filter' di halaman list', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().should('be.visible');
  });
});
