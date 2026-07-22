import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.18 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.18 Aktifkan sort di kolom A (ascending/descending) -> klik sort arrow di kolom B', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.sortArrowBtn('Instansi').click({ force: true });
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });
});
