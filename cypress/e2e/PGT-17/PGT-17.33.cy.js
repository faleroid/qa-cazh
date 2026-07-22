import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.33 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.33: Ubah Instansi di Edit -> klik Simpan -> Instansi ter-update', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });
});
