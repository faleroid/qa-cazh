import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.17: Upload format foto invalid ditolak', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.17: Upload format foto invalid ditolak', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();
    cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should('be.visible');

    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/studentData.json', { force: true });
    cy.wait(600);
    cy.get('[role="dialog"]').should(($dialog) => {
      const text = $dialog.text();
      expect(text).to.match(/format|jpg|jpeg|png|valid|heic|heif/i);
    });
  });
});
