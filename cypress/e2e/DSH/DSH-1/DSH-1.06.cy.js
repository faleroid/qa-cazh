import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.6 - Title Section Diagram Tunggakan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.6: Cek title section Diagram Jumlah Tunggakan', () => {
    DashboardPage.verifyOverdueSectionTitle();
  });
});
