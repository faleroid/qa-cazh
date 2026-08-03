import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.9 - Default Filter Instansi Tunggakan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.9: Cek default filter Instansi di section Tunggakan (Default: Semua Lembaga)', () => {
    cy.wait(1000);
    DashboardPage.verifyDefaultInstansiFilterIsAll();
    cy.wait(1000);
  });
});
