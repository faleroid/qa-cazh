import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.21 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.21 Ganti page size dari 10 ke 50/100/500/1000 (test salah satu, misal 50)', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.changePageSize(50);
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });
});
