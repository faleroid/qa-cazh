import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.1 - Load Halaman Dashboard', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.1: Load halaman Dashboard setelah login', () => {
    cy.url().should('include', '/dashboard');
    cy.wait(1000);
    DashboardPage.verify7MetricCardsPresent();
    cy.wait(1000);
  });
});
