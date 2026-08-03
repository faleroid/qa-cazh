import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.35 - Persistent Banner Behavior', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.35: Cek behavior persistent banner (tidak ada X button)', () => {
    cy.intercept('GET', '**/api/v3/auth/me*', (req) => {
      req.continue((res) => {
        if (res.body && res.body.data) res.body.data.is_pin_weak = true;
      });
    });
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBanner().should('be.visible');
    DashboardPage.elements.weakPinBanner().find('button:has(svg.lucide-x), [data-slot="close"]').should('not.exist');
  });
});
