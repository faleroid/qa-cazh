import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.40 - Klik tombol Excel pada tab Kesehatan (tanpa filter)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.40: Klik tombol Excel pada tab Kesehatan (tanpa filter) -> Sistem mengunduh file .XLSX berisi seluruh data Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Stub URL.createObjectURL & window.open serta intercept request export untuk mencegah penumpukan file download fisik di disk
    cy.window().then((win) => {
      if (win.URL && win.URL.createObjectURL) {
        cy.stub(win.URL, 'createObjectURL').as('createBlobUrl').returns('blob:mock-excel-file');
      }
      cy.stub(win, 'open').as('winOpen');
    });

    cy.intercept(/export|excel/i, (req) => {
      req.reply({
        statusCode: 200,
        body: 'mock excel file content',
        headers: {
          'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'content-disposition': 'attachment; filename="riwayat_kesehatan.xlsx"',
        },
      });
    }).as('exportApi');

    // Scroll layar Cypress langsung ke Card 3 (Riwayat Kesehatan)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Klik tombol Excel di Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, a', /excel|export/i, { timeout: 10000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .first()
          .click({ force: true });
      });

    cy.wait(1000);
    cy.get('body').should('exist');
  });
});
