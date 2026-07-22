import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.38 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.38 Cek styling btn Hapus di popup', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteConfirmBtn().should('have.class', 'bg-destructive');
  });
});
