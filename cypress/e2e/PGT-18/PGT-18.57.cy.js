import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.57 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it('PGT-18.57 Hapus tipe pelanggaran -> Cek Tipe di /student-affairs/violation terhapus (-)', () => {
    // 1. Buka /setting/student-affairs/violation-type & baca nama tipe di baris pertama
    ViolationTypePage.visit();
    cy.wait(1500);

    ViolationTypePage.ensureDataExists();
    cy.wait(500);

    ViolationTypePage.elements.tableRows().first().within(() => {
      cy.get('td').eq(1).invoke('text').as('deletedTypeName');
    });

    cy.get('@deletedTypeName').then((typeName) => {
      const cleanTypeName = typeName.trim();

      // 2. Hapus tipe pelanggaran tersebut
      ViolationTypePage.clickDeleteFirstRow();
      cy.wait(800);
      ViolationTypePage.confirmDelete();
      cy.wait(2000);

      // 3. Buka halaman Laporan Pelanggaran https://v3.cazh.id/student-affairs/violation
      cy.visit('/student-affairs/violation', { failOnStatusCode: false });
      cy.wait(1500);
      cy.get('body', { timeout: 10000 }).should('be.visible');
      cy.contains('h1', 'Pelanggaran').should('be.visible');
      cy.get('table[data-slot="data-grid-table"]').should('be.visible');

      // Tipe yang dihapus TIDAK BOLEH ADA di tabel ("jika tidak ada benar")
      cy.get('table[data-slot="data-grid-table"]').should('not.contain', cleanTypeName);

      // Sel kolom Tipe menampilkan tanda hubung '-'
      cy.get('table[data-slot="data-grid-table"] tbody td').contains('-').should('exist');
    });
  });
});
