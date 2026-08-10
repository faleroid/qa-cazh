import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.10 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.10 Load halaman list Kategori Inventaris', () => {
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/dibuat pada/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/nama kategori/i).should('be.visible');
  });
});
