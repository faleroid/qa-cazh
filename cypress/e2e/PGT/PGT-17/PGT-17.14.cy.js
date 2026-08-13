import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.14 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.14 Tambah beberapa kategori -> reload halaman', () => {
    const timestamp = Date.now();
    const cat1 = `Peralatan Olahraga`;
    const cat2 = `Proyektor Lab Komputer`;

    // 1. Tambah Kategori Pertama di Instansi Index 0
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: cat1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.wait(1000);

    // 2. Tambah Kategori Kedua di Instansi Index 1 (Instansi Berbeda)
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 1, namaKategori: cat2 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.wait(1000);

    // 3. Reload halaman & verifikasi data persisten
    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.contains(cat1, { timeout: 10000 }).should('be.visible');
    cy.contains(cat2, { timeout: 10000 }).should('be.visible');
  });
});
