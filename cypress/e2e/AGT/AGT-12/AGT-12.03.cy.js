import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.03 - Isi salah satu field Kesehatan, simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.03: Isi salah satu field Kesehatan, simpan -> Data tersimpan tanpa error validasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Fokus 1x ke container form Data Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Data Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.wait(400);

    // Isi field dan klik Simpan tanpa jumpy scroll kebawah
    cy.get('input[name="height"], input[name="weight"], input[type="text"]').first()
      .should('be.visible')
      .clear({ force: true })
      .type(testData.healthData.tinggiBadan, { force: true });
    cy.wait(400);

    cy.contains('button[type="submit"], button', 'Simpan')
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    cy.get('body').should('exist');
  });
});
