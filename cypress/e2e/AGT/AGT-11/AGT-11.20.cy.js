import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.20 - Klik tombol Batal pada form Edit', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.20: Form Edit → Klik Batal → Form menutup tanpa menyimpan perubahan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);

    cy.contains('[role="dialog"] button', 'Batal').click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
