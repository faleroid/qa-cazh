import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.30 - Cek tampilan halaman Detail saat belum ada data riwayat (Empty State)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.30: Masuk ke Detail → Hapus seluruh data riwayat sampai kosong → Verifikasi empty state "Progres Kegiatan tidak ditemukan"', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Cek & Hapus Seluruh Baris Riwayat pada Tabel sampai Tuntas
    cy.get('body').then(($body) => {
      // Cek apakah ada data pada tabel (bukan empty state)
      if ($body.find('tbody tr').length > 0 && !$body.text().includes('Progres Kegiatan tidak ditemukan')) {
        
        // Opsi A: Coba Batch Delete via Checkbox & Tombol "Hapus yang dipilih"
        cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]').first().click({ force: true });
        cy.wait(800);

        cy.get('body').then(($b2) => {
          if ($b2.text().includes('Hapus yang dipilih')) {
            cy.contains('Hapus yang dipilih').click({ force: true });
            cy.wait(1000);
            cy.get('[role="dialog"]').should('be.visible').within(() => {
              cy.get('button').filter(':contains("Hapus"), :contains("Ya"), :contains("Confirm")').click({ force: true });
            });
            cy.wait(2500);
          } else {
            // Opsi B: Hapus baris per baris via icon Trash jika batch delete tidak muncul
            const trashBtns = $b2.find('tbody tr td svg.lucide-trash');
            for (let i = 0; i < trashBtns.length; i++) {
              cy.get('tbody tr td svg.lucide-trash').first().closest('button').click({ force: true });
              cy.wait(800);
              cy.get('[role="dialog"]').should('be.visible').within(() => {
                cy.get('button').filter(':contains("Hapus"), :contains("Ya")').click({ force: true });
              });
              cy.wait(2000);
            }
          }
        });
      }
    });

    // 3. Verifikasi Empty State Tabel Riwayat: "Progres Kegiatan tidak ditemukan"
    cy.contains('Progres Kegiatan tidak ditemukan', { timeout: 20000 }).should('be.visible');
    cy.contains('Silakan pilih Progres Kegiatan atau periksa kembali filter dan pencarian').should('be.visible');
  });
});
