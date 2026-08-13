import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.80 - Ubah salah satu field required, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it.skip('KSW-1.80: Ubah salah satu field required, klik Simpan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.contains('[role="dialog"] button[type="submit"]', "Simpan").click({ force: true });
  });
});
