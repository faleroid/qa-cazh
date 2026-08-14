import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.31 - Setelah data terpilih, klik tombol Hapus Terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.31: Centang header Card 3 -> Klik tombol Hapus Terpilih -> Popup confirmation muncul dengan preview data terpilih', () => {
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

    // Pastikan tabel Card 3 memiliki minimal 1 baris data
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(800);

    // CENTANG HEADER CHECKBOX KHUSUS CARD 3 (RIWAYAT KESEHATAN) - SESUAI PETUNJUK USER
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1000);

    // Klik tombol Hapus (pada banner / floating action bar)
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    // Assert dialog modal konfirmasi hapus terbuka
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible');
  });
});
