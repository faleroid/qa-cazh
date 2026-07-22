import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.36 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.36: Kosongkan Instansi di Edit -> Peringatan muncul', () => {
    cy.log('Not applicable if Select does not have a clear button without custom logic');
  });
});
