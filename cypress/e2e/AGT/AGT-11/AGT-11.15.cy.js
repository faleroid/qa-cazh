import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.15 - Cek nilai Pencapaian Terakhir pada kegiatan yang baru pertama kali ditambah', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.15: Kegiatan baru ditambah → Verifikasi Pencapaian Terakhir = 0% (Progress Bar indicator translateX(-100%))', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('tbody tr', { timeout: 15000 }).first().within(() => {
      // 1. Verifikasi elemen Progress Bar UI (role="progressbar") hadir di baris data
      cy.get('[role="progressbar"], [data-slot="progress"]').should('exist');

      // 2. Verifikasi indikator pencapaian bernilai 0% (style transform: translateX(-100%))
      cy.get('[data-slot="progress-indicator"]')
        .should('exist')
        .and('have.attr', 'style')
        .and('include', 'translateX(-100%)');
    });
  });
});
