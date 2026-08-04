import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.2 - Label Metric Cards', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.2: Cek label 7 metric cards di section Ringkasan Keuangan dan Anggota', () => {
    cy.wait(1000);
    DashboardPage.verifyMetricCardLabels();
    cy.wait(1000);
  });
});
