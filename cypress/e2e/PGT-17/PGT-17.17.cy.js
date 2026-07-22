import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.17 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.17: Klik sort arrow icon 3x -> Icon netral, data urutan default', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true }).click({ force: true });
  });
});
