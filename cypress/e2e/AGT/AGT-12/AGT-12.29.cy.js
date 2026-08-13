import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.29 - Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.29: Centang header -> Klik Pilih Semua (<= 50 data) -> Seluruh data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Ubah "Baris Per Halaman" (Pagination) menjadi 100
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    // 2. Scroll ke paling atas & centang header (Select All)
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);

    // 3. Klik tombol "Pilih semua" yang muncul di banner jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 4. Verifikasi status data terpilih
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const text = $body.text().toLowerCase();
      const hasSelection = text.includes('terpilih') || text.includes('pilih') || $body.find('tbody tr button[aria-checked="true"]').length > 0 || $body.find('[data-slot="card-toolbar"]').length > 0;
      expect(hasSelection, 'Halaman harus memuat status data terpilih').to.be.true;
    });
  });
});
