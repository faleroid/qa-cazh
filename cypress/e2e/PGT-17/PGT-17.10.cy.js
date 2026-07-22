import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.10 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.10: Load halaman list Kategori Inventaris -> Menampilkan kolom tabel sesuai spec', () => {
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/tanggal dibuat/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/nama kategori/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/aksi/i).should('be.visible');
  });
});
