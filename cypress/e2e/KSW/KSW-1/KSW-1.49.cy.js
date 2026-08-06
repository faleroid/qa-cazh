import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.49 - Pada popup delete confirmation, klik tombol Batal', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.49: Buka modal konfirmasi hapus riwayat → Klik tombol Batal → Sistem menutup popup dan kembali ke halaman Detail Progres Kegiatan tanpa menghapus data', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Klik tombol Aksi Hapus (button:has(svg.lucide-trash)) secara tunggal & presisi
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button:has(svg.lucide-trash)').click({ force: true });

    // 3. Klik tombol "Batal" pada modal konfirmasi hapus Radix
    // increase timeout because Radix dialog may render in a portal and animations can delay visibility
    // use the explicit data-slot selector to target the close button reliably
    cy.get('[role="dialog"]', { timeout: 30000 }).should('be.visible').within(() => {
      cy.contains('button[data-slot="dialog-close"]', 'Batal')
        .should('exist')
        .and('be.visible')
        .and('not.be.disabled')
        .click();
    });

    // verify the dialog is removed after clicking Batal
    cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');

    // 4. Verifikasi Popup Menutup & Kembali ke Halaman Detail Progres Kegiatan
    cy.get('[role="dialog"]').should('not.exist');
    cy.url().should('include', '/student-affairs/progress/');
  });
});
