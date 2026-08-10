import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.16 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.16 Klik sort arrow icon di kolom yang sudah ascending -> 2x lagi (total 2 klik)', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true });
  });
});
