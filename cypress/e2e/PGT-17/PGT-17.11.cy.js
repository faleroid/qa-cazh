import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.11 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.11 Cek Aksi di setiap row', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.rowEditBtn().should('exist');
    InventoryCategoryPage.elements.rowDeleteBtn().should('exist');
  });
});
