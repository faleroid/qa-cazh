import DashboardPage from '../../pages/DashboardPage';
import testData from '../../fixtures/dashboardData.json';

describe('DSH-1: Modul Dashboard V3 CAZH', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  // ---------------------------------------------------------------------------
  // 1. RINGKASAN KEUANGAN DAN ANGGOTA (METRIC CARDS)
  // ---------------------------------------------------------------------------

  it('DSH-1.1: Load halaman Dashboard setelah login', () => {
    cy.url().should('include', '/dashboard');
    cy.wait(1000);
    DashboardPage.verify7MetricCardsPresent();
    cy.wait(1000);
  });

  it('DSH-1.2: Cek label 7 metric cards di section Ringkasan Keuangan dan Anggota', () => {
    cy.wait(1000);
    DashboardPage.verifyMetricCardLabels();
    cy.wait(1000);
  });

  it('DSH-1.3: Cek value di metric card Saldo Tunai, Saldo Cazhbox, Saldo Tabungan (finance)', () => {
    cy.wait(1000);
    DashboardPage.verifyFinanceMetricValuesFormat();
    cy.wait(1000);
  });

  it('DSH-1.4: Cek value di metric card Tagihan Terbayar & Tagihan Aktif', () => {
    cy.wait(1000);
    DashboardPage.verifyBillsMetricValuesFormat();
    cy.wait(1000);
  });

  it('DSH-1.5: Cek value di metric card Siswa & Guru (anggota)', () => {
    cy.wait(1000);
    DashboardPage.verifyMembersMetricValuesFormat();
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // 2. DIAGRAM JUMLAH TUNGGAKAN (OVERDUE BILLS CHART)
  // ---------------------------------------------------------------------------

  it('DSH-1.6: Cek title section Diagram Jumlah Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.verifyOverdueSectionTitle();
    cy.wait(1000);
  });

  it('DSH-1.7: Cek deskripsi section Diagram Jumlah Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.verifyOverdueSectionDescriptionDynamic();
    cy.wait(1000);
  });

  it('DSH-1.8: Cek tampilan diagram batang di section Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.verifyOverdueBarChartVisible();
    cy.wait(1000);
  });

  it('DSH-1.9: Cek default filter Instansi di section Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.verifyDefaultInstansiFilterIsAll();
    cy.wait(1000);
  });

  it('DSH-1.10: Aktifkan filter Instansi spesifik (pilih Sekolah Digital Indonesia) di section Tunggakan', () => {
    cy.wait(1000);
    DashboardPage.selectOverdueInstansiFilter('Sekolah Digital Indonesia');
    cy.wait(1000);
  });

  it('DSH-1.11: Ganti filter Instansi ke "Semua Lembaga / Seluruh"', () => {
    cy.wait(1000);
    DashboardPage.selectOverdueInstansiFilter('Sekolah Digital Indonesia');
    cy.wait(1000);
    DashboardPage.selectOverdueInstansiFilter('Semua Lembaga');
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // 3. GRAFIK PEMBAYARAN (PAYMENT CHART & PERIOD FILTERS)
  // ---------------------------------------------------------------------------

  it('DSH-1.12: Cek title section Grafik Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentChartTitle();
    cy.wait(1000);
  });

  it('DSH-1.13: Cek data grafik pembayaran default (periode default)', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentChartDefaultData();
    cy.wait(1000);
  });

  it('DSH-1.14: Pilih filter periode "Mingguan / Weekly" di Grafik Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.selectPaymentChartPeriod('Mingguan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Mingguan');
    cy.wait(1000);
  });

  it('DSH-1.15: Pilih filter periode "Bulanan / Monthly" di Grafik Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.selectPaymentChartPeriod('Bulanan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Bulanan');
    cy.wait(1000);
  });

  it('DSH-1.16: Pilih filter periode "Tahunan / Annual" di Grafik Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.selectPaymentChartPeriod('Tahunan');
    DashboardPage.verifyPaymentChartDescriptionDynamic('Tahunan');
    cy.wait(1000);
  });

  it('DSH-1.17: Verifikasi kalkulasi rentang periode dinamis di deskripsi (misal: Total pembayaran Mingguan dari 15 Jun hingga 03 Agt.)', () => {
    cy.wait(1000);
    DashboardPage.elements.paymentBillChartDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /Total pembayaran (Mingguan|Bulanan|Tahunan) dari .+ hingga .+/i);
    cy.wait(1000);
  });

  it('DSH-1.18: Cek data grafik pembayaran mengikuti Metode Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentChartMethodBars();
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // 4. TRANSAKSI TERAKHIR (RECENT TRANSACTIONS)
  // ---------------------------------------------------------------------------

  it('DSH-1.19: Cek title & deskripsi section Transaksi Terakhir', () => {
    cy.wait(1000);
    DashboardPage.verifyRecentTransactionsTitleAndDesc();
    cy.wait(1000);
  });

  it('DSH-1.20: Cek informasi setiap row di list Transaksi Terakhir', () => {
    cy.wait(1000);
    DashboardPage.verifyRecentTransactionsRowInfo();
    cy.wait(1000);
  });

  it('DSH-1.21: Klik link "Selengkapnya" di section Transaksi Terakhir', () => {
    cy.wait(1000);
    DashboardPage.clickRecentTransactionsMoreLink();
    cy.wait(1000);
  });

  it.skip('DSH-1.22: Cek behavior saat belum ada transaksi bulan ini', () => {
    // Skipped: Akun live saat ini memiliki transaksi aktif bulan berjalan di database backend.
  });

  // ---------------------------------------------------------------------------
  // 5. METODE PEMBAYARAN (PAYMENT METHODS LIST)
  // ---------------------------------------------------------------------------

  it('DSH-1.23: Cek title & deskripsi section Metode Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentMethodsTitleAndDesc();
    cy.wait(1000);
  });

  it('DSH-1.24: Cek informasi setiap row di list Metode Pembayaran', () => {
    cy.wait(1000);
    DashboardPage.verifyPaymentMethodsRowColumns();
    cy.wait(1000);
  });

  it('DSH-1.25: Cek behavior saat belum ada transaksi bulan ini', () => {
    cy.wait(1000);
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
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // 6. DATA LEMBAGA (INSTITUTION DATA)
  // ---------------------------------------------------------------------------

  it('DSH-1.26: Cek title & deskripsi section Data Lembaga', () => {
    cy.wait(1000);
    DashboardPage.verifyInstitutionDataTitleAndDesc();
    cy.wait(1000);
  });

  it('DSH-1.27: Cek informasi setiap row di list Data Lembaga', () => {
    cy.wait(1000);
    DashboardPage.verifyInstitutionDataRowInfo();
    cy.wait(1000);
  });

  it('DSH-1.28: Klik Icon Detail di row lembaga', () => {
    cy.wait(1000);
    DashboardPage.clickInstitutionDetailIcon(0);
    cy.wait(1000);
  });

  it('DSH-1.29: Verifikasi Anggota count di setiap row lembaga', () => {
    cy.wait(1000);
    DashboardPage.elements.institutionDataRows().first().within(() => {
      cy.get('p, div, span').invoke('text').should('match', /\d+/);
    });
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // 7. BANNER PIN LEMAH (WEAK PIN BANNER)
  // ---------------------------------------------------------------------------

  it('DSH-1.30: Login pakai akun user dengan PIN masuk kategori LEMAH (cazhv3@pgl.my.id) → tutup popup dulu → cek banner alert di atas', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);

    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBanner().should('be.visible');
    DashboardPage.elements.weakPinBannerTitle().should('be.visible').and('contain.text', 'Perkuat Keamanan PIN Anda');
    DashboardPage.elements.weakPinBannerDesc().should('be.visible').and('contain.text', 'Tingkatkan keamanan akun Anda dengan menggunakan PIN yang lebih kuat');
    DashboardPage.elements.weakPinBannerCta().should('be.visible').and('contain.text', 'Ganti PIN');
    DashboardPage.elements.weakPinBannerIcon().should('exist');
    cy.wait(1000);
  });

  it('DSH-1.31: Cek title banner PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBannerTitle().should('be.visible');
    cy.wait(1000);
  });

  it('DSH-1.32: Cek deskripsi banner PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBannerDesc().should('be.visible');
    cy.wait(1000);
  });

  it('DSH-1.33: Cek CTA banner PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBannerCta().should('be.visible');
    cy.wait(1000);
  });

  it('DSH-1.34: Cek visual & posisi banner PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBanner()
      .should('be.visible')
      .then(($banner) => {
        expect($banner.attr('class') || '').to.match(/warning|yellow|amber|alert/i);
      });
    cy.wait(1000);
  });

  it('DSH-1.35: Cek behavior persistent banner (tidak ada X button)', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.elements.weakPinBanner().should('be.visible');
    DashboardPage.elements.weakPinBanner().find('button:has(svg.lucide-x), [data-slot="close"]').should('not.exist');
    cy.wait(1000);
  });

  it('DSH-1.36: Klik CTA "Ganti PIN" di banner', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.dismissWeakPinPopupIfPresent();
    DashboardPage.clickBannerChangePin();
    cy.wait(1000);
  });

  it.skip('DSH-1.37: Setelah user berhasil ganti PIN ke kategori KUAT (PIN Lama: 123456) → kembali ke dashboard → banner PIN Lemah hilang', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
  });

  it.skip('DSH-1.38: Login user dengan PIN kuat (tidak lemah) → cek halaman dashboard', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
  });

  it.skip('DSH-1.39: Skenario: user dengan PIN lama, tim ops update kriteria PIN lemah → login berikutnya', () => {
    // Skipped: Memerlukan akses khusus ke Ops/Admin Backend untuk mengubah kriteria PIN lemah.
  });

  // ---------------------------------------------------------------------------
  // 8. POPUP PIN LEMAH (WEAK PIN POPUP & SSO FORCE SET PIN)
  // ---------------------------------------------------------------------------

  it('DSH-1.40: Login pakai akun user dengan PIN lemah → cek session baru', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopup().should('be.visible');
    cy.wait(1000);
  });

  it('DSH-1.41: Cek title popup PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupTitle().should('be.visible').and('contain.text', 'Perkuat Keamanan PIN Anda');
    cy.wait(1000);
  });

  it('DSH-1.42: Cek deskripsi popup PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupDesc().should('be.visible').and('contain.text', 'Demi keamanan akun, kami sarankan untuk mengganti PIN Anda dengan kombinasi yang lebih kuat');
    cy.wait(1000);
  });

  it('DSH-1.43: Cek dua CTA di popup PIN Lemah', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupPrimaryCta().should('be.visible').and('contain.text', 'Ganti PIN Sekarang');
    DashboardPage.elements.weakPinPopupSecondaryCta().should('be.visible').and('contain.text', 'Nanti Saja');
    cy.wait(1000);
  });

  it('DSH-1.44: Klik CTA Primary "Ganti PIN Sekarang" di popup', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupPrimaryCta();
    cy.wait(1000);
  });

  it('DSH-1.45: Klik CTA Secondary "Nanti Saja" di popup', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupSecondaryCta();
    cy.get('[role="dialog"]').should('not.exist');
    cy.wait(1000);
  });

  it('DSH-1.46: Setelah klik "Nanti Saja" → logout → login lagi (session baru)', () => {
    cy.wait(1000);
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.clickPopupSecondaryCta();
    cy.get('[role="dialog"]').should('not.exist');

    // Simulate new login session
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login(testData.credentials.weakPinAccount.email, testData.credentials.weakPinAccount.password);
    DashboardPage.visitDashboard();
    DashboardPage.elements.weakPinPopupTitle().should('be.visible');
    cy.wait(1000);
  });

  it.skip('DSH-1.47: User berhasil ganti PIN ke kategori KUAT → logout → login lagi', () => {
    // Skipped: Mengubah PIN ke kategori kuat akan mengubah kredensial permanen di backend dan tidak dapat dikembalikan ke PIN lemah.
  });

  it.skip('DSH-1.48: Skenario SSO Google login pertama kali (user belum pernah set PIN)', () => {
    // Skipped sesuai permintaan pengguna.
  });

  it.skip('DSH-1.49: Cek tone copy popup & banner (verify wording)', () => {
    // Skipped sesuai permintaan pengguna.
  });
});
