import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.27 - Centang checkbox pada satu baris data', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.27: Centang checkbox pada 1 baris data → Action bar muncul menampilkan jumlah terpilih dan tombol Hapus Terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    cy.contains(/dipilih/i).should('be.visible');
    cy.contains('button', /hapus/i).should('be.visible');
  });
});
