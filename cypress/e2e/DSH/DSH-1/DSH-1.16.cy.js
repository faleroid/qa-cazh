import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.16 - Filter Periode Tahunan Grafik Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.16: Pilih filter periode "Tahunan / Annual" di Grafik Pembayaran', () => {
    DashboardPage.selectPaymentChartPeriod('Tahunan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Tahunan');
  });
});
