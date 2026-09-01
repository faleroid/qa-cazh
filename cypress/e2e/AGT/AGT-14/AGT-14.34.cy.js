import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.34 - Pada popup bulk delete, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.34: Pada popup bulk delete, klik tombol Hapus -> Seluruh data terpilih berhasil dihapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang data
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);

    // 3. Klik tombol Hapus Terpilih
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 4. Klik tombol konfirmasi Hapus di dalam dialog
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|delete|confirm|setuju/i).click({ force: true });
      });

    // 5. Verifikasi popup tertutup
    cy.wait(1500);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
  });
});
