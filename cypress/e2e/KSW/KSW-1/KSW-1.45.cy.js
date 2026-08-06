import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.45 - Kosongkan salah satu field required pada modal Edit, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.45: Buka modal Edit Riwayat → Kosongkan salah me satu field required (Deskripsi) → Klik Simpan → Sistem menampilkan error validasi required', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Klik tombol Aksi Edit (bukan checkbox) pada baris data riwayat pertama
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1200);

    // 3. Kosongkan HANYA 1 Field Required: Deskripsi pada modal Edit
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('textarea[name="description"]').clear({ force: true });
      cy.contains('button', 'Simpan').click({ force: true });
    });
    cy.wait(1000);

    // 4. Verifikasi Modal Edit Tetap Terbuka & Pesan Error Required Tampil
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('.text-destructive, [data-slot="form-message"]').should('exist');
    });
  });
});
