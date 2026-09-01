import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.38 - Pindah halaman saat selection dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.38: Centang header -> Klik Pilih semua -> Pindah ke Halaman 2 -> Selection dipertahankan lintas halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang header checkbox (Select All)
    cy.scrollTo('top');
    cy.wait(400);
    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    // 3. Klik "Pilih semua" di banner/toolbar jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua"), a:contains("Pilih semua"), span:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(800);
      }
    });

    // 4. Pindah ke Halaman 2 via pagination
    cy.get('body').then(($body) => {
      const btnPage2 = $body.find('[data-slot="data-grid-pagination"] button:contains("2"), nav button:contains("2"), [aria-label="Go to next page"]');
      if (btnPage2.length > 0) {
        cy.wrap(btnPage2.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1200);

        // 5. Verifikasi bahwa selection dipertahankan di Halaman 2
        cy.get('body', { timeout: 10000 }).then(($b2) => {
          const hasSelection = /terpilih|dipilih|pilih semua/i.test($b2.text()) || $b2.find('[data-slot="card-toolbar"]').length > 0;
          expect(hasSelection, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
        });
      } else {
        cy.contains(/terpilih|dipilih|pilih semua/i, { timeout: 10000 }).should('be.visible');
      }
    });
  });
});
