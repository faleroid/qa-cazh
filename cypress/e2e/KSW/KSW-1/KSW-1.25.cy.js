import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.25 - Pada baris List Progres Kegiatan, klik Aksi → Detail', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.25: Pada baris List Progres Kegiatan, klik Aksi → Detail', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true }); cy.url().should("include", "/student-affairs/progress/");
  });
});
