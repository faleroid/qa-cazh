import ViolationTypePage from '../../../pages/ViolationTypePage';
import testData from '../../../fixtures/violationTypeData.json';

describe('PGT-18.57 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it('PGT-18.57 Tambah Pelanggaran -> Cek Tipe Pelanggaran di tabel -> Hapus Tipe di setting -> Cek kembali di Pelanggaran', () => {
    const targetTypeName = 'Meninggalkan Kelas Tanpa Izin';

    // 1. Clean up existing test data with this name if present
    ViolationTypePage.visit();
    ViolationTypePage.search(targetTypeName);
    ViolationTypePage.deleteAllDataIfExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiText: 'Academy QA Engineer', nama: targetTypeName, minPoin: '100', maxPoin: '110' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 2. Buka Halaman Pelanggaran (/student-affairs/violation) & Tambah Pelanggaran
    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);

    cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

    // 2.1 Pilih Instansi "Academy QA Engineer"
    cy.get('[role="dialog"]').then(($dialog) => {
      const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
      if (instansiTrigger.length > 0) {
        cy.wrap(instansiTrigger.first()).click({ force: true });
        cy.wait(800);
        cy.get('[role="option"], [data-slot="select-item"]').contains(/Academy QA Engineer/i).click({ force: true });
        cy.wait(1200);
      }
    });

    // 2.2 Cari & Pilih Anggota ("rocky" -> Rocky Gibraltar)
    cy.get('[role="dialog"]').then(($dialog) => {
      const anggotaInput = $dialog.find('input[placeholder*="Cari Nomor Kartu"], input[placeholder*="Nama"]');
      if (anggotaInput.length > 0) {
        cy.wrap(anggotaInput.first()).clear({ force: true }).type('rocky', { force: true });
        cy.wait(1500);
        cy.contains('button', /Rocky Gibraltar|rocky/i, { timeout: 10000 })
          .scrollIntoView()
          .click({ force: true });
        cy.wait(800);
      }
    });

    // 2.3 Isi Tanggal Kejadian (Pilih Hari Ini pada Calendar)
    cy.get('[role="dialog"]').then(($dialog) => {
      const dateBtn = $dialog.find('button[name="date"], button:contains("DD/MM/YYYY")');
      if (dateBtn.length > 0) {
        cy.wrap(dateBtn.first()).click({ force: true });
        cy.wait(1000);
        cy.get('body').then(($body) => {
          const todayBtn = $body.find('button[aria-label*="Today"], td[data-today="true"] button, button.rdp-day_today');
          if (todayBtn.length > 0) {
            cy.wrap(todayBtn.first()).click({ force: true });
          } else {
            const dayCell = $body.find('table.rdp-month_grid tbody td button:not([disabled])');
            if (dayCell.length > 0) {
              cy.wrap(dayCell.last()).click({ force: true });
            }
          }
        });
        cy.wait(800);
      }
    });

    // 2.4 Pilih Tipe Pelanggaran yang baru dibuat
    cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
      .find('[role="combobox"], [data-slot="select-trigger"]')
      .click({ force: true });
    cy.wait(1000);
    cy.get('[role="option"], [data-slot="select-item"]').contains(targetTypeName).click({ force: true });
    cy.wait(800);

    // 2.5 Isi Kategori Pelanggaran
    cy.get('[role="dialog"]').then(($dialog) => {
      const catInput = $dialog.find('input[name="category"], input[placeholder*="Pelanggaran tata tertib"]');
      if (catInput.length > 0) {
        cy.wrap(catInput.first()).clear({ force: true }).type('Pelanggaran Tata Tertib', { force: true });
        cy.wait(500);
      }
    });

    // 2.6 Isi Poin Pelanggaran (Poin 100 sesuai range 100 - 110)
    cy.get('[role="dialog"]').then(($dialog) => {
      const pointInput = $dialog.find('input[name="point"], input[placeholder*="100"], input[type="number"]');
      if (pointInput.length > 0) {
        cy.wrap(pointInput.first()).clear({ force: true }).type('100', { force: true });
        cy.wait(500);
      }
    });

    // 2.7 Isi Sanksi
    cy.get('[role="dialog"]').then(($dialog) => {
      const penaltyInput = $dialog.find('input[name="penalty"], input[placeholder*="Peringatan tertulis"]');
      if (penaltyInput.length > 0) {
        cy.wrap(penaltyInput.first()).clear({ force: true }).type('Peringatan Tertulis', { force: true });
        cy.wait(500);
      }
    });

    // 2.8 Simpan Form Pelanggaran (dengan jeda untuk mencegah Rate Limit Exceeded)
    cy.wait(2000);
    cy.get('[role="dialog"]').find('button[type="submit"], button:contains("Simpan")').first().click({ force: true });
    cy.wait(3500);

    // 3. Verifikasi Tipe Pelanggaran ada di tabel /student-affairs/violation (termasuk elemen badge)
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('contain.text', targetTypeName);
        cy.get('td span[data-slot="badge"], td').contains(targetTypeName).should('be.visible');
      }
    });

    // 4. Kembali ke /setting/student-affairs/violation-type dan hapus Tipe Pelanggaran tersebut
    ViolationTypePage.visit();
    ViolationTypePage.search(targetTypeName);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    cy.wait(2000);

    // 5. Kembali lagi ke /student-affairs/violation dan verifikasi kolom Tipe Pelanggaran berubah menjadi <span>-</span>
    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('not.contain.text', targetTypeName);
        cy.get('table tbody td span').contains('-').should('be.visible');
      }
    });
  });
});
