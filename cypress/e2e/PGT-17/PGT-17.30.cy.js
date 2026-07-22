import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.30 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.30 Buka dropdown filter -> klik 'Semua' (TANPA pilih instansi khusus)", () => {
    // 1. Buka dropdown Filter
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });

    // 2. Klik opsi 'Semua' (tanpa memilih instansi spesifik)
    InventoryCategoryPage.elements.selectOptions().contains('Semua').first().click({ force: true });

    // 3. Verifikasi data tabel ter-load tanpa filter instansi spesifik
    cy.wait(1000);
    InventoryCategoryPage.elements.tableRows().should('exist');
  });
});
