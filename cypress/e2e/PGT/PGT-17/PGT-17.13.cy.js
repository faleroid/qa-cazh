import InventoryCategoryPage from '../../../pages/InventoryCategoryPage';
import testData from '../../../fixtures/inventoryCategoryData.json';

describe('PGT-17.13 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });
 
  it('PGT-17.13 Buka halaman list Kategori Inventaris saat belum ada data', () => {
    // 1. Tunggu tabel selesai muat data awal dari API backend
    cy.get('table[data-slot="data-grid-table"]', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    // 2. Fungsi Hapus Bertahap Seluruh Data Eksis
    const deleteRowIfDataExists = () => {
      cy.get('tbody').then(($tbody) => {
        const trashBtns = $tbody.find('tr button:has(svg.lucide-trash)');
        if (trashBtns.length > 0) {
          // Klik tombol trash baris pertama
          cy.wrap(trashBtns.first()).click({ force: true });
          cy.wait(800);

          // Klik konfirmasi Hapus
          InventoryCategoryPage.confirmDelete();
          cy.wait(2500);

          // Cek kembali baris berikutnya
          deleteRowIfDataExists();
        } else {
          // 3. Ketika seluruh data terhapus (0 trash button), verifikasi teks "Data inventaris tidak ditemukan" pada <td colspan="5">
          InventoryCategoryPage.elements.emptyState().should('be.visible');
        }
      });
    };

    deleteRowIfDataExists();
  });
});
