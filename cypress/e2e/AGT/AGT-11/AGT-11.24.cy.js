import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.24 - Klik tombol Excel pada tab Progres (tanpa filter)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.24: Tab Progres → Klik tombol Excel → Sistem mengunduh file .XLSX', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath, 'File Excel .xlsx hasil export harus berhasil diunduh').to.not.be.null;
    });
  });
});
