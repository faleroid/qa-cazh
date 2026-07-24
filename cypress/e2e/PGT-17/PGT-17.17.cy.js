import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.17 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.17 Klik sort arrow icon 3x di 1 kolom', () => {
    InventoryCategoryPage.ensureDataExists();

    // Klik 1: Ascending & tunggu 1 detik
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
    cy.wait(1000);

    // Klik 2: Descending & tunggu 1 detik
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
    cy.wait(1000);

    // Klik 3: Default / Reset & tunggu 1 detik
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
    cy.wait(1000);
  });
});
