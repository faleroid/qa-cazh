import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.14 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.14 Tambah beberapa kategori -> reload halaman', () => {
    const timestamp = Date.now();
    const cat1 = `Kat Multi 1 ${timestamp}`;
    const cat2 = `Kat Multi 2 ${timestamp}`;

    // 1. Tambah Kategori Pertama
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: cat1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.wait(1000);

    // 2. Tambah Kategori Kedua
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: cat2 });
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
