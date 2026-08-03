import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.17 - Verifikasi Kalkulasi Rentang Periode Dinamis', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.17: Verifikasi kalkulasi rentang periode dinamis di deskripsi (misal: "Total pembayaran Mingguan dari 15 Jun hingga 03 Agt.")', () => {
    cy.wait(1000);
    // Verifikasi teks deskripsi mengandung format "Total pembayaran <Periode> dari <Tanggal/Bulan/Tahun> hingga <Tanggal/Bulan/Tahun>."
    DashboardPage.elements.paymentBillChartDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /Total pembayaran (Mingguan|Bulanan|Tahunan) dari .+ hingga .+/i);
    cy.wait(1000);
  });
});
