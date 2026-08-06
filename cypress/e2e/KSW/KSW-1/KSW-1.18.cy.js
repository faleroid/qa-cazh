import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.18 - Cek field pada form Tambah Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.18: Cek field pada form Tambah Progres Kegiatan → Menampilkan field Instansi, Anggota, Nama Progres Kegiatan, dan Deskripsi (Opsional)', () => {
    // 1. Buka Modal Tambah Progres Kegiatan
    cy.contains('button', 'Tambah Progres Kegiatan').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Verifikasi Modal Dialog Terbuka & Memuat Header Judul
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"] [data-slot="dialog-title"]').should('contain.text', 'Tambah Progres Kegiatan');

    // 3. Verifikasi Ke-4 Field Utama Sesuai DOM Real Radix
    cy.get('[role="dialog"]').within(() => {
      // Field 1: Instansi
      cy.contains('label', 'Instansi').should('be.visible');
      cy.get('button[data-slot="select-trigger"]').should('be.visible');

      // Field 2: Anggota (Terlihat warning "Silakan pilih instansi terlebih dahulu")
      cy.contains('label', 'Anggota').should('be.visible');
      cy.get('input[placeholder="Masukan Nomor Kartu atau Nama"]').should('exist').and('be.disabled');
      cy.contains('p', 'Silakan pilih instansi terlebih dahulu').should('be.visible');

      // Field 3: Nama Progres Kegiatan
      cy.contains('label', 'Nama Progres Kegiatan').should('be.visible');
      cy.get('input[name="name"]').should('be.visible').and('have.attr', 'placeholder', 'Contoh: Pentas Seni');

      // Field 4: Deskripsi (Opsional)
      cy.contains('label', /deskripsi/i).should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');

      // Tombol Footer
      cy.contains('button', 'Batal').should('be.visible');
      cy.contains('button', 'Simpan').should('be.visible');
    });
  });
});
