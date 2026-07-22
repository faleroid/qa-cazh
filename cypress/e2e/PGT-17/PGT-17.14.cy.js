import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.14 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.14 Tambah beberapa kategori -> reload halaman', () => {
    InventoryCategoryPage.ensureDataExists();
    cy.reload();
    InventoryCategoryPage.elements.tableRows().should('be.visible');
  });
});
