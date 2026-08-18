import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.37 - Pindah halaman saat selection berasal dari centang manual per halaman', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.37: Centang manual data -> Pindah ke Halaman 2 -> Selection ter-reset', () => {
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

    // 2. Centang manual 1 baris data di Halaman 1
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
      });

    cy.wait(800);

    // Verifikasi banner seleksi manual aktif di Halaman 1
    cy.contains(/terpilih|dipilih/i, { timeout: 10000 }).should('be.visible');

    // 3. Pindah ke Halaman 2 via tombol pagination 2
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

    // 4. Verifikasi status seleksi manual di Halaman 2 (baris data Halaman 2 tidak tercentang)
    cy.get('body').then(($body) => {
      const isRowCheckedOnPage2 = $body.find('tbody button[aria-checked="true"], tbody [data-state="checked"]').length > 0;
      
      expect(isRowCheckedOnPage2, 'Baris data di Halaman 2 tidak boleh tercentang secara otomatis dari seleksi manual Halaman 1').to.be.false;
    });
  });
});
