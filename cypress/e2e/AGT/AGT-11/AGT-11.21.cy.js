import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.21 - Pada baris data, klik Aksi → Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.21: Tab Progres → Pada baris data, klik Aksi Hapus → Popup delete confirmation muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').should('be.visible');
      cy.contains('button', 'Hapus').should('be.visible');
    });
  });
});
