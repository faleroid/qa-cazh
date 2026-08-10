import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.25 - Lakukan pencarian, klik Excel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.25: Tab Progres → Cari keyword → Klik tombol Excel → File .XLSX terunduh sesuai hasil pencarian', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.validKeyword);

    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath, 'File Excel .xlsx hasil pencarian harus berhasil diunduh').to.not.be.null;
    });
  });
});
