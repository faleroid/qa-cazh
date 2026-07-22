import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.28 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.28: Klik btn Bersihkan filter -> Filter cleared', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.applyFilter(0);
    InventoryCategoryPage.elements.filterClearBtnInList().click({ force: true });
    InventoryCategoryPage.elements.filterClearBtnInList().should('not.exist');
  });
});
