import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.19 - Klik tombol Batal pada form Tambah Riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.19: Klik tombol Batal pada form Tambah Riwayat -> Menutup dialog modal tanpa menyimpan data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"]').type('Demam Sementara', { force: true });
      cy.wait(200);
      cy.contains('button', /batal/i).click({ force: true });
    });

    cy.wait(600);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
