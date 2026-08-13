import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.10 - Filter Instansi Spesifik Tunggakan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.10: Aktifkan filter Instansi spesifik (pilih Sekolah Digital Indonesia) di section Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.selectOverdueInstansiFilter('Sekolah Digital Indonesia');
    cy.wait(1000);
  });
});
