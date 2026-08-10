import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.29 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.29 Buka dropdown filter -> klik area page di luar dropdown', () => {
    // 1. Buka dropdown Filter
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    cy.get('[role="listbox"], [data-slot="select-content"], [data-radix-select-viewport]').should('be.visible');

    // 2. Klik area di luar dropdown (misal di area body/header di luar popover)
    cy.get('body').click('topRight', { force: true });

    // 3. Verifikasi dropdown menu tertutup
    cy.get('[role="listbox"], [data-slot="select-content"]').should('not.exist');
  });
});
