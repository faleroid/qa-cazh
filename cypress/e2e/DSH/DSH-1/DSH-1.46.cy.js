import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.46 - Setelah Klik "Nanti Saja" → Session Baru', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.46: Setelah klik "Nanti Saja" → logout → login lagi (session baru) → popup modal muncul kembali', () => {
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupSecondaryCta();
    cy.get('[role="dialog"]').should('not.exist');

    // Simulate new login session
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupTitle().should('be.visible');
  });
});
