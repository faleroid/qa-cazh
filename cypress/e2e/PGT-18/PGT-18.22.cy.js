import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.22 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.22 Tambah 2 tipe pelanggaran berturut-turut -> reload halaman', () => {
    const cat1 = 'Pelanggaran Auto 1';
    const cat2 = 'Pelanggaran Auto 2';

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat1, minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    
    // Jeda 3.5 detik untuk memulihkan threshold API Rate Limit backend
    cy.wait(3500);

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 1, nama: cat2, minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();

    // Penanganan khusus jika backend memicu rate limit
    cy.get('body').then(($body) => {
      if ($body.text().match(/rate limit/i)) {
        cy.wait(3500);
        ViolationTypePage.saveForm();
      }
    });

    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.contains(cat2, { timeout: 10000 }).should('be.visible');
  });
});
