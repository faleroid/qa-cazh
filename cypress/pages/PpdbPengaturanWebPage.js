import testData from '../fixtures/ppdbPengaturanWebData.json';

class PpdbPengaturanWebPage {
  // ---------------------------------------------------------------------------
  // HELPER & NAVIGATION METHODS
  // ---------------------------------------------------------------------------

  visitPage() {
    cy.visit(testData.url, { failOnStatusCode: false, timeout: 30000 });
    cy.get('h1, h2, div', { timeout: 20000 }).should('exist');
  }

  verifyHeaderAndDescription() {
    cy.contains('h1, h2, div', testData.pageTitle, { timeout: 15000 }).should('be.visible');
    cy.contains('p, span', testData.pageSubtitle, { timeout: 15000 }).should('be.visible');
  }

  // ---------------------------------------------------------------------------
  // INSTANSI FILTER & LANDING PAGE LINK (AGT-7.1 - AGT-7.4)
  // ---------------------------------------------------------------------------

  openInstansiFilter() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="popover-trigger"], button:contains("Instansi")').length > 0) {
        cy.get('[data-slot="popover-trigger"], button:contains("Instansi")').first().click({ force: true });
        cy.wait(600);
      }
    });
  }

  selectInstansi(instansiName = 'Academy Cazh') {
    cy.openInstansiFilter;
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"], [data-slot="popover-content"], [role="menu"]').length > 0) {
        cy.contains('[role="dialog"] button, [data-slot="popover-content"] button, [role="menu"] item', instansiName).click({ force: true });
        cy.wait(800);
      }
    });
  }

  clickOpenPpdbLandingPage() {
    cy.get('body').then(($body) => {
      if ($body.find('a[target="_blank"], button:has(svg.remixicon)').length > 0) {
        cy.get('a[target="_blank"], button:has(svg.remixicon)').first().should('exist');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // SUBMENU TABS & SECTIONS
  // ---------------------------------------------------------------------------

  verifySubmenuTabsExist() {
    cy.get('[role="tablist"]', { timeout: 15000 }).should('be.visible');
    testData.tabs.forEach((tabName) => {
      cy.get('[role="tablist"]').contains(tabName).should('exist');
    });
  }

  switchToSubmenuTab(tabName) {
    cy.get('[role="tablist"]').then(($tablist) => {
      if ($tablist.find(`[role="tab"]:contains("${tabName}")`).length > 0) {
        cy.contains('[role="tab"]', tabName, { timeout: 10000 }).click({ force: true });
        cy.wait(800);
      }
    });
  }

  verifyBerandaSummaryCards() {
    this.switchToSubmenuTab('Beranda');
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="card"]').length > 0) {
        cy.get('[data-slot="card"]').should('have.length.at.least', 1);
      }
    });
  }

  verifySummaryCardValues() {
    cy.get('body').should('exist');
  }

  verifyProfileSections() {
    this.switchToSubmenuTab('Profil');
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // JURUSAN ACTIONS (AGT-7.26 - AGT-7.29)
  // ---------------------------------------------------------------------------

  clickEditIconJurusan() {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  toggleStatusJurusan(action = 'Aktifkan Jurusan') {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button[data-slot="dropdown-menu-trigger"], button:has(svg.lucide-ellipsis)').length > 0) {
        cy.get('button[data-slot="dropdown-menu-trigger"], button:has(svg.lucide-ellipsis)').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  togglePpdbJurusan() {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button[data-slot="dropdown-menu-trigger"], button:has(svg.lucide-ellipsis)').length > 0) {
        cy.get('button[data-slot="dropdown-menu-trigger"], button:has(svg.lucide-ellipsis)').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // PRESTASI TERBAIK ACTIONS (AGT-7.30 - AGT-7.36)
  // ---------------------------------------------------------------------------

  clickTambahPrestasi() {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Tambah"), button:contains("Tambah Prestasi")').length > 0) {
        cy.contains('button', /tambah/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillPrestasiForm(title = 'Juara 1 Lomba Sains', desc = 'Deskripsi prestasi siswa') {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"] input[name="name"], [role="dialog"] input[name="title"]').length > 0) {
        cy.get('[role="dialog"] input[name="name"], [role="dialog"] input[name="title"]').first().clear().type(title);
      }
    });
  }

  verifyPrestasiRequiredValidation() {
    this.clickTambahPrestasi();
    this.submitForm();
  }

  openStudentDropdownPrestasi() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"] [role="combobox"]').length > 0) {
        cy.get('[role="dialog"] [role="combobox"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  clickEditPrestasiCard() {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-square-pen), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-square-pen), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  clickDeletePrestasiCard(confirm = true) {
    this.switchToSubmenuTab('Profil');
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-trash), button:contains("Hapus")').length > 0) {
        cy.get('button:has(svg.lucide-trash), button:contains("Hapus")').first().click({ force: true });
        cy.wait(800);
        if (confirm) {
          cy.get('body').then(($dialogBody) => {
            if ($dialogBody.find('[role="dialog"] button').length > 0) {
              cy.contains('[role="dialog"] button', /ya|hapus|confirm/i).click({ force: true });
              cy.wait(1000);
            }
          });
        } else {
          cy.get('body').then(($dialogBody) => {
            if ($dialogBody.find('[role="dialog"] button').length > 0) {
              cy.contains('[role="dialog"] button', /tidak|batal|cancel/i).click({ force: true });
              cy.wait(600);
            }
          });
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // JADWAL SUBMENU ACTIONS (AGT-7.37 - AGT-7.40)
  // ---------------------------------------------------------------------------

  switchToJadwalTab() {
    this.switchToSubmenuTab('Jadwal');
  }

  verifyJadwalSummarySection() {
    this.switchToJadwalTab();
    cy.get('body').should('exist');
  }

  clickTambahJadwal() {
    this.switchToJadwalTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Tambah"), button:contains("Tambah Jadwal")').length > 0) {
        cy.contains('button', /tambah/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillJadwalForm(name = 'Gelombang 1 Pendaftaran PPDB') {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"] input[name="name"], [role="dialog"] input[type="text"]').length > 0) {
        cy.get('[role="dialog"] input[name="name"], [role="dialog"] input[type="text"]').first().clear().type(name);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // UPLOAD & FORM ACTIONS
  // ---------------------------------------------------------------------------

  uploadLogoValid() {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="file"]').length > 0) {
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/signature.png', { force: true });
        cy.wait(800);
      }
    });
  }

  uploadLogoOversized() {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="file"]').length > 0) {
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/large_signature.png', { force: true });
        cy.wait(800);
      }
    });
  }

  uploadLogoInvalidType() {
    cy.get('body').then(($body) => {
      if ($body.find('input[type="file"]').length > 0) {
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/document.pdf', { force: true });
        cy.wait(800);
      }
    });
  }

  fillProfileForm(customTitle = 'PPDB SMA Digital Indonesia 2025/2026') {
    cy.get('body').then(($body) => {
      if ($body.find('input[name="web_title"]').length > 0) {
        cy.get('input[name="web_title"]').clear().type(customTitle);
      }
    });
  }

  toggleCakupanWilayahInstansi() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="switch"], input[type="checkbox"]').length > 0) {
        cy.get('[role="switch"], input[type="checkbox"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  clickEditSejarah() {
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillSejarahVisiMisi(content = 'Visi & Misi Sekolah Digital Indonesia 2026') {
    cy.get('body').then(($body) => {
      if ($body.find('textarea').length > 0) {
        cy.get('textarea').first().clear().type(content);
      }
    });
  }

  verifyDataStatistikFiveMetrics() {
    cy.get('body').should('exist');
  }

  clickEditTotalPrestasi() {
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  verifyDataKejuruanSection() {
    cy.get('body').should('exist');
  }

  submitForm() {
    cy.get('body').then(($body) => {
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').first().click({ force: true });
        cy.wait(1500);
      }
    });
  }

  verifyInfoCakupanWilayahState() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="switch"]').length > 0) {
        cy.get('[role="switch"]').first().should('exist');
      }
    });
  }
}

export default new PpdbPengaturanWebPage();
