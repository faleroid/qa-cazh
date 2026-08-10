import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.19 - Title & Deskripsi Transaksi Terakhir', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.19: Cek title & deskripsi section Transaksi Terakhir', () => {
    DashboardPage.verifyRecentTransactionsTitleAndDesc();
  });
});
