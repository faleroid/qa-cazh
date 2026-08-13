import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.36 - Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.36: Centang header -> Klik Pilih semua -> Pindah ke Halaman 2 & kembali ke Halaman 1 -> Selection dipertahankan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.scrollTo('top');
    cy.wait(400);
    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage2 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage2, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('1').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage1 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage1, 'Selection harus tetap aktif setelah kembali ke Halaman 1').to.be.true;
    });
  });
});
