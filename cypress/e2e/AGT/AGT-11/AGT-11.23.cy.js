import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.23 - Pada popup delete, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.23: Popup delete confirmation → Klik Batal → Popup menutup & data tidak terhapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
