import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.26 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.26 Klik btn 'Filter' di halaman list", () => {
    // Klik tombol trigger dropdown Filter di header card
    InventoryCategoryPage.elements.filterInstansiSelect().should('be.visible').click({ force: true });
    
    // Verifikasi dropdown options terbuka dan menampilkan daftar opsi instansi
    InventoryCategoryPage.elements.selectOptions().should('have.length.at.least', 1);
  });
});
