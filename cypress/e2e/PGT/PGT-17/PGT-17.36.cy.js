import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.36 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  // SKIPPED: Single-select Radix UI dropdown secara desain tidak mendukung aksi uncheck/deselect nilai terpilih.
  it.skip('PGT-17.36 Kosongkan Instansi di Edit (uncheck dropdown selection) -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    
    // Buka dropdown Instansi di modal edit
    InventoryCategoryPage.elements.modalInstansiDropdown().click({ force: true });
    
    // Uncheck / deselect option terpilih jika memungkinkan
    cy.get('body').then(($body) => {
      const selectedOption = $body.find('[role="option"][data-state="checked"], [role="option"][aria-selected="true"]');
      if (selectedOption.length > 0) {
        cy.wrap(selectedOption).first().click({ force: true });
      } else {
        cy.get('body').type('{esc}');
      }
    });

    // Klik Simpan
    InventoryCategoryPage.saveForm();

    // Verifikasi validasi error atau form modal tetap terbuka (mencegah submit tanpa instansi)
    cy.get('body').then(($body) => {
      const hasError = $body.find('[data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"]').length > 0;
      if (hasError) {
        InventoryCategoryPage.elements.validationError().should('be.visible');
      } else {
        InventoryCategoryPage.elements.formModal().should('be.visible');
      }
    });
  });
});
