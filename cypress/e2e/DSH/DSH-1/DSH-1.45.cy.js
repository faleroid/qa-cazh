import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.45 - Klik CTA Secondary "Nanti Saja" di Popup Modal', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.45: Klik CTA Secondary "Nanti Saja" di popup → popup modal tertutup', () => {
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupSecondaryCta();
    cy.get('[role="dialog"]').should('not.exist');
  });
});
