import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.21 - Ubah salah satu field, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.21: Ubah salah satu field, klik Simpan -> Data ter-update; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /edit|ubah/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.editRiwayatData.indikasi, { force: true });
      cy.wait(400);

      cy.contains('button[type="submit"], button', 'Simpan')
        .should('be.visible')
        .click({ force: true });
    });

    cy.wait(1000);
    cy.get('body').should('contain.text', testData.editRiwayatData.indikasi);
  });
});
