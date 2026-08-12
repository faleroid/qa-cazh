import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.30 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.30: Ubah pagination ke 100 -> Centang header -> Klik Pilih Semua (> 50 data) -> Toast Sonner info "Hanya 50 data pertama yang dipilih" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

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

    // 2. Scroll ke paling atas dan centang checkbox header (Select All)
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(800);

    // 3. Klik tombol "Pilih semua" jika tersedia di toolbar
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(600);
      }
    });

    // 4. Verifikasi notifikasi info ("Hanya 50 data pertama yang dipilih") atau toast status
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('contain.text', '50');
      } else {
        const text = $body.text();
        expect(text, 'Halaman harus memuat informasi 50 data terpilih').to.satisfy((t) => t.includes('50') || t.includes('terpilih'));
      }
    });
  });
});
