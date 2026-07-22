import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.18 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.18: Aktifkan sort kolom A -> klik sort kolom B -> Fokus sort pindah ke B', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Instansi').click({ force: true });
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });
});
