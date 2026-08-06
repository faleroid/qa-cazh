import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.29 - Cek pengurutan default data pada tabel Daftar Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.29: Tambah 2 Riwayat Progres (Tanggal Lama & Tanggal Terbaru) → Verifikasi data diurutkan dari Tanggal Kegiatan terbaru ke terlama', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // ==========================================
    // 2. TAMBAH RIWAYAT 1: Tanggal Lama (01 Agt 2026)
    // ==========================================
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // Pilih Tanggal 1 Agt 2026
    cy.get('[role="dialog"] button:contains("DD/MM/YYYY")').click({ force: true });
    cy.wait(600);
    cy.get('button[aria-label*="August 1st"], td[data-day="2026-08-01"] button').first().click({ force: true });
    cy.wait(800);

    // Isi Persentase & Deskripsi Riwayat 1
    cy.get('[role="dialog"] input[name="percentage"]').clear({ force: true }).type('50', { force: true });
    cy.get('[role="dialog"] textarea[name="description"]').clear({ force: true }).type('Riwayat Pertama Tanggal Lama', { force: true });
    cy.wait(800);
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1500);

    // ==========================================
    // 3. TAMBAH RIWAYAT 2: Tanggal Terbaru (06 Agt 2026 / Today)
    // ==========================================
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // Pilih Tanggal Hari Ini (06 Agt 2026)
    cy.get('[role="dialog"] button:contains("DD/MM/YYYY")').click({ force: true });
    cy.wait(600);
    cy.get('button[aria-label*="Today"], td[data-day="2026-08-06"] button').first().click({ force: true });
    cy.wait(800);

    // Isi Persentase & Deskripsi Riwayat 2
    cy.get('[role="dialog"] input[name="percentage"]').clear({ force: true }).type('90', { force: true });
    cy.get('[role="dialog"] textarea[name="description"]').clear({ force: true }).type('Riwayat Kedua Tanggal Terbaru', { force: true });
    cy.wait(800);
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1500);

    // ==========================================
    // 4. VERIFIKASI PENGURUTAN RIGORUS (Terbaru -> Terlama)
    // ==========================================
    cy.get('tbody tr').should('have.length.at.least', 2);
    
    // Baris Pertama Harus Riwayat Terbaru (90% / Riwayat Kedua Tanggal Terbaru)
    cy.get('tbody tr').eq(0).within(() => {
      cy.contains('Riwayat Kedua Tanggal Terbaru').should('be.visible');
    });

    // Baris Kedua Harus Riwayat Lama (50% / Riwayat Pertama Tanggal Lama)
    cy.get('tbody tr').eq(1).within(() => {
      cy.contains('Riwayat Pertama Tanggal Lama').should('be.visible');
    });
  });
});
