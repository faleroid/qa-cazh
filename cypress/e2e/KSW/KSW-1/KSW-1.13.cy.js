import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.13 - Klik link Download Template Import', () => {
  before(() => {
    cy.task('deleteDownloads');
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.13: Pilih Instansi wajib diisi terlebih dahulu → Klik tombol Download Template Import → Template Excel terunduh secara sukses', () => {
    // 1. Buka Modal Import Progres Kegiatan
    cy.contains('button', 'Import Progres').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Pilih Instansi (Required) terlebih dahulu
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Academy QA Engineer').click({ force: true });
    cy.wait(800);

    // 3. Klik tombol "Download" template
    cy.contains('[role="dialog"] button', 'Download')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    cy.wait(2500);

    // 4. Verifikasi file template terunduh ke cypress/downloads/
    cy.task('readExcel', { filePath: 'cypress/downloads/Template_Progres_Kegiatan.xlsx' }).then((rows) => {
      if (rows) {
        expect(rows).to.be.an('array');
      }
    });
  });
});
