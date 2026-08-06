import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.41 - Setelah upload valid, klik ikon Hapus pada lampiran sebelum Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.41: Buka modal Tambah Riwayat → Upload lampiran valid → Klik ikon Hapus pada lampiran → Lampiran terhapus dari form & dapat upload ulang', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Upload lampiran valid (signature.jpeg)
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/signature.jpeg', { force: true });
    cy.wait(1000);

    // 3. Verifikasi lampiran tampil pada form
    cy.get('[role="dialog"] img[src^="blob:"], [role="dialog"] img[alt*="signature"]').should('be.visible');

    // 4. Klik ikon Hapus / Trash / Remove pada preview lampiran
    cy.get('[role="dialog"]').within(() => {
      cy.get('button:has(svg.lucide-trash), button:has(svg.lucide-x)').first().click({ force: true });
    });
    cy.wait(800);

    // 5. Verifikasi Lampiran Terhapus dari Form & User Dapat Upload Ulang
    cy.get('[role="dialog"] img[src^="blob:"]').should('not.exist');
    cy.get('[role="dialog"] input[type="file"]').should('exist');
  });
});
