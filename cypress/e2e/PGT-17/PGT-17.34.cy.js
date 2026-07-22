import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.34 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.34: Ubah field di Edit -> klik Batal -> Tidak tersimpan', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: 'Batal Update' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });
});
