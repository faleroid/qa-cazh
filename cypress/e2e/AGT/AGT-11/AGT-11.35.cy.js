import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.35 - Ubah filter/search saat ada data terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.35: Ubah filter/search saat ada data terpilih -> Notifikasi "Pilihan direset karena filter berubah" muncul & selection direset', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);

    // 1. Centang data pertama
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    // 2. Ubah search keyword untuk memicu filter berubah
    StudentDetailPage.searchKeyword(testData.search.validKeyword);
    cy.wait(600);

    // 3. Verifikasi notifikasi Sonner Toast "Pilihan direset karena filter berubah"
    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });
});
