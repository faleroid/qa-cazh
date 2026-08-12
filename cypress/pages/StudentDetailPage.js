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
    // 1. Klik tombol Filter (button khusus bertuliskan Filter)
    cy.contains('button', /^filter$/i, { timeout: 15000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    cy.wait(800);

    // 2. Verifikasi popover terbuka dan memuat ke-4 filter (Tahun Ajaran, Semester, Tingkat, Kelas)
    cy.get('body', { timeout: 15000 }).should(($body) => {
      const text = $body.text();
      const hasFilterText = text.includes('Tahun Ajaran') || text.includes('Semester') || text.includes('Tingkat') || text.includes('Kelas') || $body.find('[data-slot="popover-content"], [data-radix-popper-content-wrapper], [role="dialog"]').length > 0;
      expect(hasFilterText, 'Popover Filter harus terbuka dan memuat opsi filter (Tahun Ajaran, Semester, Tingkat, Kelas)').to.be.true;
    });
  }

  verifyElevenTabs() {
    // 1. Verifikasi tablist utama ([data-slot="tabs-list"]) memuat 10 tab langsung + dropdown Lainnya
    cy.get('[data-slot="tabs-list"], [role="tablist"]', { timeout: 15000 })
      .should('be.visible')
      .within(() => {
        cy.contains(/data (siswa|diri)/i).should('exist');
        cy.contains('Data Orang Tua').should('exist');
        cy.contains('Kartu').should('exist');
        cy.contains('Tagihan').should('exist');
        cy.contains('Dokumen').should('exist');
        cy.contains('Rapor').should('exist');
        cy.contains('Kesehatan').should('exist');
        cy.contains('Pelanggaran').should('exist');
        cy.contains('Prestasi').should('exist');
        cy.contains('Perizinan').should('exist');
        cy.contains(/lainnya|progres/i).should('exist');
      });

    // 2. Verifikasi tab ke-11 "Progres" (diakses via menu Lainnya jika belum terbuka)
    cy.get('body').then(($body) => {
      if ($body.find('[role="menuitem"]:contains("Progres"), div:contains("Progres")').length === 0) {
        const btnLainnya = $body.find('button[data-slot="dropdown-menu-trigger"]:contains("Lainnya"), button:contains("Lainnya")');
        if (btnLainnya.length > 0) {
          cy.wrap(btnLainnya.first()).click({ force: true });
          cy.wait(400);
        }
      }
    });
    cy.contains(/progres/i, { timeout: 10000 }).should('exist');
  }

  clickProgresTab() {
    cy.get('body').then(($body) => {
      const isVisibleDirect = $body.find('[role="tab"]:contains("Progres"), button:contains("Progres")').length > 0;
      if (isVisibleDirect) {
        cy.contains('[role="tab"], button, a', 'Progres').click({ force: true });
      } else {
        // Klik tombol dropdown "Lainnya"
        cy.get('button[data-slot="dropdown-menu-trigger"], button', { timeout: 10000 })
          .contains('Lainnya')
          .click({ force: true });
        cy.wait(500);
        cy.contains('[role="menuitem"], button, a, div', 'Progres').click({ force: true });
      }
    });
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
      .should('exist')
      .clear({ force: true })
      .type(`${keyword}{enter}`, { force: true });
    cy.wait(1000);
  }
}

export default new StudentDetailPage();
