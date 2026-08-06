import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.32 - Klik tombol Tambah Riwayat pada halaman Detail', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.32: Buka Detail Progres Kegiatan → Klik tombol Tambah Riwayat → Sistem menampilkan modal popup Tambah Riwayat', () => {
    // 1. Klik nama anggota / link detail pada baris pertama tabel List Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Klik tombol "Tambah Riwayat" pada halaman Detail
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 3. Verifikasi ketat: Modal dialog Tambah Riwayat tampil dengan judul & form
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"] [data-slot="dialog-title"]').should('contain.text', 'Tambah Riwayat');
  });
});
