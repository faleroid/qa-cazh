import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.35 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.35 Kosongkan Nama Kategori di Edit -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('be.visible');
  });
});
