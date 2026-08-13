import DashboardPage from '../../../pages/DashboardPage';
import testData from '../../../fixtures/dashboardData.json';

describe('DSH-1.30 - Banner PIN Lemah Saat Login Akun PIN Lemah', () => {
  beforeEach(() => {
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
  });

  it('DSH-1.30: Login pakai akun user dengan PIN masuk kategori LEMAH (cazhv3@pgl.my.id) → tutup popup modal dulu → lalu cek banner alert di atas', () => {
    DashboardPage.visitDashboard();

    // 1. Tutup popup modal PIN Lemah yang muncul otomatis setelah login
    DashboardPage.dismissWeakPinPopupIfPresent();

    // 2. Verifikasi Banner Alert PIN Lemah di bagian atas halaman
    DashboardPage.elements.weakPinBanner().should('be.visible');
    DashboardPage.elements.weakPinBannerTitle().should('be.visible').and('contain.text', 'Perkuat Keamanan PIN Anda');
    DashboardPage.elements.weakPinBannerDesc().should('be.visible').and('contain.text', 'Tingkatkan keamanan akun Anda dengan menggunakan PIN yang lebih kuat');
    DashboardPage.elements.weakPinBannerCta().should('be.visible').and('contain.text', 'Ganti PIN');
    DashboardPage.elements.weakPinBannerIcon().should('exist');
  });
});
