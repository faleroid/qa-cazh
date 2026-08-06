import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.21 - Klik salah satu list suggestion pada field Anggota', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.21: Klik salah satu list suggestion pada field Anggota → Anggota terpilih terisi otomatis pada form', () => {
    // 1. Buka Modal Tambah Progres Kegiatan
    cy.contains('button', 'Tambah Progres Kegiatan').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Pilih Instansi
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Academy QA Engineer').click({ force: true });
    cy.wait(800);

    // 3. Ketik nama anggota "Rocky Gibraltar"
    cy.get('[role="dialog"] input[placeholder="Masukan Nomor Kartu atau Nama"]')
      .should('not.be.disabled')
      .click({ force: true })
      .clear()
      .type('Rocky Gibraltar');
    cy.wait(1200);

    // 4. Klik list suggestion pada overlay
    cy.get('div.absolute.z-50 button', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
    cy.wait(800);

    // 5. Verifikasi ketat: Card anggota terpilih terisi otomatis pada form
    cy.get('[role="dialog"]').within(() => {
      cy.contains('p', 'Rocky Gibraltar').should('be.visible');
      cy.contains('1002992462475639').should('be.visible');
    });
  });
});
