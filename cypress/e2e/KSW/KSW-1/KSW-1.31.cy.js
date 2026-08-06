import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.31 - Cek Pencapaian Terakhir pada section Data Siswa', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.31: Masuk ke Detail → Tambah Riwayat Baru (Persentase 85%) → Verifikasi Pencapaian Terakhir pada badge Data Siswa & Tabel menampilkan 85%', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Tambah Riwayat Baru dengan Persentase 85%
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // Pilih Tanggal pada Popover DatePicker
    cy.get('[role="dialog"] button:contains("DD/MM/YYYY")').click({ force: true });
    cy.wait(600);
    cy.get('button[aria-label*="Today"], button[aria-label*="August"], td[data-day] button').first().click({ force: true });
    cy.wait(800);

    // Isi Persentase (85%) & Deskripsi
    cy.get('[role="dialog"] input[name="percentage"]').clear({ force: true }).type('85', { force: true });
    cy.get('[role="dialog"] textarea[name="description"]').clear({ force: true }).type('Tes Pencapaian Terakhir 85 Percent', { force: true });
    cy.wait(800);

    // Klik Simpan
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1500);

    // 3. Verifikasi Pencapaian Terakhir pada Section Data Siswa (Badge Card Atas)
    cy.get('[data-slot="card-content"]').first().within(() => {
      cy.get('span[data-slot="badge"]').should('be.visible');
    });

    // 4. Verifikasi Persentase Pencapaian Terakhir pada Kolom Tabel (85%)
    cy.get('tbody tr').first().within(() => {
      cy.contains('span[data-slot="badge"]', '85%').should('be.visible');
    });
  });
});
