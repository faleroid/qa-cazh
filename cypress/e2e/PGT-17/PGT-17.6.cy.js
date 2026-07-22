import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.6 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.6 Kosongkan Instansi (Nama Kategori terisi) -> klik Simpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.instansiRequired, 'i')).should('be.visible');
  });
});
