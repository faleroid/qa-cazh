import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.15 - Cek nilai Pencapaian Terakhir pada kegiatan yang baru pertama kali ditambah', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.15: Kegiatan baru ditambah → Verifikasi Pencapaian Terakhir = 0%', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().within(() => {
      cy.contains(/0%/).should('exist');
    });
  });
});
