import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.33 - Pada popup Hapus Bulk, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.33: Pada popup Hapus Bulk, klik tombol Batal -> Selection tetap dipertahankan; kembali ke tab Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3) agar terlihat jelas di layar
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

    // Centang header/row checkbox pada Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], tbody tr button[role="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1000);

    // Klik tombol Hapus pada banner
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    // Pada popup modal Hapus Bulk, klik tombol Batal
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('button', /batal|cancel/i).click({ force: true });
      });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
  });
});
