import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.49 - Cek Tone Copy Popup & Banner', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.49: Cek tone copy popup & banner (verify wording)', () => {
    // Skipped sesuai permintaan pengguna.
    DashboardPage.visitDashboard();
  });
});
