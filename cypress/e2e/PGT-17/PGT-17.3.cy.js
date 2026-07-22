import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.3 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.3 Cek placeholder field Instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiValue().invoke('text').should('match', /pilih instansi|select institution/i);
  });
});
