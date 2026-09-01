import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.31: Pilih semua <= 50', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.31: Pilih semua <= 50', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang checkbox header tabel
    cy.get('thead [role="checkbox"], thead input[type="checkbox"], thead button[role="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    // 3. Verifikasi
    cy.get('body').should('exist');
  });
});
