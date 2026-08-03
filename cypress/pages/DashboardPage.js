import testData from '../fixtures/dashboardData.json';

class DashboardPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Exact match for V3 CAZH Dashboard DOM)
  // ---------------------------------------------------------------------------
  elements = {
    // Page Header
    pageTitle: () => cy.contains('h1', /dashboard/i, { timeout: 15000 }),
    pageSubtitle: () => cy.contains('p', /ringkasan data dan informasi/i, { timeout: 15000 }),
    
    // Metric Cards (Ringkasan Keuangan dan Anggota)
    metricCards: () => cy.get('[data-slot="card"]', { timeout: 15000 }),
    metricCardByName: (name) => cy.contains('[data-slot="card"]', new RegExp(`^${name}$|${name}`, 'i'), { timeout: 15000 }),
    
    // Section Grafik Tunggakan (Overdue Bills Chart)
    overdueCard: () => cy.get('[data-slot="card"]:contains("Tunggakan")', { timeout: 15000 }),
    overdueSectionTitle: () => cy.contains('[data-slot="card-title"]', /grafik tunggakan|tunggakan|overdue bills/i, { timeout: 15000 }),
    overdueSectionDesc: () => cy.contains('[data-slot="card-description"], p, div', /(total|jumlah) tunggakan.*sampai|overdue bills/i, { timeout: 15000 }),
    overdueChartCanvas: () => cy.get('[data-slot="card"]:contains("Tunggakan") svg.recharts-surface, [data-slot="card"]:contains("Tunggakan") canvas', { timeout: 15000 }),
    overdueXAxis: () => cy.get('[data-slot="card"]:contains("Tunggakan") g.recharts-xAxis, [data-slot="card"]:contains("Tunggakan") g.xAxis', { timeout: 15000 }),
    overdueYAxis: () => cy.get('[data-slot="card"]:contains("Tunggakan") g.recharts-yAxis, [data-slot="card"]:contains("Tunggakan") g.yAxis', { timeout: 15000 }),
    overdueBarRectangles: () => cy.get('[data-slot="card"]:contains("Tunggakan") g.recharts-bar-rectangle, [data-slot="card"]:contains("Tunggakan") path.recharts-rectangle', { timeout: 15000 }),
    
    // Dropdown Filter Instansi / Lembaga di Grafik Tunggakan (Radix Dropdown Menu)
    overdueDropdownTrigger: () => cy.get('[data-slot="card"]:contains("Tunggakan") button[data-slot="dropdown-menu-trigger"]', { timeout: 15000 }),
    overdueDropdownContent: () => cy.get('[data-slot="dropdown-menu-content"]', { timeout: 15000 }),
    overdueDropdownOption: (name) => cy.contains('[data-slot="dropdown-menu-content"] [role="menuitemcheckbox"], [data-slot="dropdown-menu-content"] [role="menuitem"]', new RegExp(name, 'i'), { timeout: 15000 }),
    overdueFooterLabel: () => cy.get('[data-slot="card"]:contains("Tunggakan") h4, [data-slot="card"]:contains("Tunggakan") div.text-center', { timeout: 15000 }),

    // Section Grafik Pembayaran Tagihan (Area Chart)
    paymentBillChartTitle: () => cy.contains('[data-slot="card-title"]', /grafik pembayaran tagihan|grafik pembayaran|payment chart/i, { timeout: 15000 }),
    paymentBillChartDesc: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") p.text-xs, [data-slot="card"]:contains("Grafik Pembayaran") p.text-xs', { timeout: 15000 }).filter(':contains("Total pembayaran")'),
    paymentBillChartPeriodDropdown: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") [role="combobox"], [data-slot="card"]:contains("Grafik Pembayaran Tagihan") [data-slot="select-trigger"], [data-slot="card"]:contains("Grafik Pembayaran") [role="combobox"]', { timeout: 15000 }),
    paymentBillChartCanvas: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") svg.recharts-surface, [data-slot="card"]:contains("Grafik Pembayaran") svg.recharts-surface', { timeout: 15000 }),
    paymentBillChartXAxis: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") g.recharts-xAxis, [data-slot="card"]:contains("Grafik Pembayaran Tagihan") g.xAxis', { timeout: 15000 }),
    paymentBillChartYAxis: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") g.recharts-yAxis, [data-slot="card"]:contains("Grafik Pembayaran Tagihan") g.yAxis', { timeout: 15000 }),
    paymentBillChartAreaCurve: () => cy.get('[data-slot="card"]:contains("Grafik Pembayaran Tagihan") g.recharts-area, [data-slot="card"]:contains("Grafik Pembayaran Tagihan") path.recharts-area-curve', { timeout: 15000 }),

    // Section Grafik Metode Pembayaran (Bar Chart per Metode)
    paymentMethodChartTitle: () => cy.contains('[data-slot="card-title"]', /grafik metode pembayaran/i, { timeout: 15000 }),
    paymentMethodChartCanvas: () => cy.get('[data-slot="card"]:contains("Grafik Metode Pembayaran") svg.recharts-surface', { timeout: 15000 }),
    paymentMethodChartXAxis: () => cy.get('[data-slot="card"]:contains("Grafik Metode Pembayaran") g.recharts-xAxis', { timeout: 15000 }),
    paymentMethodChartYAxis: () => cy.get('[data-slot="card"]:contains("Grafik Metode Pembayaran") g.recharts-yAxis', { timeout: 15000 }),
    paymentMethodChartBars: () => cy.get('[data-slot="card"]:contains("Grafik Metode Pembayaran") path.recharts-rectangle', { timeout: 15000 }),
    paymentMethodChartFooter: () => cy.get('[data-slot="card"]:contains("Grafik Metode Pembayaran") p:contains("per metode")', { timeout: 15000 }),

    // Section Transaksi Terakhir (Recent Transactions Timeline)
    recentTransactionsCard: () => cy.get('[data-slot="card"]:contains("Transaksi Terakhir")', { timeout: 15000 }),
    recentTransactionsTitle: () => cy.contains('[data-slot="card-title"]', /transaksi terakhir|recent transactions/i, { timeout: 15000 }),
    recentTransactionsDesc: () => cy.contains('[data-slot="card-description"], p, div', /transaksi bulan ini|transactions this month/i, { timeout: 15000 }),
    recentTransactionsRows: () => cy.get('[data-slot="card"]:contains("Transaksi Terakhir") [data-radix-scroll-area-viewport] div.border-s', { timeout: 10000 }),
    recentTransactionsMoreLink: () => cy.contains('[data-slot="card"]:contains("Transaksi Terakhir") a', /lihat semua|selengkapnya|view more|see all/i, { timeout: 15000 }),
    recentTransactionsEmptyState: () => cy.contains('[data-slot="card"]:contains("Transaksi Terakhir")', /belum ada transaksi|0 transaksi|tidak ada transaksi/i, { timeout: 15000 }),

    // Section Metode Pembayaran List (Payment Methods Rows)
    paymentMethodsCard: () => cy.get('[data-slot="card"]:contains("Metode Pembayaran")', { timeout: 15000 }),
    paymentMethodsTitle: () => cy.contains('[data-slot="card-title"]', /metode pembayaran|payment methods/i, { timeout: 15000 }),
    paymentMethodsDesc: () => cy.contains('[data-slot="card-description"], p, div', /metode pembayaran pada bulan ini|payment methods this month/i, { timeout: 15000 }),
    paymentMethodsRows: () => cy.get('[data-slot="card"]:contains("Metode Pembayaran") [data-radix-scroll-area-viewport] div.flex-row', { timeout: 10000 }),
    paymentMethodsEmptyState: () => cy.contains('[data-slot="card"]:contains("Metode Pembayaran")', /belum ada pembayaran|0 metode|tidak ada data/i, { timeout: 15000 }),

    // Section Data Lembaga (Institution Data)
    institutionDataCard: () => cy.get('[data-slot="card"]:contains("Data Lembaga")', { timeout: 15000 }),
    institutionDataTitle: () => cy.contains('[data-slot="card-title"]', /data lembaga|institution data/i, { timeout: 15000 }),
    institutionDataDesc: () => cy.contains('[data-slot="card-description"], p, div', /lembaga terdaftar|registered institutions/i, { timeout: 15000 }),
    institutionDataRows: () => cy.get('[data-slot="card"]:contains("Data Lembaga") a[href*="/setting/institution"]', { timeout: 10000 }),

    // Weak PIN Banner (Persistent top banner alert)
    weakPinBanner: () => cy.get('div[data-slot="alert"][role="alert"]', { timeout: 15000 }).filter(':contains("Perkuat Keamanan PIN Anda")'),
    weakPinBannerTitle: () => cy.get('div[data-slot="alert"] [data-slot="alert-title"]', { timeout: 15000 }).filter(':contains("Perkuat Keamanan PIN Anda")'),
    weakPinBannerDesc: () => cy.get('div[data-slot="alert"] [data-slot="alert-description"]', { timeout: 15000 }).filter(':contains("Tingkatkan keamanan akun Anda dengan menggunakan PIN yang lebih kuat")'),
    weakPinBannerCta: () => cy.get('div[data-slot="alert"] button[data-slot="button"]', { timeout: 15000 }).filter(':contains("Ganti PIN")'),
    weakPinBannerIcon: () => cy.get('div[data-slot="alert"] svg.lucide-shield-alert, div[data-slot="alert"] [data-slot="alert-icon"]', { timeout: 15000 }),

    // Weak PIN Popup Dialog (Radix modal popup on login)
    weakPinPopup: () => cy.get('[role="dialog"]', { timeout: 15000 }),
    weakPinPopupTitle: () => cy.get('[role="dialog"] [data-slot="dialog-title"]', { timeout: 15000 }).contains('Perkuat Keamanan PIN Anda'),
    weakPinPopupDesc: () => cy.get('[role="dialog"] [data-slot="dialog-description"]', { timeout: 15000 }).contains('Demi keamanan akun'),
    weakPinPopupPrimaryCta: () => cy.contains('[role="dialog"] button', 'Ganti PIN Sekarang', { timeout: 15000 }),
    weakPinPopupSecondaryCta: () => cy.contains('[role="dialog"] button', 'Nanti Saja', { timeout: 15000 }),
    weakPinPopupCloseBtn: () => cy.get('[role="dialog"] button[data-slot="dialog-close"]', { timeout: 15000 }),

    // Change PIN Form Elements (Profile Page tab PIN)
    oldPinInput: () => cy.get('input[name="old_pin"]', { timeout: 15000 }),
    checkOldPinBtn: () => cy.contains('button', /cek/i, { timeout: 15000 }),
    newPinInput: () => cy.get('input[name="pin"]', { timeout: 15000 }),
    confirmNewPinInput: () => cy.get('input[name="confirm_pin"]', { timeout: 15000 }),
    submitChangePinBtn: () => cy.get('button[type="submit"]', { timeout: 15000 }).filter(':contains("Ganti PIN")')
  };

  // ---------------------------------------------------------------------------
  // HELPER METHODS
  // ---------------------------------------------------------------------------
  getCurrentMonthYearFormatted() {
    const monthsID = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const now = new Date();
    const currentMonth = monthsID[now.getMonth()];
    const currentYear = now.getFullYear();
    return { currentMonth, currentYear, monthYearString: `${currentMonth} ${currentYear}` };
  }

  visitDashboard() {
    cy.visit(testData.urls.dashboardPage, { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.scrollTo('top');
    cy.wait(1200);

    // Session recovery if unauthenticated or error page
    cy.get('body').then(($body) => {
      if ($body.text().includes('Peran Belum Ditetapkan') || $body.text().includes('Hubungi admin') || $body.find('input[type="email"]').length > 0) {
        cy.log('Memulihkan sesi login...');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        cy.visit(testData.urls.dashboardPage, { failOnStatusCode: false, timeout: 30000 });
        cy.get('body', { timeout: 15000 }).should('be.visible');
        cy.scrollTo('top');
        cy.wait(1200);
      }
    });
  }

  dismissWeakPinPopupIfPresent() {
    cy.wait(800);
    cy.get('body').then(($body) => {
      const popup = $body.find('[role="dialog"]:contains("Perkuat Keamanan PIN Anda"), [role="dialog"]:contains("Nanti Saja")');
      if (popup.length > 0) {
        cy.log('Tutup Popup Modal PIN Lemah (klik Nanti Saja)...');
        cy.wrap(popup).within(() => {
          cy.contains('button', /nanti saja|later/i).click({ force: true });
        });
        cy.wait(1000);
      }
    });
  }

  changePin(oldPin = '123456', newPin = '839201') {
    cy.wait(1000);
    // 1. Fill PIN Lama & click Cek
    this.elements.oldPinInput().should('be.visible').clear().type(oldPin);
    cy.wait(500);
    this.elements.checkOldPinBtn().should('be.visible').click({ force: true });
    cy.wait(1200);

    // 2. Fill PIN Baru & Konfirmasi PIN Baru
    this.elements.newPinInput().should('not.be.disabled').clear().type(newPin);
    this.elements.confirmNewPinInput().should('not.be.disabled').clear().type(newPin);
    cy.wait(500);

    // 3. Submit Ganti PIN
    this.elements.submitChangePinBtn().should('not.be.disabled').click({ force: true });
    cy.wait(1500);
  }

  // ---------------------------------------------------------------------------
  // BUSINESS ACTIONS & ASSERTIONS
  // ---------------------------------------------------------------------------

  // Metric Cards Assertions
  verify7MetricCardsPresent() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(500);
    testData.metricCards.forEach((label) => {
      this.elements.metricCardByName(label).should('be.visible');
      cy.wait(300);
    });
    cy.wait(1000);
  }

  verifyMetricCardLabels() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(500);
    testData.metricCards.forEach((labelID, index) => {
      const labelEN = testData.metricCardsEN[index];
      const regexPattern = new RegExp(`${labelID}|${labelEN}`, 'i');
      cy.contains('[data-slot="card"]', regexPattern, { timeout: 15000 }).should('be.visible');
      cy.wait(300);
    });
    cy.wait(1000);
  }

  verifyFinanceMetricValuesFormat() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(500);
    ['Saldo Tunai', 'Saldo Cazhbox', 'Saldo Tabungan'].forEach((metricName) => {
      this.elements.metricCardByName(metricName)
        .should('be.visible')
        .invoke('text')
        .should('match', /Rp\s*[\d.,]+[A-Za-z]*/i);
      cy.wait(400);
    });
    cy.wait(1000);
  }

  verifyBillsMetricValuesFormat() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(500);
    ['Tagihan Terbayar', 'Tagihan Aktif'].forEach((metricName) => {
      this.elements.metricCardByName(metricName)
        .should('be.visible')
        .invoke('text')
        .should('match', /(Rp\s*[\d.,]+[A-Za-z]*|\d+)/i);
      cy.wait(400);
    });
    cy.wait(1000);
  }

  verifyMembersMetricValuesFormat() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(500);
    ['Siswa', 'Guru'].forEach((metricName) => {
      this.elements.metricCardByName(metricName)
        .should('be.visible')
        .invoke('text')
        .should('match', /\d+/);
      cy.wait(400);
    });
    cy.wait(1000);
  }

  // Section Tunggakan (Overdue Bills)
  verifyOverdueSectionTitle() {
    cy.wait(1000);
    cy.scrollTo('top');
    this.elements.overdueSectionTitle().should('be.visible');
    cy.wait(1000);
  }

  verifyOverdueSectionDescriptionDynamic() {
    cy.wait(1000);
    const { currentMonth, currentYear } = this.getCurrentMonthYearFormatted();
    cy.scrollTo('top');
    this.elements.overdueSectionDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', new RegExp(`(sampai|until).*(${currentMonth}|${currentYear})`, 'i'));
    cy.wait(1000);
  }

  verifyOverdueBarChartVisible() {
    cy.wait(1000);
    cy.scrollTo('top');
    this.elements.overdueChartCanvas().should('be.visible');
    this.elements.overdueXAxis().should('exist').and('be.visible');
    this.elements.overdueYAxis().should('exist').and('be.visible');
    this.elements.overdueBarRectangles().should('exist');
    cy.wait(1000);
  }

  verifyDefaultInstansiFilterIsAll() {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(600);

    // Click Radix dropdown trigger
    this.elements.overdueDropdownTrigger()
      .should('be.visible')
      .click({ force: true });
    cy.wait(1000);

    // Verify option "Semua Lembaga" is checked
    this.elements.overdueDropdownOption('Semua Lembaga')
      .should('be.visible')
      .and('have.attr', 'aria-checked', 'true');
    cy.wait(1000);

    // Close menu by ESC
    cy.get('body').type('{esc}');
    cy.wait(800);

    // Verify footer label without scrolling
    this.elements.overdueFooterLabel()
      .should('be.visible')
      .and('contain.text', 'Semua Lembaga');
    cy.wait(1000);
  }

  selectOverdueInstansiFilter(instansiName = 'Sekolah Digital Indonesia') {
    cy.wait(1000);
    cy.scrollTo('top');
    cy.wait(600);

    // Click Radix dropdown trigger (ellipsis button)
    this.elements.overdueDropdownTrigger()
      .should('be.visible')
      .click({ force: true });
    cy.wait(1000);

    // Click target instansi option from Radix overlay
    this.elements.overdueDropdownOption(instansiName)
      .should('be.visible')
      .click({ force: true });
    cy.wait(1500);

    // Verify chart updates and footer label reflects selected instansi
    this.elements.overdueFooterLabel()
      .should('be.visible')
      .and('contain.text', instansiName);
    cy.wait(1000);
  }

  // Section Grafik Pembayaran Tagihan & Grafik Metode Pembayaran
  verifyPaymentChartTitle() {
    cy.wait(1000);
    this.elements.paymentBillChartTitle().should('be.visible');
    cy.wait(1000);
  }

  verifyPaymentChartDefaultData() {
    cy.wait(1000);
    // DSH-1.13: Explicitly verify Grafik Pembayaran Tagihan (Title, SVG, X-Axis Periode Waktu, Y-Axis Nominal, Area Curve & Footer)
    this.elements.paymentBillChartTitle().should('be.visible');
    this.elements.paymentBillChartCanvas().should('be.visible');
    this.elements.paymentBillChartXAxis().should('exist').and('be.visible');
    this.elements.paymentBillChartYAxis().should('exist').and('be.visible');
    this.elements.paymentBillChartAreaCurve().should('exist');
    this.elements.paymentBillChartDesc().should('be.visible');
    cy.wait(1000);
  }

  selectPaymentChartPeriod(periodName) {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      const dropdown = $body.find('[data-slot="card"]:contains("Grafik Pembayaran") [role="combobox"], [data-slot="card"]:contains("Grafik Pembayaran") [data-slot="select-trigger"]');
      if (dropdown.length > 0) {
        cy.wrap(dropdown).first().should('be.visible').click({ force: true });
        cy.wait(1000);
        cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
          .contains(new RegExp(periodName, 'i'))
          .should('be.visible')
          .click({ force: true });
      }
    });
    cy.wait(1500);
  }

  verifyPaymentChartDescriptionDynamic(periodType) {
    cy.wait(1000);
    this.elements.paymentBillChartDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', new RegExp(`Total pembayaran ${periodType} dari .+ hingga .+`, 'i'));
    cy.wait(1000);
  }

  verifyPaymentChartMethodBars() {
    cy.wait(1000);
    // DSH-1.18: Explicitly verify Bar Rectangles (path.recharts-rectangle) di Grafik Metode Pembayaran
    this.elements.paymentMethodChartTitle().should('be.visible');
    this.elements.paymentMethodChartCanvas().should('be.visible');
    this.elements.paymentMethodChartXAxis().should('exist').and('be.visible');
    this.elements.paymentMethodChartYAxis().should('exist').and('be.visible');
    this.elements.paymentMethodChartBars().should('exist').and('have.class', 'recharts-rectangle');
    cy.wait(1000);
  }

  // Section Transaksi Terakhir (Recent Transactions)
  verifyRecentTransactionsTitleAndDesc() {
    cy.wait(1000);
    this.elements.recentTransactionsTitle().should('be.visible');
    cy.wait(600);
    this.elements.recentTransactionsDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /\d+\s+(Transaksi|Transactions)\s+bulan\s+ini/i);
    cy.wait(1000);
  }

  verifyRecentTransactionsRowInfo() {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      const emptyState = $body.find('[data-slot="card"]:contains("Transaksi Terakhir"):contains("Belum ada transaksi")');
      if (emptyState.length > 0) {
        cy.wrap(emptyState).should('be.visible');
      } else {
        this.elements.recentTransactionsRows().first().should('exist');
        this.elements.recentTransactionsRows().first().within(() => {
          cy.get('h5, span, p').should('exist');
        });
      }
    });
    cy.wait(1000);
  }

  clickRecentTransactionsMoreLink() {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      const moreLink = $body.find('[data-slot="card"]:contains("Transaksi Terakhir") a:contains("Lihat Semua"), [data-slot="card"]:contains("Transaksi Terakhir") a:contains("Selengkapnya")');
      if (moreLink.length > 0) {
        cy.wrap(moreLink).click({ force: true });
        cy.wait(1500);
        cy.url().should('match', /\/(administration\/billing\/payment-report|administration\/bill\/payment-report)/);
      } else {
        cy.log('Link Lihat Semua / Selengkapnya tidak tampil pada empty state');
      }
    });
    cy.wait(1000);
  }

  // Section Metode Pembayaran (Payment Methods)
  verifyPaymentMethodsTitleAndDesc() {
    cy.wait(1000);
    this.elements.paymentMethodsTitle().should('be.visible');
    cy.wait(600);
    this.elements.paymentMethodsDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /\d+\s+(Metode|Payment)/i);
    cy.wait(1000);
  }

  verifyPaymentMethodsRowColumns() {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      const emptyState = $body.find('[data-slot="card"]:contains("Metode Pembayaran"):contains("Belum ada pembayaran")');
      if (emptyState.length > 0) {
        cy.wrap(emptyState).should('be.visible');
      } else {
        this.elements.paymentMethodsRows().first().should('be.visible');
        this.elements.paymentMethodsRows().first().within(() => {
          cy.get('p').should('have.length.at.least', 3);
        });
      }
    });
    cy.wait(1000);
  }

  // Section Data Lembaga (Institution Data)
  verifyInstitutionDataTitleAndDesc() {
    cy.wait(1000);
    this.elements.institutionDataTitle().should('be.visible');
    cy.wait(600);
    this.elements.institutionDataDesc()
      .should('be.visible')
      .invoke('text')
      .should('match', /\d+\s+(Lembaga Terdaftar|Registered Institutions)/i);
    cy.wait(1000);
  }

  verifyInstitutionDataRowInfo() {
    cy.wait(1000);
    this.elements.institutionDataRows().should('be.visible').first().within(() => {
      cy.get('p, div, span').should('exist');
    });
    cy.wait(1000);
  }

  clickInstitutionDetailIcon(index = 0) {
    cy.wait(1000);
    this.elements.institutionDataRows().eq(index).should('be.visible').click({ force: true });
    cy.wait(1500);
    cy.url().should('include', testData.urls.institutionDetailPage);
    cy.wait(1000);
  }

  // Weak PIN Banner & Popup Methods
  clickBannerChangePin() {
    cy.wait(1000);
    this.elements.weakPinBannerCta().first().should('be.visible').click({ force: true });
    cy.wait(1500);
    cy.url().should('include', '/profile');
    cy.url().should('include', 'tab=pin');
    cy.contains('h1', /profil|profile/i).should('be.visible');
    cy.contains('[role="tab"][data-state="active"]', /pin/i).should('be.visible');
    cy.wait(1000);
  }

  clickPopupPrimaryCta() {
    cy.wait(1000);
    this.elements.weakPinPopupPrimaryCta().should('be.visible').click({ force: true });
    cy.wait(1500);
    cy.url().should('include', '/profile');
    cy.url().should('include', 'tab=pin');
    cy.contains('h1', /profil|profile/i).should('be.visible');
    cy.contains('[role="tab"][data-state="active"]', /pin/i).should('be.visible');
    cy.wait(1000);
  }

  clickPopupSecondaryCta() {
    cy.wait(1000);
    this.elements.weakPinPopupSecondaryCta().should('be.visible').click({ force: true });
    cy.wait(1200);
    cy.get('[role="dialog"]').should('not.exist');
    cy.wait(1000);
  }
}

export default new DashboardPage();
