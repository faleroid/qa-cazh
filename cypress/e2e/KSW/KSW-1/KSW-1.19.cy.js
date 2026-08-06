import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.19 - Pada field Anggota, ketik nomor kartu atau nama anggota', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.19: Pilih Instansi → Ketik nama/nomor kartu anggota → Sistem menampilkan list suggestion berisi Nama, Nomor Kartu, dan Tipe Anggota', () => {
    // 1. Buka Modal Tambah Progres Kegiatan
    cy.contains('button', 'Tambah Progres Kegiatan').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Pilih Instansi (Required agar input Anggota aktif)
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Academy QA Engineer').click({ force: true });
    cy.wait(800);

    // 3. Ketik nama anggota "Rocky Gibraltar" pada field Anggota
    cy.get('[role="dialog"] input[placeholder="Masukan Nomor Kartu atau Nama"]', { timeout: 15000 })
      .should('not.be.disabled')
      .click({ force: true })
      .clear()
      .type('Rocky Gibraltar');
    cy.wait(1200);

    // 4. Verifikasi ketat: Suggestion overlay tampil & memuat Nama, Nomor Kartu, dan Tipe Anggota
    cy.get('div.absolute.z-50 button', { timeout: 10000 })
      .first()
      .should('be.visible')
      .within(() => {
        cy.contains('Rocky Gibraltar').should('be.visible');
        cy.contains('1002992462475639').should('be.visible');
        cy.contains('Siswa').should('be.visible');
      });
  });
});
