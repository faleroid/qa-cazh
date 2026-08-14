import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.36 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.36: Centang header -> Klik Pilih semua -> Pindah ke Halaman 2 & kembali ke Halaman 1 -> Selection dipertahankan', () => {
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

    // Centang Header Checkbox khusus Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('[data-slot="data-grid-pagination"], button', { timeout: 10000 }).contains('2').first().click({ force: true });
      });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage2 = $body.find('button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage2, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
    });

    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('[data-slot="data-grid-pagination"], button', { timeout: 10000 }).contains('1').first().click({ force: true });
      });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage1 = $body.find('button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage1, 'Selection harus tetap aktif setelah kembali ke Halaman 1').to.be.true;
    });
  });
});
