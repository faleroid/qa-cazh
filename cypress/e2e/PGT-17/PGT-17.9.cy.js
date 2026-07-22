import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.9 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.9 Buka dropdown Instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length.at.least', 1);
  });
});
