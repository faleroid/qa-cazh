import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.48 - Skenario SSO Google Login Pertama Kali', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.48: Skenario SSO Google login pertama kali (user belum pernah set PIN)', () => {
    // Skipped: Memerlukan penanganan khusus sesi SSO Google pertama kali.
    DashboardPage.visitDashboard();
  });
});
