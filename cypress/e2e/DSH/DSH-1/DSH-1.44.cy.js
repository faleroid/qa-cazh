import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.44 - Klik CTA Primary "Ganti PIN Sekarang" di Popup Modal', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.44: Klik CTA Primary "Ganti PIN Sekarang" di popup -> Redirect ke halaman profil tab PIN (https://v3.cazh.id/profile?tab=pin)', () => {
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupPrimaryCta();
  });
});
