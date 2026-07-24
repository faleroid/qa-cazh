import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.27 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it("PGT-17.27 Buka dropdown Instansi di filter -> pilih 1 instansi -> klik btn 'Terapkan'", () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    cy.wait(500);

    // Pilih instansi spesifik yang BUKAN opsi 'Semua'
    InventoryCategoryPage.elements.selectOptions()
      .filter(':not(:contains("Semua"))')
      .first()
      .then(($opt) => {
        const selectedInstansiName = $opt.text().trim();
        cy.wrap($opt).click({ force: true });
        cy.wait(1500); 

        // Verifikasi bahwa tabel benar-benar terfilter dan menampilkan instansi terpilih
        InventoryCategoryPage.elements.tableRows().should('be.visible').and('have.length.at.least', 1);
        cy.get('tbody tr').each(($row) => {
          cy.wrap($row).should('contain.text', selectedInstansiName);
        });
      });
  });
});
