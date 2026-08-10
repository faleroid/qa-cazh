import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.22 - Behavior Saat Belum Ada Transaksi Bulan Ini', () => {
  beforeEach(() => {
    cy.login();
  });

  it.skip('DSH-1.22: Cek behavior saat belum ada transaksi bulan ini', () => {
    // Skipped: Akun live saat ini memiliki transaksi aktif bulan berjalan di database backend.
    DashboardPage.visitDashboard();
  });
});
