import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.37 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.37 Klik icon Hapus di row kategori inventaris', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteModal().should('be.visible');
    InventoryCategoryPage.elements.deleteConfirmBtn().should('be.visible');
  });
});
