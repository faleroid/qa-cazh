import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.27 - Cek section Grafik pada halaman Detail', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.27: Buka halaman Detail Progres Kegiatan → Cek section Grafik Progres Kegiatan (Verifikasi Sumbu X & Sumbu Y: 0, 25, 50, 75, 100)', () => {
    // 1. Klik nama anggota / link detail pada baris pertama tabel List Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Verifikasi Card "Grafik Progres Kegiatan" Tampil di Layar
    cy.contains('[data-slot="card-title"]', 'Grafik Progres Kegiatan').should('be.visible');

    // 3. Verifikasi Container Recharts Line/Area Chart SVG Tampil
    cy.get('.recharts-responsive-container svg.recharts-surface').should('be.visible');

    // 4. Verifikasi Sumbu X (xAxis) — Tanggal Progress
    cy.get('g.recharts-xAxis').should('exist').within(() => {
      cy.get('.recharts-cartesian-axis-tick-value').should('exist');
    });

    // 5. Verifikasi Sumbu Y (yAxis) — Persentase Pencapaian (%) (0, 25, 50, 75, 100)
    cy.get('g.recharts-yAxis').should('exist').within(() => {
      cy.contains('tspan', '0').should('be.visible');
      cy.contains('tspan', '25').should('be.visible');
      cy.contains('tspan', '50').should('be.visible');
      cy.contains('tspan', '75').should('be.visible');
      cy.contains('tspan', '100').should('be.visible');
    });

    // 6. Verifikasi Keterangan Legend Grafik
    cy.contains('.recharts-legend-item-text', 'Diurutkan Berdasarkan Tanggal').should('be.visible');
  });
});
