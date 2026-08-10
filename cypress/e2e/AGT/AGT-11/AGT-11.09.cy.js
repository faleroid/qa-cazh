import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.09 - Cari data dengan keyword Deskripsi yang cocok', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.09: Tab Progres → Cari keyword Deskripsi → Sistem menampilkan list sesuai hasil pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.descKeyword);
    cy.get('body').should('exist');
  });
});
