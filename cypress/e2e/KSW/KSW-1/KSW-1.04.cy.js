import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.04 - Cek urutan default list Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.04: Cek urutan default list Progres Kegiatan', () => {
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Kegiatan Pertama", "Deskripsi Pertama");
    cy.wait(1500);
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Kegiatan Kedua", "Deskripsi Kedua");
    cy.wait(1500);
    cy.get('table[data-slot="data-grid-table"] tbody tr').first().should("contain.text", "Kegiatan Kedua");
    cy.get('table[data-slot="data-grid-table"] tbody tr').eq(1).should("contain.text", "Kegiatan Pertama");
  });
});
