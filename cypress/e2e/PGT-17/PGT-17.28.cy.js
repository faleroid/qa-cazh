import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.28 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.28 Klik btn 'Bersihkan' di samping filter aktif', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().last().click({ force: true });
    cy.wait(1000);
    InventoryCategoryPage.elements.filterClearBtnInList().should('be.visible').click({ force: true });
    InventoryCategoryPage.elements.filterClearBtnInList().should('not.exist');
  });
});
