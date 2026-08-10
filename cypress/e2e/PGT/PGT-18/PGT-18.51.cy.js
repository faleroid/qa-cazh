import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.51 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    ViolationTypePage.visit();
    ViolationTypePage.ensureDataExists();

    // 1. Cari baris dengan status 'Aktif' dan dapatkan nama Instansi & Tipe Pelanggaran
    cy.contains('tbody tr', /aktif/i).first().then(($row) => {
      const instansiName = $row.find('td').eq(0).text().trim();
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\n')[0].trim();
      const cleanInstansi = instansiName.split('\n')[0].trim();
      
      cy.wrap(cleanName).as('targetTypeName');
      cy.wrap(cleanInstansi).as('targetInstansiName');

      // 2. Klik Edit pada baris 'Aktif' tersebut secara stabil
      const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)');
      cy.wrap(editBtn.first()).scrollIntoView();
      cy.wait(800);
      cy.wrap(editBtn.first()).click({ force: true });
    });
    cy.wait(1200);
    ViolationTypePage.elements.formModal({ timeout: 15000 }).should('be.visible');

    // 3. Ubah status dari 'Aktif' menjadi 'Tidak Aktif' lalu Simpan
    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 4. Navigasi ke Halaman Pelanggaran (/student-affairs/violation)
    cy.get('@targetInstansiName').then((targetInstansiName) => {
      cy.get('@targetTypeName').then((targetTypeName) => {
        const instansiKeyword = targetInstansiName.slice(0, 10);
        const typeKeyword = targetTypeName.slice(0, 15);

        cy.visit('/student-affairs/violation', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('be.visible');
        cy.wait(2500);

        // 5. Klik tombol "Tambah Pelanggaran"
        cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
        cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

        // 5.5. Pilih Instansi yang MATCH dengan Instansi tipe pelanggaran yang dinonaktifkan
        cy.get('[role="dialog"]').then(($dialog) => {
          const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
          if (instansiTrigger.length > 0) {
            cy.wrap(instansiTrigger.first()).click({ force: true });
            cy.wait(800);
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(instansiKeyword, 'i')).first().click({ force: true });
            cy.wait(1200);
          }
        });

        // 6. Buka dropdown "Tipe Pelanggaran" di dalam dialog modal
        cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
          .find('[role="combobox"], [data-slot="select-trigger"]')
          .click({ force: true });
        cy.wait(1000);

        // 7. Verifikasi tipe pelanggaran yang dinonaktifkan TIDAK muncul di dropdown pilihan aktif
        cy.get('body').then(($body) => {
          if ($body.find('[role="option"], [data-slot="select-item"]').length > 0) {
            cy.get('[role="option"], [data-slot="select-item"]').should('not.contain.text', typeKeyword);
          } else {
            cy.get('select option').should('not.contain.text', typeKeyword);
          }
        });
      });
    });
  });
});
