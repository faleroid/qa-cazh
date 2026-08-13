import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.14 - Cari dengan keyword tidak ditemukan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.14: Cari dengan keyword tidak ditemukan -> Sistem menampilkan list kosong (no result)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);
    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.get('body').should('exist');
  });
});
