import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.41 - Title Popup PIN Lemah', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.41: Cek title popup PIN Lemah', () => {
    cy.intercept('GET', '**/api/v3/auth/me*', (req) => {
      req.continue((res) => {
        if (res.body && res.body.data) res.body.data.is_pin_weak = true;
      });
    });
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupTitle().should('be.visible');
  });
});
