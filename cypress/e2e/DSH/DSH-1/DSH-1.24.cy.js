import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.24 - Cek Informasi Setiap Row Di List Metode Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.24: Cek informasi setiap row di list Metode Pembayaran (Metode, Total, Nominal)', () => {
    DashboardPage.verifyPaymentMethodsRowColumns();
  });
});
