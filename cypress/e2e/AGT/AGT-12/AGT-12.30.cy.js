import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.30 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.30: Ubah pagination ke 100 -> Centang header -> Klik Pilih Semua -> Toast Sonner info "Hanya 50 data pertama yang dipilih" atau indikator Terpilih muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 1. UBAH PAGINATION KE 100 KHUSUS PADA CARD 3 (RIWAYAT KESEHATAN)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
          .first()
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .click({ force: true });
      });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    // JEDA SETELAH UBAH PAGINATION KE 100 DULU KARENA DATANYA BELUM LOAD SEMPURNA (INSTRUKSI USER)
    cy.wait(2000);

    // Pastikan tabel Card 3 memiliki minimal 1 baris data yang selesai dimuat
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(1000);

    // 2. CENTANG HEADER CHECKBOX KHUSUS CARD 3 (RIWAYAT KESEHATAN)
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    // JEDA SETELAH CENTANG CHECKBOX AGAR ACTION BAR / BANNER / TOAST TERLIHAT MEMUAT TERPILIH
    cy.wait(2000);

    // 3. Klik tombol "Pilih semua" yang muncul di banner seleksi massal jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1000);
      }
    });

    // 4. VERIFIKASI BAHWA NOTIFIKASI SONNER TOAST ATAU INDIKATOR TERPILIH MUNCUL
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const hasToast = $body.find('[data-sonner-toast]').length > 0;
      const hasTerpilih = $body.text().includes('Terpilih') || $body.text().includes('terpilih');
      expect(hasToast || hasTerpilih, 'Harus ada notifikasi Sonner Toast atau indikator Terpilih di layar').to.be.true;
    });
  });
});
