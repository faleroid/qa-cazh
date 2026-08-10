import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.21 - Klik Link "Lihat Semua" / "Selengkapnya" Di Section Transaksi Terakhir', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.21: Klik link "Lihat Semua" di section Transaksi Terakhir → redirect ke Laporan Pembayaran', () => {
    DashboardPage.clickRecentTransactionsMoreLink();
  });
});
