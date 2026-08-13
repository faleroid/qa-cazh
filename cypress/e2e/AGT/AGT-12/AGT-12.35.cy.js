import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.35 - Ubah filter/search saat ada data terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.35: Ubah filter/search saat ada data terpilih -> Notifikasi "Pilihan direset karena filter berubah" muncul & selection direset', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);

    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    StudentDetailPage.searchKeyword(testData.search.indikasiKeyword);
    cy.wait(600);

    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });
});
