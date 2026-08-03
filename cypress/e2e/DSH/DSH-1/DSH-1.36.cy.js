import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.36 - Klik CTA "Ganti PIN" di Banner', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.36: Klik CTA "Ganti PIN" di banner -> Redirect ke halaman profil tab PIN (https://v3.cazh.id/profile?tab=pin)', () => {
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.clickBannerChangePin();
  });
});
