import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.8 - Tampilan Diagram Batang Tunggakan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.8: Cek tampilan diagram batang di section Tunggakan (X-axis Tipe Tagihan, Y-axis Jumlah Tunggakan)', () => {
    cy.wait(1000);
    DashboardPage.verifyOverdueBarChartVisible();
    cy.wait(1000);
  });
});
