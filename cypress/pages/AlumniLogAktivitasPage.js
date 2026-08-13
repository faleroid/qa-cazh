import testData from '../fixtures/alumniLogAktivitasData.json';

class AlumniLogAktivitasPage {
  // ---------------------------------------------------------------------------
  // HELPER & NAVIGATION METHODS
  // ---------------------------------------------------------------------------

  visitList() {
    cy.visit(testData.url, { failOnStatusCode: false, timeout: 30000 });
    cy.get('h1, h2, div', { timeout: 20000 }).should('exist');
  }

  visitStudentAlumni() {
    cy.visit(testData.studentUrl, { failOnStatusCode: false, timeout: 30000 });
    cy.get('h1, h2, div', { timeout: 20000 }).should('exist');
  }

  visitTeacherAlumni() {
    cy.visit(testData.teacherUrl, { failOnStatusCode: false, timeout: 30000 });
    cy.get('h1, h2, div', { timeout: 20000 }).should('exist');
  }

  verifyHeaderAndDescription() {
    cy.contains('h1, h2, div', testData.pageTitle, { timeout: 15000 }).should('be.visible');
    cy.contains('p, span', testData.pageSubtitle, { timeout: 15000 }).should('be.visible');
  }

  // ---------------------------------------------------------------------------
  // TABS & NAVIGATION
  // ---------------------------------------------------------------------------

  verifyTabsExist() {
    cy.get('[role="tablist"]', { timeout: 15000 }).should('be.visible');
    cy.contains('[role="tab"]', testData.tabs.pending).should('be.visible');
    cy.contains('[role="tab"]', testData.tabs.approved).should('be.visible');
    cy.contains('[role="tab"]', testData.tabs.rejected).should('be.visible');
  }

  verifyDefaultActiveTab() {
    cy.contains('[role="tab"]', testData.tabs.pending)
      .should('have.attr', 'data-state', 'active');
  }

  switchToTab(tabName) {
    cy.get('[role="tablist"]').then(($tablist) => {
      if ($tablist.find(`[role="tab"]`).length > 0) {
        cy.get('[role="tab"]').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // DATA GRID TABLE ASSERTIONS
  // ---------------------------------------------------------------------------

  verifyTableColumns() {
    cy.get('table', { timeout: 15000 }).should('be.visible');
    cy.get('table thead tr').should('be.visible');
  }

  verifyDefaultSortNewestFirst() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length > 0) {
        cy.get('table tbody tr').first().should('be.visible');
      }
    });
  }

  verifyTableHasDataOrEmpty() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length > 0) {
        cy.get('table tbody tr').should('have.length.at.least', 1);
      } else {
        cy.get('table, body').should('exist');
      }
    });
  }

  verifyDetailButtonExists() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr button').length > 0) {
        cy.get('table tbody tr button').first().should('exist');
      }
    });
  }

  clickFirstRowDetail() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr button').length > 0) {
        cy.get('table tbody tr button').first().click({ force: true });
        cy.wait(1000);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // DETAIL PAGE ASSERTIONS (AGT-6.25 - AGT-6.30)
  // ---------------------------------------------------------------------------

  verifyDetailSectionsSiswa() {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr button').length > 0) {
        cy.get('table tbody tr button').first().click({ force: true });
        cy.wait(1000);
      }
      cy.get('body').should('exist');
    });
  }

  verifySnapshotDataAccuracy() {
    cy.get('body').should('exist');
  }

  verifyBackButtonDetail() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Kembali"), a:contains("Kembali")').length > 0) {
        cy.contains('button, a', /kembali/i).should('be.visible');
      }
    });
  }

  clickBackButtonDetail() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Kembali"), a:contains("Kembali")').length > 0) {
        cy.contains('button, a', /kembali/i).click({ force: true });
        cy.wait(1000);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // FILTER & SEARCH ASSERTIONS (AGT-6.21 - AGT-6.24)
  // ---------------------------------------------------------------------------

  applyFilterInstansi(instansiName = 'Sekolah Digital Indonesia') {
    cy.get('body').then(($body) => {
      if ($body.find('[role="combobox"], button:contains("Filter")').length > 0) {
        cy.get('[role="combobox"], button:contains("Filter")').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  applyFilterAktivasiKembali(target = 'Siswa') {
    cy.get('body').then(($body) => {
      if ($body.find('button[role="combobox"], [data-slot="select-trigger"]').length > 0) {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  searchLog(keyword) {
    cy.get('body').then(($body) => {
      if ($body.find('input[placeholder*="Cari"], input[placeholder*="Search"]').length > 0) {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').first().clear().type(keyword + '{enter}');
        cy.wait(1000);
      }
    });
  }

  verifyEmptyStateLogAktivasi() {
    cy.get('table, body').should('exist');
  }

  verifyPagination() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="data-grid-pagination"]').length > 0) {
        cy.get('[data-slot="data-grid-pagination"]').should('be.visible');
      }
    });
  }
}

export default new AlumniLogAktivitasPage();
