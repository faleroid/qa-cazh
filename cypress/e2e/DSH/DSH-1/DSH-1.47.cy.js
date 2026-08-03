import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.47 - User Berhasil Ganti PIN Ke Kategori Kuat', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.47: User berhasil ganti PIN ke kategori KUAT → logout → login lagi', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
    DashboardPage.visitDashboard();
  });
});
