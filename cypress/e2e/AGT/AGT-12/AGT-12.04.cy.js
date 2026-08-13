import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.04 - Kosongkan seluruh field Kesehatan, simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.04: Kosongkan seluruh field Kesehatan, simpan -> Data tersimpan tanpa error (seluruh field optional)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Fokus 1x ke container form Data Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Data Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.wait(400);

    // Kosongkan seluruh field pada form tanpa jumpy scroll kebawah
    cy.get('input[name="medical_history"], input[name="color_blind_test_result"], input[name="height"], input[name="weight"]')
      .each(($input) => {
        cy.wrap($input)
          .should('be.visible')
          .clear({ force: true })
          .should('have.value', '');
        cy.wait(150);
      });

    // Klik tombol Simpan (layar tetap fokus stabil pada container Data Kesehatan)
    cy.contains('button[type="submit"], button', 'Simpan', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    cy.get('input[name="medical_history"]').should('have.value', '');
    cy.get('input[name="height"]').should('have.value', '');
  });
});
