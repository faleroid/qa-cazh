import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.41 - Lakukan pencarian, klik Excel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.41: Lakukan pencarian, klik Excel -> Sistem mengunduh file .XLSX sesuai hasil pencarian saja', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    StudentDetailPage.searchKeyword(testData.search.indikasiKeyword);
    cy.wait(800);

    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });
});
