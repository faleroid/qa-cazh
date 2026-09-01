import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.39 - Pindah halaman saat selection dari centang manual per halaman', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.39: Centang manual data di Halaman 1 -> Pindah ke Halaman 2 -> Selection ter-reset', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang manual 1 baris data di Halaman 1
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);

    // Verifikasi status Terpilih aktif di Halaman 1
    cy.contains(/terpilih|dipilih/i, { timeout: 10000 }).should('be.visible');

    // 3. Pindah ke Halaman 2 via pagination
    cy.get('body').then(($body) => {
      const btnPage2 = $body.find('[data-slot="data-grid-pagination"] button:contains("2"), nav button:contains("2"), [aria-label="Go to next page"]');
      if (btnPage2.length > 0) {
        cy.wrap(btnPage2.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1200);

        // 4. Verifikasi status seleksi manual di Halaman 2 ter-reset (baris di Halaman 2 tidak tercentang)
        cy.get('body').then(($b2) => {
          const isRowCheckedOnPage2 = $b2.find('tbody button[aria-checked="true"], tbody [data-state="checked"]').length > 0;
          expect(isRowCheckedOnPage2, 'Baris data di Halaman 2 tidak boleh tercentang secara otomatis dari seleksi manual Halaman 1').to.be.false;
        });
      } else {
        cy.log('Hanya ada 1 halaman data pada tabel.');
      }
    });
  });
});
