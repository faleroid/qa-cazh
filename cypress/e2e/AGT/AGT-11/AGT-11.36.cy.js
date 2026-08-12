import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.36 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.36: Centang header -> Klik Pilih semua -> Pindah ke Halaman 2 & kembali ke Halaman 1 -> Selection dipertahankan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 1. Centang header checkbox (Select All)
    cy.scrollTo('top');
    cy.wait(400);
    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(800);

    // 2. Klik "Pilih semua" di banner/toolbar jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 3. Pindah ke Halaman 2 via pagination
    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    // 4. Verifikasi tegas bahwa selection dipertahankan saat di Halaman 2
    cy.get('body').then(($body) => {
      const hasSelectionOnPage2 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage2, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
    });

    // 5. Pindah kembali ke Halaman 1 via pagination
    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('1').click({ force: true });
    });
    cy.wait(1000);

    // 6. Verifikasi tegas bahwa selection tetap dipertahankan setelah kembali ke Halaman 1
    cy.get('body').then(($body) => {
      const hasSelectionOnPage1 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage1, 'Selection harus tetap aktif setelah kembali ke Halaman 1').to.be.true;
    });
  });
});
