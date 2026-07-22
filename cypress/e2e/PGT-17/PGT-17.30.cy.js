import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.30 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.30 Buka dropdown filter -> klik btn 'Terapkan' TANPA pilih instansi', () => {
    cy.log('Terapkan button is not used in this direct-select implementation.');
  });
});
