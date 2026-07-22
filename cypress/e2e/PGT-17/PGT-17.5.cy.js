import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.5 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.5 Isi form -> klik btn Batal/Cancel', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: 'Test Batal' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });
});
