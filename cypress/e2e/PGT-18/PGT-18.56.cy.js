import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.56 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.56 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    const uniqueCat = 'Sikap Tidak Sopan Terhadap Guru';
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: uniqueCat, minPoin: '301', maxPoin: '305' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    ViolationTypePage.search(uniqueCat);
    ViolationTypePage.elements.tableRows().should('have.length', 1);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.emptyState().should('be.visible');
  });
});
