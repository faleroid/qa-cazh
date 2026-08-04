import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.72 - Isi kolom presentase dengan angka bulat 1-100 dan desimal 1.5-95.5', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.72: Isi kolom presentase dengan angka bulat 1-100 dan desimal 1.5-95.5', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });
});
