import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.29 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.29 Buka dropdown filter -> klik area page di luar dropdown', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    cy.get('[role="listbox"], [data-slot="select-content"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"], [data-slot="select-content"]').should('not.exist');
  });
});
