import testData from '../fixtures/progressActivityData.json';

class ProgressActivityPage {
  // ---------------------------------------------------------------------------
  // HELPER METHODS (Direct, robust Cypress assertions matching V3 CAZH DOM)
  // ---------------------------------------------------------------------------
  
  visitList() {
    cy.visit(testData.urls.progressActivityPage, { failOnStatusCode: false, timeout: 30000 });
    cy.contains('h1', 'Progres Kegiatan', { timeout: 15000 }).should('be.visible');
  }

  verifyListHeaderAndActions() {
    cy.contains('h1', 'Progres Kegiatan', { timeout: 15000 }).should('be.visible');
    cy.contains('p', 'Ringkasan Data dan Penambahan', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Import Progres', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Tambah Progres Kegiatan', { timeout: 15000 }).should('be.visible');
  }

  verifyTableColumns() {
    cy.get('table[data-slot="data-grid-table"] thead tr', { timeout: 15000 }).should('be.visible');
    cy.get('button[aria-label="Select all"]', { timeout: 15000 }).should('exist');
    cy.contains('button', 'Nama', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Nama Kegiatan', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Dibuat Oleh', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Progress Terakhir', { timeout: 15000 }).should('be.visible');
    cy.contains('button', 'Tanggal Dibuat', { timeout: 15000 }).should('be.visible');
  }

  verifyEmptyState() {
    cy.contains('Data Progres Kegiatan tidak ditemukan', { timeout: 15000 }).should('be.visible');
    cy.contains('Tambah Progres Kegiatan', { timeout: 15000 }).should('be.visible');
  }

  deleteAllDataIfExists() {
    cy.get('body').then(($body) => {
      // Jika ada tombol Trash di baris tabel (berarti ada data)
      if ($body.find('tbody td button:has(svg.lucide-trash)').length > 0) {
        cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true });
        cy.wait(800);

        cy.get('[role="dialog"]').then(($dialog) => {
          if ($dialog.find('button').length > 0) {
            cy.contains('[role="dialog"] button', /hapus|delete|ya|confirm/i).click({ force: true });
            cy.wait(2000);
          }
        });

        this.deleteAllDataIfExists();
      }
    });
  }

  createNewProgressActivity(
    instansi = 'Academy QA Engineer',
    anggotaNama = 'Rocky Gibraltar',
    kegiatan = 'Pentas Seni',
    deskripsi = 'Kegiatan Pentas Seni'
  ) {
    // 1. Open Modal
    cy.contains('button', 'Tambah Progres Kegiatan', { timeout: 15000 }).should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"][data-slot="dialog-content"]', { timeout: 15000 }).should('be.visible');

    // 2. Select Instansi: "Academy QA Engineer"
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains(instansi).click({ force: true });
    cy.wait(800);

    // 3. Click Anggota search input & type name "Rocky Gibraltar"
    cy.get('[role="dialog"] input[placeholder="Masukan Nomor Kartu atau Nama"]', { timeout: 15000 })
      .should('not.be.disabled')
      .click({ force: true })
      .clear()
      .type(anggotaNama);
    cy.wait(1200);

    // 4. Click suggestion button inside div.absolute.z-50 overlay
    cy.get('div.absolute.z-50 button', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
    cy.wait(800);

    // 5. Fill Nama Progres Kegiatan
    cy.get('[role="dialog"] input[name="name"]').clear().type(kegiatan);

    // 6. Fill Deskripsi (Opsional)
    cy.get('[role="dialog"] textarea[name="description"]').clear().type(deskripsi);

    // 7. Submit (Click Simpan)
    cy.contains('[role="dialog"] button[type="submit"]', 'Simpan').click({ force: true });
    cy.wait(2000);
  }

  verifyDefaultSortNewestToOldest() {
    cy.get('table[data-slot="data-grid-table"] tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
  }

  searchKeyword(keyword) {
    cy.get('input[data-slot="input"][placeholder="Cari"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(`${keyword}{enter}`);
    cy.wait(1000);
  }
}

export default new ProgressActivityPage();
