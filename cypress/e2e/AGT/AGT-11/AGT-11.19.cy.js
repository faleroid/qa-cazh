import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.19 - Kosongkan Nama Kegiatan, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.19: Form Edit → Kosongkan Nama Kegiatan → Klik Simpan → Button tidak aktif / pesan error validasi required', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[type="text"]').first().clear();
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible');
  });
});
