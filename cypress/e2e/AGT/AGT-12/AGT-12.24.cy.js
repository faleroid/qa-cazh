import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.24 - Pada baris List Riwayat, klik Aksi -> Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.24: Pada baris List Riwayat, klik Aksi -> Hapus -> Sistem menampilkan popup delete confirmation', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().within(() => {
      cy.contains('button', /hapus|delete/i).click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });
});
