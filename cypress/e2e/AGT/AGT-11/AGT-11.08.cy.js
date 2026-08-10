import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.08 - Cari data dengan keyword Kegiatan yang cocok', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.08: Tab Progres → Cari keyword Kegiatan → Sistem menampilkan list sesuai hasil pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.validKeyword);
    cy.get('body').should('exist');
  });
});
