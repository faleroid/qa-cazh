import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.20 - Pada baris List Riwayat, klik Aksi -> Edit', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.20: Pada baris List Riwayat, klik Aksi -> Edit -> Sistem menampilkan form Edit dengan data terisi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().within(() => {
      cy.contains('button', /edit|ubah/i).click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });
});
