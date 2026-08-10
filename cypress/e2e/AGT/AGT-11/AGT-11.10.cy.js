import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.10 - Cari data dengan keyword tidak ditemukan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.10: Tab Progres → Cari keyword random/invalid → Sistem menampilkan list kosong (no result)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.contains(/tidak ditemukan|kosong|no result/i, { timeout: 10000 }).should('exist');
  });
});
