import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.13 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.13 Buka halaman list Kategori Inventaris saat belum ada data', () => {
    // 1. Hapus data secara otomatis jika tabel tidak kosong agar menguji kondisi riil 0 data
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr button:has(svg.lucide-trash)');
      if (rows.length > 0) {
        // Hapus baris data pertama hingga tabel benar-benar kosong
        cy.wrap(rows.first()).click({ force: true });
        InventoryCategoryPage.confirmDelete();
        cy.wait(1000);
        cy.reload();
      }
    });

    // 2. Verifikasi Tampilan Empty State UI (ilustrasi + teks 'Tidak ada data yang ditemukan')
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });
});
