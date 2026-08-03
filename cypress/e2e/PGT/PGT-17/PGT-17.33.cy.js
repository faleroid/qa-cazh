import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.33 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.33 Ubah Instansi di popup Edit (pilih instansi lain) -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });
});
