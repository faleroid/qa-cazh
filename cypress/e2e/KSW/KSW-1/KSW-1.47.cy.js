import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.47 - Pada baris List Riwayat, klik Aksi → Hapus', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.47: Masuk ke Detail → Pada baris List Riwayat, klik Aksi Hapus → Sistem menampilkan popup modal konfirmasi hapus (delete confirmation)', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Pada baris pertama tabel List Riwayat, klik tombol Aksi Hapus (lucide-trash)
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);

    // 3. Verifikasi Popup Modal Konfirmasi Hapus ("Hapus Riwayat Progres Kegiatan") Terbuka
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.contains('Hapus Riwayat Progres Kegiatan').should('be.visible');
      cy.contains('Apakah Anda yakin ingin menghapus riwayat progres kegiatan').should('be.visible');
      cy.contains('button', 'Batal').should('be.visible');
      cy.contains('button', 'Hapus').should('be.visible');
    });
  });
});
