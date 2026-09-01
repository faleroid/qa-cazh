import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.32 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.32: Ubah pagination ke 100 -> Centang header -> Muncul notifikasi "Maksimal 50 data dapat dipilih sekaligus. 50 data pertama telah dipilih."', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Ubah "Baris Per Halaman" (Pagination) menjadi 100
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"], select', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(500);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1500);
      }
    });

    // 3. Scroll ke atas dan centang checkbox header tabel (Select All)
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    // 4. Verifikasi notifikasi toast Sonner muncul dengan pesan maksimal 50 data
    cy.get('[data-sonner-toast], [role="status"], [data-slot="toast"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Maksimal 50 data dapat dipilih sekaligus');
  });
});
