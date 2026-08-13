import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.25 - Behavior Saat Belum Ada Pembayaran Bulan Ini', () => {
  beforeEach(() => {
    cy.login();
  });

  it('DSH-1.25: Cek behavior saat belum ada transaksi bulan ini pada Metode Pembayaran → tampil 0 Metode pembayaran pada bulan ini', () => {
    // Intercept API response sebelum visit dashboard untuk menyimulasikan 0 metode pembayaran
    cy.intercept('GET', '**/api/v3/**', (req) => {
      if (req.url.includes('payment') || req.url.includes('dashboard')) {
        req.continue((res) => {
          if (res.body) {
            if (Array.isArray(res.body.data)) res.body.data = [];
            if (res.body.data && Array.isArray(res.body.data.payment_methods)) res.body.data.payment_methods = [];
          }
        });
      }
    }).as('getEmptyPaymentMethods');

    DashboardPage.visitDashboard();
    DashboardPage.elements.paymentMethodsDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /0\s+(Metode|Payment)/i);
  });
});
