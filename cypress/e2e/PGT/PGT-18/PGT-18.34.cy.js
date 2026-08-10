import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.34 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.34 Aktifkan filter + search sekaligus -> ada hasil match', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(500);
    ViolationTypePage.elements.selectOptions().contains(/^aktif$/i).first().click({ force: true });
    cy.wait(1500);

    cy.get('tbody tr').first().then(($row) => {
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const keyword = typeName.split(' ')[0] || typeName.slice(0, 5);
      
      ViolationTypePage.search(keyword);
      ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
      cy.get('tbody tr').should('contain.text', keyword);
    });
  });
});
