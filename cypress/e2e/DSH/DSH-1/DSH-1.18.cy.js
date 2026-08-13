import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.18 - Data Grafik Pembayaran Mengikuti Metode Pembayaran', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.18: Cek data grafik pembayaran mengikuti Metode Pembayaran (verifikasi elemen batang <path class="recharts-rectangle">)', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentChartMethodBars();
    cy.wait(1000);
  });
});
