import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.23 - Title & Deskripsi Metode Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.23: Cek title & deskripsi section Metode Pembayaran', () => {
    DashboardPage.verifyPaymentMethodsTitleAndDesc();
  });
});
