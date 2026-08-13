import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.11 - Reset Filter Instansi Ke Semua Lembaga', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.11: Ganti filter Instansi ke "Semua Lembaga / Seluruh"', () => {
    cy.wait(1000);
    // 1. Select specific instansi first (Sekolah Digital Indonesia)
    DashboardPage.selectOverdueInstansiFilter('Sekolah Digital Indonesia');
    cy.wait(1000);

    // 2. Switch back to Semua Lembaga
    DashboardPage.selectOverdueInstansiFilter('Semua Lembaga');
    cy.wait(1000);
  });
});
