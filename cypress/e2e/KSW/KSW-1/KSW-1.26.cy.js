import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.26 - Cek section Data Siswa pada halaman Detail', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.26: Buka halaman Detail Progres Kegiatan → Cek section Data Siswa menampilkan info Instansi, Nama Anggota, Tingkat - Kelas, dan Kegiatan', () => {
    // 1. Klik nama anggota / link detail pada baris pertama tabel List Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Verifikasi masuk ke halaman Detail Progres Kegiatan
    cy.url().should('include', '/student-affairs/progress/');
    cy.contains('h1', 'Detail Progres Kegiatan').should('be.visible');

    // 3. Verifikasi Section Card Data Siswa (Top Header Card)
    cy.get('[data-slot="card-content"]').first().within(() => {
      // Nama Anggota (h2.text-xl.font-bold)
      cy.get('h2.text-xl.font-bold').should('be.visible');

      // Detail Kelas & Instansi (p.text-sm.text-muted-foreground: "Kelas - - Academy QA Engineer")
      cy.get('p.text-sm.text-muted-foreground').should('be.visible');

      // Badge Nama Kegiatan (span[data-slot="badge"])
      cy.get('span[data-slot="badge"]').should('be.visible');
    });
  });
});
