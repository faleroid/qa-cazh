import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.37 - Pindah halaman saat selection berasal dari centang manual per halaman', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.37: Centang manual data -> Pindah ke Halaman 2 -> Selection ter-reset', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 1. Centang data pertama secara manual
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    // Verifikasi status Terpilih muncul di halaman 1
    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');

    // 2. Pindah ke halaman 2 via pagination
    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    // 3. Verifikasi bahwa selection ter-reset (toolbar Terpilih hilang / tidak exist)
    cy.get('body').then(($body) => {
      const btnTerpilih = $body.find('button:contains("Terpilih"), [data-slot="card-toolbar"] button:contains("Terpilih")');
      expect(btnTerpilih.length, 'Selection harus ter-reset setelah pindah halaman dari centang manual').to.equal(0);
    });
  });
});
