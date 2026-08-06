import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.50 - Centang checkbox pada satu baris data Riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.50: Masuk ke Detail → Centang checkbox pada satu baris data Riwayat → Baris terpilih; action bar muncul menampilkan jumlah terpilih & tombol Hapus yang dipilih', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Centang checkbox pada baris pertama tabel List Riwayat
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    // 3. Verifikasi Baris Terpilih (Checkbox checked)
    cy.get('tbody tr').first().find('button[role="checkbox"]')
      .should('have.attr', 'data-state', 'checked');

    // 4. Verifikasi Action Bar Muncul: Menampilkan Teks Jumlah Terpilih & Tombol "Hapus yang dipilih"
    // scroll into view because the action bar is fixed and may be overflowed by other elements
    cy.contains('riwayat progres dipilih', { timeout: 10000 }).scrollIntoView().should('be.visible');
    cy.contains('button', 'Hapus yang dipilih').scrollIntoView().should('be.visible');
  });
});
