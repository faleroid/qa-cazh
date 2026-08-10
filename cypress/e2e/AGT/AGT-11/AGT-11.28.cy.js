import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.28 - Centang checkbox pada header tabel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.28: Centang checkbox header tabel → Seluruh data pada halaman aktif terpilih & muncul banner pilih semua', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]').first().click({ force: true });
    cy.wait(800);

    cy.get('body').should('contain.text', 'dipilih');
  });
});
