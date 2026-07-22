import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.4 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.4 Cek placeholder field Nama Kategori', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalNamaInput().invoke('attr', 'placeholder').should('match', /contoh:|example:/i);
  });
});
