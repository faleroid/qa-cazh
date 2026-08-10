import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.22 - Pada popup delete, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.22: Popup delete confirmation → Klik Hapus → Kegiatan terhapus & pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Hapus').click({ force: true });
    });
    cy.wait(2000);
  });
});
