import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.8 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.8 Klik Simpan tanpa isi field apapun', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('have.length.at.least', 1);
  });
});
