import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.86 - Centang checkbox pada satu baris data List Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.86: Centang checkbox pada satu baris data List Progres Kegiatan', () => {
    cy.get('tbody td button[role="checkbox"]').first().click({ force: true });
  });
});
