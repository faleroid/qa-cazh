import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.4 - Value Metric Cards Tagihan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.4: Cek value di metric card Tagihan Terbayar & Tagihan Aktif', () => {
    cy.wait(1000);
    DashboardPage.verifyBillsMetricValuesFormat();
    cy.wait(1000);
  });
});
