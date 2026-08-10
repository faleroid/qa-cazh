import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.13 - Default Data Grafik Pembayaran Tagihan (SVG, X-Axis & Y-Axis)', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.13: Cek data grafik pembayaran default (verifikasi SVG Area Surface, X-Axis Periode Waktu, Y-Axis Nominal, Curve & Footer)', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentChartDefaultData();
    cy.wait(1000);
  });
});
