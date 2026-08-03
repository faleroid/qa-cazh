import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.12 - Title Section Grafik Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.12: Cek title section Grafik Pembayaran', () => {
    DashboardPage.verifyPaymentChartTitle();
  });
});
