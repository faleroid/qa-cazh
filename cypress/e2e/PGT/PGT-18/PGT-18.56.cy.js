import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.56 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.56 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    ViolationTypePage.ensureDataExists();
    cy.get('tbody tr').first().then(($row) => {
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\n')[0].trim();

      ViolationTypePage.search(cleanName);
      ViolationTypePage.elements.tableRows().should('have.length', 1);
      ViolationTypePage.clickDeleteFirstRow();
      ViolationTypePage.confirmDelete();
      ViolationTypePage.elements.emptyState().should('be.visible');
    });
  });
});
