import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.3 - Value Metric Cards Keuangan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.3: Cek value di metric card Saldo Tunai, Saldo Cazhbox, Saldo Tabungan (finance)', () => {
    cy.wait(1000);
    DashboardPage.verifyFinanceMetricValuesFormat();
    cy.wait(1000);
  });
});
