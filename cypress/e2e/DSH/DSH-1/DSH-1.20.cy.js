import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.20 - Cek Informasi Setiap Row Di List Transaksi Terakhir', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.20: Cek informasi setiap row di list Transaksi Terakhir (Tanggal, No Invoice, Deskripsi Pembayaran)', () => {
    DashboardPage.verifyRecentTransactionsRowInfo();
  });
});
