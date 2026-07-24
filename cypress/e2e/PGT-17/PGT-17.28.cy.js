import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.28 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.28 Klik btn 'Bersihkan' di samping filter aktif", () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    cy.wait(800);

    // Pilih instansi spesifik yang BUKAN opsi 'Semua'
    InventoryCategoryPage.elements.selectOptions()
      .filter(':not(:contains("Semua"))')
      .first()
      .click({ force: true });

    // Tunggu beberapa detik agar UI badge 'Bersihkan' ter-render sempurna & data ter-filter
    cy.wait(2500);

    // Klik tombol 'Bersihkan' di samping filter aktif
    InventoryCategoryPage.elements.filterClearBtnInList().should('be.visible').click({ force: true });
    
    // Beri jeda beberapa detik setelah bersihkan filter
    cy.wait(2000);

    // Verifikasi tombol filter clear sudah tidak ada lagi
    InventoryCategoryPage.elements.filterClearBtnInList().should('not.exist');
  });
});
