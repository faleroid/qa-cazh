import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.32 - Deskripsi Banner PIN Lemah', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.32: Cek deskripsi banner PIN Lemah', () => {
    cy.intercept('GET', '**/api/v3/auth/me*', (req) => {
      req.continue((res) => {
        if (res.body && res.body.data) res.body.data.is_pin_weak = true;
      });
    });
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBannerDesc().should('be.visible');
  });
});
