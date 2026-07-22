import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.27 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.27: Pilih instansi di filter -> klik Terapkan -> Filter diterapkan', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.applyFilter(0);
    InventoryCategoryPage.elements.filterDropdown().should('not.exist');
    InventoryCategoryPage.elements.filterClearBtnInList().should('be.visible');
  });
});
