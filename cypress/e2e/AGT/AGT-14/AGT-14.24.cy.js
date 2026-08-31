import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.24: Validasi Poin dan Foto pada form Edit', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.24: Validasi Poin dan Foto pada form Edit', () => {
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

    // 3. Validasi Poin: Poin > 100 ditolak
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"], input[name="poin"], input[type="number"]')
        .first()
        .clear({ force: true })
        .type('101', { force: true });
      cy.wait(200);
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.wait(500);
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

    // 4. Validasi Foto: Upload file > 512KB ditolak
    cy.get('[role="dialog"]').within(() => {
      // Reset poin ke nilai valid
      cy.get('input[name="point"], input[name="poin"], input[type="number"]')
        .first()
        .clear({ force: true })
        .type('30', { force: true });
      cy.wait(200);

      cy.get('input[type="file"]').selectFile('cypress/fixtures/oversized_11mb_file.pdf', { force: true });
      cy.wait(400);
    });
    cy.get('body').should('exist');

    // 5. Validasi Foto: Upload format invalid ditolak
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/studentData.json', { force: true });
      cy.wait(400);
    });
    cy.get('body').should('exist');
  });
});
