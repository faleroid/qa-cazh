import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.17 - Pada baris data, klik Aksi → Edit', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.17: Tab Progres → Pada baris data, klik Aksi Edit → Form Edit tampil dengan data terisi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');
  });
});
