import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.37 - Setelah User Berhasil Ganti PIN Ke Kategori KUAT', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it.skip('DSH-1.37: Setelah user berhasil ganti PIN ke kategori KUAT (PIN Lama: 123456) → kembali ke dashboard → banner PIN Lemah hilang', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
    DashboardPage.visitDashboard();
  });
});
