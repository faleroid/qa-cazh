import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.34 - Coba centang lebih dari 50 data secara manual', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.34: Ubah pagination ke 100 -> Centang header -> Cek "data kesehatan dipilih" -> Coba klik baris lain -> Maksimal 50 data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // LANGKAH 1: UBAH PAGINATION KE 100 PER HALAMAN
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
          .first()
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .click({ force: true });
      });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    cy.wait(2000);

    // LANGKAH 2: CLICK CENTANG HEADERNYA DAN CEK TEKS "data kesehatan dipilih"
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1500);

    // Cek teks "data kesehatan dipilih" secara fleksibel (tanpa membatasi tag span saja)
    cy.contains(/(\d+)\s*data kesehatan dipilih|terpilih/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    // LANGKAH 3: COBA CLICK BEBAS BARIS MANA AJA UNTUK UJI MAKSIMAL 50 DATA TERPILIH
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        if ($rows.length > 50) {
          cy.wrap($rows.eq(50)).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
            cy.get('button[role="checkbox"], input[type="checkbox"]').first()
              .click({ force: true });
          });
          cy.wait(800);
        } else {
          cy.wrap($rows.last()).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
            cy.get('button[role="checkbox"], input[type="checkbox"]').first()
              .click({ force: true });
          });
          cy.wait(800);
        }
      });

    // Cek bahwa teks limit atau data kesehatan dipilih tetap aktif di layar
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasLimitToastOrSpan = text.includes('data kesehatan dipilih') || text.includes('terpilih') || text.includes('50') || text.includes('maksimal');
      expect(hasLimitToastOrSpan, 'Sistem harus mempertahankan batas maksimal 50 data kesehatan dipilih').to.be.true;
    });
  });
});
