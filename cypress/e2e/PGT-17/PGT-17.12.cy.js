import InventoryCategoryPage from '../../pages/InventoryCategoryPage';
import testData from '../../fixtures/inventoryCategoryData.json';

describe('PGT-17.12 - Kategori Inventaris', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.12: Cek format kolom Tanggal Dibuat', () => {
    InventoryCategoryPage.elements.tableRows().first().find('td').first().invoke('text').should('match', /senin|selasa|rabu|kamis|jumat|sabtu|minggu|mon|tue|wed|thu|fri|sat|sun/i);
  });
});
