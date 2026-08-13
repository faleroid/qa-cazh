import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.5 - Value Metric Cards Anggota', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.5: Cek value di metric card Siswa & Guru (anggota)', () => {
    cy.wait(1000);
    DashboardPage.verifyMembersMetricValuesFormat();
    cy.wait(1000);
  });
});
