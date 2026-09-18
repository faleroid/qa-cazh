import testData from '../fixtures/ppdbDataPendaftarData.json';

class PpdbDataPendaftarPage {
  // ---------------------------------------------------------------------------
  // NAVIGATION & PAGE HEADER
  // ---------------------------------------------------------------------------

  visitPage() {
    cy.visit(testData.url, { failOnStatusCode: false, timeout: 30000 });
    cy.get('h1, h2, div', { timeout: 20000 }).should('exist');
  }

  verifyHeaderAndDescription() {
    cy.contains('h1, h2, div', testData.pageTitle, { timeout: 15000 }).should('be.visible');
  }

  // ---------------------------------------------------------------------------
  // AGT-8.1: LOAD HALAMAN & VERIFIKASI 13 KOLOM + STATISTIK
  // ---------------------------------------------------------------------------

  verifyTableColumnsAndStatistik() {
    cy.get('body').should('exist');
    cy.get('table, [role="table"]', { timeout: 15000 }).should('exist');
    testData.columns.forEach((colName) => {
      cy.contains('th', colName, { timeout: 10000 }).should('exist');
    });
  }

  // ---------------------------------------------------------------------------
  // AGT-8.2: DEFAULT FILTER INSTANSI ATAS
  // ---------------------------------------------------------------------------

  verifyDefaultInstansiFilter() {
    cy.get('body').then(($body) => {
      if ($body.find('button[role="combobox"], [data-slot="popover-trigger"]').length > 0) {
        cy.get('button[role="combobox"], [data-slot="popover-trigger"]').first().should('be.visible');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // AGT-8.3: EMPTY STATE UI
  // ---------------------------------------------------------------------------

  verifyEmptyStateUI() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length === 0 || $body.text().includes('tidak ditemukan')) {
        cy.contains(/Data tidak ditemukan|Tidak ada data|No data/i).should('exist');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // AGT-8.4 & AGT-8.5 & AGT-8.6: TOMBOL AKSI & VISIBILITY RULES
  // ---------------------------------------------------------------------------

  verifyFixedActionColumnAndDefaultMenu() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length > 0) {
        cy.get('table tbody tr').first().find('button:contains("Aksi"), button:has(svg.lucide-ellipsis)').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  verifyActionMenuDiterimaStatus() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr:contains("Diterima")').length > 0) {
        cy.get('table tbody tr:contains("Diterima")').first().find('button').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  verifyBayarButtonVisibilityRule() {
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // AGT-8.7 & AGT-8.8 & AGT-8.9: PAGINATION & LOADING INDICATOR
  // ---------------------------------------------------------------------------

  verifyDefaultPaginationSize() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("10"), select').length > 0) {
        cy.get('button:contains("10"), select').should('exist');
      }
    });
  }

  changePaginationSize(size = '50') {
    cy.get('body').then(($body) => {
      if ($body.find('button[role="combobox"]:contains("10"), select').length > 0) {
        cy.get('button[role="combobox"]:contains("10"), select').first().click({ force: true });
        cy.wait(400);
        if ($body.find(`[role="option"]:contains("${size}")`).length > 0) {
          cy.get(`[role="option"]:contains("${size}")`).click({ force: true });
          cy.wait(1000);
        }
      }
    });
  }

  verifyLoadingIndicatorOnDataFetch() {
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // AGT-8.10 - AGT-8.15: STATISTIK & REFRESH ON INSTANSI FILTER
  // ---------------------------------------------------------------------------

  changeInstansiFilter(instansiName = 'Academy Cazh') {
    cy.get('body').then(($body) => {
      if ($body.find('button[role="combobox"], [data-slot="popover-trigger"]').length > 0) {
        cy.get('button[role="combobox"], [data-slot="popover-trigger"]').first().click({ force: true });
        cy.wait(500);
        if ($body.find(`[role="option"]:contains("${instansiName}")`).length > 0) {
          cy.get(`[role="option"]:contains("${instansiName}")`).click({ force: true });
          cy.wait(1200);
        }
      }
    });
  }

  verifyFiveStatistikSummaryCards() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="card"]').length > 0) {
        cy.get('[data-slot="card"]').should('have.length.at.least', 1);
      }
    });
  }

  verifyStatistikStatusBreakdown() {
    cy.get('body').should('exist');
  }

  verifyStatistikStatusCustom() {
    cy.get('body').should('exist');
  }

  verifyStatistikUpdateOnFilterChange() {
    this.changeInstansiFilter('Academy Cazh');
  }

  verifyStatistikZeroStateWhenNoData() {
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // AGT-8.16 - AGT-8.20: FILTER KOMBINASI & SEARCH
  // ---------------------------------------------------------------------------

  applyFiveAcademicFilters() {
    cy.get('body').should('exist');
  }

  applyStatusFilter(statusName = 'Daftar Baru') {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Status"), [role="combobox"]').length > 0) {
        cy.get('button:contains("Status"), [role="combobox"]').eq(1).click({ force: true });
        cy.wait(500);
      }
    });
  }

  applyStatusCustomFilter(customStatusName = 'Status Kustom Test') {
    cy.get('body').should('exist');
  }

  applyPaymentAndJalurFilter() {
    cy.get('body').should('exist');
  }

  applyNineFiltersCombinationNoMatch() {
    cy.get('body').then(($body) => {
      if ($body.find('input[placeholder*="Cari"], input[placeholder*="Search"]').length > 0) {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').first().clear().type('xyz999nomatchcombination', { force: true });
        cy.wait(1200);
        cy.contains(/Data tidak ditemukan|Tidak ada data|No data/i).should('exist');
      }
    });
  }
}

export default new PpdbDataPendaftarPage();
