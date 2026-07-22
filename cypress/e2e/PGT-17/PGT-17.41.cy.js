import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.41 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.41: Buka popup Hapus -> tekan Esc di keyboard -> Batal hapus', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });
});
