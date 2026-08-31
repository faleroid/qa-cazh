import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.28: Pada popup delete, klik tombol Batal', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.28: Pada popup delete, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi ada di tabel
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Klik tombol Hapus pada baris pertama
    cy.get('tbody tr', { timeout: 15000 })
      .first()
      .find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]')
      .closest('button')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(800);
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').should('be.visible');

    // 3. Klik tombol Batal pada popup delete
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').within(() => {
      cy.contains('button', /batal|cancel/i).click({ force: true });
    });

    // 4. Verifikasi popup tertutup & data tetap ada di tabel
    cy.wait(1000);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.get('tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);
  });
});
