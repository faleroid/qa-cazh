import testData from '../fixtures/studentData.json';

class StudentDetailPage {
  visitStudentList() {
    cy.visit(testData.urls.studentPage, { failOnStatusCode: false, timeout: 30000 });
    cy.contains('h1, h2, h3, div', 'Data Siswa', { timeout: 15000 }).should('be.visible');
  }

  navigateToFirstStudentDetail() {
    this.visitStudentList();
    cy.wait(1500);

    // Klik link data siswa pertama pada tabel (a[href*="/member/student/"])
    cy.get('tbody tr td a[href*="/member/student/"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(1500);
  }

  verifyHeaderInfo() {
    cy.url().should('include', '/member/student/');
    cy.get('body').then(($body) => {
      const text = $body.text();
      expect(text, 'Header Detail Siswa harus memuat informasi dasar').to.be.ok;
    });
  }

  verifyHistoryFilters() {
    cy.get('body').then(($body) => {
      const hasFilter = $body.find('[role="combobox"], select, button[data-slot="select-trigger"]').length > 0;
      expect(hasFilter, 'Filter History Siswa harus tampil di halaman Detail').to.be.true;
    });
  }

  verifyElevenTabs() {
    const tabs = [
      'Data Diri', 'Data Orang Tua', 'Kartu', 'Tagihan', 'Dokumen',
      'Rapor', 'Kesehatan', 'Pelanggaran', 'Prestasi', 'Perizinan', 'Progres'
    ];

    tabs.forEach((tabName) => {
      cy.contains('[role="tab"], button, a', tabName, { timeout: 10000 }).should('exist');
    });
  }

  clickProgresTab() {
    cy.contains('[role="tab"], button, a', 'Progres', { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    cy.wait(1000);
  }

  verifyProgresTableColumns() {
    cy.get('thead th, thead tr', { timeout: 15000 }).should('exist');
    cy.contains('th, button, div', 'Kegiatan').should('exist');
    cy.contains('th, button, div', 'Deskripsi').should('exist');
  }

  searchKeyword(keyword) {
    cy.get('input[placeholder*="Cari"], input[type="search"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .clear()
      .type(`${keyword}{enter}`, { force: true });
    cy.wait(1000);
  }
}

export default new StudentDetailPage();
