import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.15 - Filter Periode Bulanan Grafik Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.15: Pilih filter periode "Bulanan / Monthly" di Grafik Pembayaran', () => {
    DashboardPage.selectPaymentChartPeriod('Bulanan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Bulanan');
  });
});
