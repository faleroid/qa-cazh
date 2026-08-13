import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.30 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.30: Ubah pagination ke 100 -> Centang header -> Klik Pilih Semua (> 50 data) -> Toast Sonner info "Hanya 50 data pertama yang dipilih" muncul', () => {
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

    // 2. Scroll ke paling atas dan centang checkbox header
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(800);

    // 3. Klik tombol "Pilih semua" yang muncul di banner jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 4. Verifikasi notifikasi Sonner Toast info ("Hanya 50 data pertama yang dipilih")
    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Hanya 50 data pertama yang dipilih');
  });
});
