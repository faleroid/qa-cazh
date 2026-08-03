import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.40 - Popup PIN Lemah Session Baru', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.40: Login pakai akun user dengan PIN lemah → cek session baru', () => {
    cy.intercept('GET', '**/api/v3/auth/me*', (req) => {
      req.continue((res) => {
        if (res.body && res.body.data) res.body.data.is_pin_weak = true;
      });
    });
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopup().should('be.visible');
  });
});
