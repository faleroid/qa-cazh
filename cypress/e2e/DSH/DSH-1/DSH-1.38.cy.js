import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.38 - Login User Dengan PIN Kuat', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.38: Login user dengan PIN kuat (tidak lemah) → cek halaman dashboard (Banner PIN Lemah tidak tampil)', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
    DashboardPage.visitDashboard();
  });
});
