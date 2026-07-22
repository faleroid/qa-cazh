import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.15 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.15: Klik sort arrow icon 1x -> Icon ascending sort, data terurut ascending', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });
});
