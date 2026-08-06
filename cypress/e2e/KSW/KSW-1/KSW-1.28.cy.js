import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.27 / KSW-1.28 - Cek section Daftar Progres Kegiatan pada halaman Detail', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.28: Buka halaman Detail Progres Kegiatan → Cek section Daftar Progres Kegiatan (Toolbar Filter Tanggal, Tambah Riwayat, Search, Excel, serta Kolom Tabel)', () => {
    // 1. Klik nama anggota / link detail pada baris pertama tabel List Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Verifikasi Card "Daftar Progres Kegiatan" Tampil di Layar
    cy.contains('[data-slot="card-title"]', 'Daftar Progres Kegiatan').should('be.visible');

    // 3. Verifikasi Toolbar Aksis & Filter
    cy.get('button[data-slot="popover-trigger"]').should('be.visible'); // Filter Tanggal
    cy.contains('button', 'Tambah Riwayat').should('be.visible');        // Tombol Tambah Riwayat
    cy.get('input[placeholder="Cari"]').should('be.visible');             // Input Search
    cy.contains('button', 'Excel').should('be.visible');                 // Tombol Export Excel

    // 4. Verifikasi Kolom-kolom Utama Tabel (Menggunakan should('exist') untuk kolom dalam scroll area horizontal)
    cy.get('thead').within(() => {
      cy.contains('th', 'Dibuat Pada').should('exist');
      cy.contains('th', 'Tanggal Kegiatan').should('exist');
      cy.contains('th', 'Pencapaian Terakhir').should('exist');
      cy.contains('th', 'Dibuat Oleh').should('exist');
      cy.contains('th', 'Deskripsi').should('exist');
      cy.contains('th', 'File').should('exist');
    });
  });
});
