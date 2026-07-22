import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.31 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.31: Klik icon Edit di row -> Popup Edit terbuka pre-filled', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });
});
