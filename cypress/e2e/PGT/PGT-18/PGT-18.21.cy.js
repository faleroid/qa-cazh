import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.21 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.21 Buka halaman list Tipe Pelanggaran saat belum ada data', () => {
    // 1. Tunggu tabel selesai muat data awal dari API backend
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
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
          ViolationTypePage.confirmDelete();
          cy.wait(2500);

          // Cek kembali baris berikutnya secara rekursif
          deleteRowIfDataExists();
        } else {
          // 3. Ketika seluruh data terhapus, verifikasi state kosong
          ViolationTypePage.elements.emptyState().should('be.visible');
        }
      });
    };

    deleteRowIfDataExists();
  });
});
