import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.27 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.27 Buka dropdown Instansi di filter -> pilih 1 instansi -> klik btn 'Terapkan'", () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().last().click({ force: true });
    cy.wait(1000); 
    InventoryCategoryPage.elements.tableRows().should('exist');
  });
});
