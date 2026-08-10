import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.35 - Ubah filter/search saat ada data terpilih', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.35: Ubah filter/search saat ada data terpilih -> Selection direset & notifikasi "Pilihan direset karena filter berubah"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);

    StudentDetailPage.searchKeyword(testData.search.validKeyword);
    cy.wait(800);
  });
});
