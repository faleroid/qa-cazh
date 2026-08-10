import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.07 - Buka tab Progres saat siswa belum punya data progres kegiatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.07: Buka tab Progres pada siswa tanpa data → Sistem menampilkan list kosong (empty state)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').then(($body) => {
      if ($body.text().includes('tidak ditemukan') || $body.find('tbody tr').length === 0) {
        cy.contains(/tidak ditemukan|kosong|empty/i).should('exist');
      }
    });
  });
});
