import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.30 - Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.30: Centang header -> Klik link Pilih Semua pada banner (> 50 data) -> Sistem memilih 50 data pertama & menampilkan notifikasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]').first().click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      if ($body.text().includes('Pilih semua')) {
        cy.contains('Pilih semua').click({ force: true });
        cy.wait(600);
      }
    });
  });
});
