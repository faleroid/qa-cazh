import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.28 - Centang checkbox pada header tabel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.28: Centang checkbox pada header tabel → Seluruh data pada halaman aktif terpilih & muncul toolbar Terpilih & Pilih semua', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // Centang checkbox header tabel (Select All pada halaman aktif)
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]', { timeout: 15000 }).first().click({ force: true });
    cy.wait(800);

    // Verifikasi card-toolbar yang visible memuat tombol "Terpilih" dan "Pilih semua"
    cy.get('[data-slot="card-toolbar"]', { timeout: 15000 })
      .filter(':visible')
      .first()
      .within(() => {
        cy.contains('button', /terpilih/i).should('be.visible');
        cy.contains('button', /pilih semua/i).should('be.visible');
      });
  });
});
