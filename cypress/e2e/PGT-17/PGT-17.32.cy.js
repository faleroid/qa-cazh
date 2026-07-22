import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.32 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.32 Ubah Nama Kategori -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriUpdate });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });
});
