import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.36 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.36: Centang header Halaman 1 -> Klik Pilih semua -> Pindah ke Halaman 2 -> Cek apakah banner "{n} data kesehatan dipilih" tetap ada di Halaman 2', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Centang Header Checkbox pada Halaman 1
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('thead th button[aria-label="Select all"], thead th button[role="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    // 3. Klik tombol "Pilih semua" di banner jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(800);
      }
    });

    // 4. PINDAH KE HALAMAN 2
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('[data-slot="data-grid-pagination"] button, nav button')
      .filter((idx, el) => Cypress.$(el).text().trim() === '2')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // 5. CEK UTAMA: Tepat saat pindah ke Halaman 2, verifikasi banner "data kesehatan dipilih" dipertahankan (tidak kereset)
    cy.contains(/data kesehatan dipilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    // 6. Balik ke Halaman 1 untuk menyelesaikan alur navigasi
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('[data-slot="data-grid-pagination"] button, nav button')
      .filter((idx, el) => Cypress.$(el).text().trim() === '1')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // Verifikasi banner tetap aktif di Halaman 1
    cy.contains(/data kesehatan dipilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');
  });
});
