import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.7 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.7: Pilih Instansi kosongkan Nama Kategori -> Peringatan muncul', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.kategoriRequired, 'i')).should('be.visible');
  });
});
