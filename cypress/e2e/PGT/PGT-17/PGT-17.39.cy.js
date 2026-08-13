import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.39 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.39 Klik btn 'Hapus' di popup", () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil dihapus');
  });
});
