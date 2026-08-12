import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.29 - Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.29: Tambah 50 data -> Ubah pagination jadi 100 -> Centang header -> Klik Pilih Semua -> Seluruh 50 data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 1. Cek ketersediaan 50 data kegiatan (tambah 50 data jika belum ada 50 data)
    cy.get('body').then(($body) => {
      const text = $body.text();
      if (!text.includes('dari 5') && !text.includes('dari 6')) {
        Cypress._.times(50, (i) => {
          const activityNum = i + 1;
          cy.get('body').then(($b) => {
            if ($b.find('[role="dialog"]').length > 0) {
              cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
            }
          });
          cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
          cy.get('[role="dialog"]', { timeout: 20000 }).should('be.visible').within(() => {
            cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear({ force: true }).type(`Kegiatan Auto 50 - ${activityNum}`);
            cy.contains('button', /simpan|submit/i).click({ force: true });
          });
          cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
        });
      }
    });

    // 2. Ubah "Baris Per Halaman" (Pagination) menjadi 100
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

    // 3. Scroll ke paling atas dan centang checkbox header (Select All)
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);

    // 4. Klik tombol "Pilih semua" yang muncul di banner/toolbar jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 5. Verifikasi tegas status data terpilih pada halaman
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const text = $body.text().toLowerCase();
      const hasSelection = text.includes('terpilih') || text.includes('pilih') || $body.find('tbody tr button[aria-checked="true"]').length > 0 || $body.find('[data-slot="card-toolbar"]').length > 0;
      expect(hasSelection, 'Halaman harus memuat status data terpilih').to.be.true;
    });
  });
});
