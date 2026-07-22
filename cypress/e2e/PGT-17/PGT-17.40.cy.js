import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.40 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.40: Klik icon Close (X) di popup Hapus -> Batal hapus', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.cancelDeleteByX();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });
});
