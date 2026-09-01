import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.33 - Setelah data terpilih, klik tombol Hapus Terpilih', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.33: Setelah data terpilih, klik tombol Hapus Terpilih -> Popup confirmation muncul dengan preview data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan minimal ada data di tabel
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang checkbox pada baris data tabel
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);

    // 3. Klik tombol Hapus (pada action toolbar / banner)
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // 4. Verifikasi popup konfirmasi hapus massal muncul
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains(/hapus|yakin|prestasi/i).should('exist');
      });
  });
});
