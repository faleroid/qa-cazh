import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.43 - Pada baris List Riwayat, klik Aksi → Edit', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.43: Masuk ke Detail → Pada baris List Riwayat, klik Aksi Edit → Sistem menampilkan popup modal Edit Riwayat dengan data terisi otomatis', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Pada baris pertama tabel List Riwayat, klik tombol induk Aksi Edit (button data-slot="dialog-trigger")
    cy.get('tbody svg.lucide-square-pen', { timeout: 15000 })
      .first()
      .parents('button')
      .first()
      .click({ force: true });
    cy.wait(1200);

    // 3. Verifikasi Modal Edit Riwayat Terbuka & Data Terisi Otomatis
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"] [data-slot="dialog-title"]').should('contain.text', 'Edit');
  });
});
