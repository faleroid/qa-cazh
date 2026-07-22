import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.42 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.42 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: 'Data Khusus Hapus 42' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.wait(1000);
    InventoryCategoryPage.search('Data Khusus Hapus 42');
    InventoryCategoryPage.elements.tableRows().should('have.length', 1);
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });
});
