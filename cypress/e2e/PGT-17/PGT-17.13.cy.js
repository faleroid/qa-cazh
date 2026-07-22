import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.13 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.13 Buka halaman list Kategori Inventaris saat belum ada data', () => {
    InventoryCategoryPage.search('TIDAK_AKAN_ADA_DATA_12345');
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });
});
