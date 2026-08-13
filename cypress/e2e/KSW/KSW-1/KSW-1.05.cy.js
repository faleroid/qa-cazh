import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.05 - Cari data pada kolom pencarian dengan keyword Kegiatan yang cocok', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.05: Cari data pada kolom pencarian dengan keyword Kegiatan yang cocok', () => {
    ProgressActivityPage.searchKeyword("Kegiatan Pertama");
    cy.get('table[data-slot="data-grid-table"] tbody tr').should("have.length.at.least", 1);
    cy.get('table[data-slot="data-grid-table"] tbody tr').first().should("contain.text", "Kegiatan Pertama");
  });
});
