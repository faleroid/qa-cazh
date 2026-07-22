import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.12 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.12 Cek format kolom Tanggal Dibuat', () => {
    // Verifikasi langsung format tanggal (contoh: "Rabu, 22 Jul 2026 14:53") pada cell <td> tabel
    cy.get('tbody tr td', { timeout: 10000 })
      .contains(/[a-zA-Z]+,\s*\d{1,2}\s+[a-zA-Z]{3}\s+\d{4}\s+\d{2}:\d{2}/)
      .should('be.visible');
  });
});
