import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.30 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.30: Buka dropdown filter -> klik Terapkan TANPA pilih instansi -> Batal apply', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.elements.filterApplyButton().click({ force: true });
  });
});
