import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.25: Klik tombol Batal pada form Edit Prestasi', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.25: Klik tombol Batal pada form Edit Prestasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi ada di tabel
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Buka form Edit pada baris pertama
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Klik tombol Batal pada form Edit
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', /batal/i).click({ force: true });
    });

    // 4. Verifikasi modal tertutup
    cy.wait(800);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
  });
});
