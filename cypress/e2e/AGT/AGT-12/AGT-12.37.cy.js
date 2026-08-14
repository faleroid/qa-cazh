import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.37 - Pindah halaman saat selection berasal dari centang manual per halaman', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.37: Centang manual data -> Pindah ke Halaman 2 -> Selection ter-reset', () => {
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

    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
      });

    cy.wait(600);

    cy.contains('button', /terpilih/i, { timeout: 10000 }).should('be.visible');

    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button', { timeout: 10000 }).contains('2').first().click({ force: true });
      });

    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnTerpilih = $body.find('button:contains("Terpilih")');
      expect(btnTerpilih.length, 'Selection harus ter-reset setelah pindah halaman dari centang manual').to.equal(0);
    });
  });
});
