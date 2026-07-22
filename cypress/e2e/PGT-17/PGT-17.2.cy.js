import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.2 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.2: Klik btn Tambah Kategori Inventaris -> Popup Tambah terbuka', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalInstansiDropdown().should('exist');
    InventoryCategoryPage.elements.modalNamaInput().should('exist');
    InventoryCategoryPage.elements.modalSaveBtn().should('exist');
    InventoryCategoryPage.elements.modalCancelBtn().should('exist');
  });
});
