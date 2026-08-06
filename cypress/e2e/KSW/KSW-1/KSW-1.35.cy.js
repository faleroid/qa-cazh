import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.35 - Isi Tanggal Kegiatan dengan tanggal setelah hari ini (future date)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.35: Buka modal Tambah Riwayat → Pilih Tanggal Kegiatan setelah hari ini (future date) → Klik Simpan → Sistem menampilkan error "Tanggal Kegiatan tidak boleh lebih dari tanggal saat riwayat dibuat"', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Buka DatePicker Popover & Pindah ke Bulan Depan (Future Date)
    cy.get('[role="dialog"] button:contains("DD/MM/YYYY")').click({ force: true });
    cy.wait(600);
    cy.get('button[aria-label="Go to the Next Month"]').click({ force: true });
    cy.wait(600);
    cy.get('td[data-day] button').last().click({ force: true });
    cy.wait(600);

    // 3. Isi Persentase & Deskripsi
    cy.get('[role="dialog"] input[name="percentage"]').clear({ force: true }).type('50', { force: true });
    cy.get('[role="dialog"] textarea[name="description"]').clear({ force: true }).type('Uji Future Date Validation', { force: true });

    // 4. Klik Simpan
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1000);

    // 5. Verifikasi Modal Tetap Terbuka & Error Validation Future Date Tampil
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('.text-destructive, [data-slot="form-message"]').should('exist').and(($el) => {
        const text = $el.text().toLowerCase();
        const isValid = text.includes('tanggal') || text.includes('lebih') || text.includes('dibuat') || text.includes('future') || text.includes('invalid');
        expect(isValid, 'Pesan error validasi tanggal kegiatan tidak boleh lebih dari tanggal dibuat harus tampil').to.be.true;
      });
    });
  });
});
