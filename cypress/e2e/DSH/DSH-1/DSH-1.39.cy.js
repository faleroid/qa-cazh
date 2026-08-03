import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.39 - Tim Ops Update Kriteria PIN Lemah', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.39: Skenario: user dengan PIN lama, tim ops update kriteria PIN lemah → login berikutnya', () => {
    // Skipped: Memerlukan akses khusus ke Ops/Admin Backend untuk mengubah kriteria PIN lemah.
    DashboardPage.visitDashboard();
  });
});
