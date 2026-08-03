import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.14 - Filter Periode Mingguan Grafik Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.14: Pilih filter periode "Mingguan / Weekly" di Grafik Pembayaran', () => {
    DashboardPage.selectPaymentChartPeriod('Mingguan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Mingguan');
  });
});
