import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.12 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.12 Cek format kolom Tanggal Dibuat', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.tableRows().first().find('td').invoke('text').should('match', /[a-zA-Z]+, \d{1,2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}/);
  });
});
