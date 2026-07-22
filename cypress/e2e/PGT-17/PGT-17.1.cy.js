import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.1 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.1 Isi form Tambah Kategori Inventaris dengan data valid (pilih Instansi + isi Nama Kategori) -> klik Simpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
    cy.contains(testData.validData.kategoriBaru, { timeout: 10000 }).should('be.visible');
  });
});
