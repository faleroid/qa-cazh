import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.20 - Cek data yang muncul pada suggestion field Anggota', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.20: Cek data yang muncul pada suggestion field Anggota → Suggestion hanya menampilkan anggota tipe Siswa (Guru/tipe lain tidak muncul)', () => {
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

    // 4. Verifikasi ketat: Suggestion menampilkan tipe Siswa dan tidak memuat tipe Guru
    cy.get('div.absolute.z-50 button', { timeout: 10000 }).first().within(() => {
      cy.contains('Siswa').should('be.visible');
      cy.contains('Guru').should('not.exist');
    });
  });
});
