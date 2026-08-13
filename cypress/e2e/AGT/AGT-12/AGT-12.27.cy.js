import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.27 - Centang checkbox pada satu baris data Riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.27: Centang checkbox pada satu baris data Riwayat -> Baris terpilih; action bar muncul menampilkan jumlah terpilih dan tombol Hapus Terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
    cy.contains('button', /hapus/i, { timeout: 10000 }).should('be.visible');
  });
});
