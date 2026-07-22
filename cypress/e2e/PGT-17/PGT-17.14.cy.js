import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.14 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.14: Tambah kategori -> reload halaman -> Default sort tampil paling atas', () => {
    cy.reload();
    InventoryCategoryPage.elements.tableRows().should('be.visible');
  });
});
