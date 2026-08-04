import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.08 - Lakukan pencarian, kemudian klik tombol Excel', () => {
  before(() => {
    cy.task('deleteDownloads');
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.08: Lakukan pencarian, kemudian klik tombol Excel', () => {
    ProgressActivityPage.searchKeyword('Kegiatan Pertama');
    cy.contains('button', 'Excel').should('be.visible').click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' })
      .should('be.a', 'string')
      .then((filePath) => cy.task('readExcel', { filePath }))
      .then((rows) => {
        expect(rows, 'File Excel harus berisi data').to.be.an('array').that.is.not.empty;
        expect(rows[0]).to.exist;
      });
  });
});
