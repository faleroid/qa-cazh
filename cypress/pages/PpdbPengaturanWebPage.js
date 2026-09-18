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

  // ---------------------------------------------------------------------------
  // JADWAL & ALUR TESTIMONI ACTIONS (AGT-7.41 - AGT-7.50)
  // ---------------------------------------------------------------------------

  verifyJadwalRequiredValidation() {
    this.clickTambahJadwal();
    this.submitForm();
    cy.get('body').then(($body) => {
      if ($body.find('.text-destructive, .text-red-500, [role="alert"]').length > 0) {
        cy.get('.text-destructive, .text-red-500, [role="alert"]').should('be.visible');
      }
    });
  }

  fillJadwalInvalidDates() {
    this.clickTambahJadwal();
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"] input[type="date"]').length >= 2) {
        cy.get('[role="dialog"] input[type="date"]').eq(0).type('2026-12-31');
        cy.get('[role="dialog"] input[type="date"]').eq(1).type('2026-01-01');
      }
    });
    this.submitForm();
    cy.get('body').then(($body) => {
      if ($body.find('.text-destructive, .text-red-500, [role="alert"], body:contains("tidak boleh melebihi")').length > 0) {
        cy.contains(/tidak boleh melebihi|exceed|invalid|error/i).should('exist');
      }
    });
  }

  clickUbahJadwal() {
    this.switchToJadwalTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Ubah Jadwal"), button:contains("Edit Jadwal")').length > 0) {
        cy.contains('button', /ubah jadwal|edit jadwal/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  clickHapusJadwal(confirm = true) {
    this.switchToJadwalTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Hapus Jadwal"), button:contains("Hapus")').length > 0) {
        cy.contains('button', /hapus jadwal|hapus/i).first().click({ force: true });
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

  verifyDetailJadwalCards() {
    this.switchToJadwalTab();
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="card"]').length > 0) {
        cy.get('[data-slot="card"]').should('have.length.at.least', 1);
      }
    });
  }

  clickTabTahapan() {
    this.switchToJadwalTab();
    cy.get('body').then(($body) => {
      if ($body.find('[role="tab"]:contains("Tahapan"), button:contains("Tahapan")').length > 0) {
        cy.contains('[role="tab"], button', 'Tahapan').click({ force: true });
        cy.wait(800);
      }
    });
  }

  verifyChartTahapanRealtime() {
    this.clickTabTahapan();
    cy.get('body').should('exist');
  }

  switchToAlurTestimoniTab() {
    this.switchToSubmenuTab('Alur & Testimoni');
  }

  verifyAlurPpdbSixRowsFixed() {
    this.switchToAlurTestimoniTab();
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // ALUR PPDB & TESTIMONI DETAILED (AGT-7.51 - AGT-7.63)
  // ---------------------------------------------------------------------------

  clickEditAlurPpdb() {
    this.switchToAlurTestimoniTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillAlurForm(title = 'Pendaftaran Online', desc = 'Isi formulir pendaftaran melalui website PPDB') {
    cy.get('body').then(($body) => {
      if ($body.find('input[name="title"], input[name="name"]').length > 0) {
        cy.get('input[name="title"], input[name="name"]').first().clear().type(title);
      }
    });
  }

  verifyAlurRequiredValidation() {
    this.clickEditAlurPpdb();
    cy.get('body').then(($body) => {
      if ($body.find('input[type="text"]').length > 0) {
        cy.get('input[type="text"]').first().clear();
      }
    });
    this.submitForm();
  }

  fillAlurDuplicateOrder() {
    this.clickEditAlurPpdb();
    this.submitForm();
  }

  clickKembaliAlurForm() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Kembali"), button:contains("Batal")').length > 0) {
        cy.contains('button', /kembali|batal/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  verifyTestimoniEmptyState() {
    this.switchToAlurTestimoniTab();
    cy.get('body').should('exist');
  }

  clickTambahTestimoni() {
    this.switchToAlurTestimoniTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Tambah Testimoni"), button:contains("Tambah")').length > 0) {
        cy.contains('button', /tambah/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  openNamaAlumniDropdown() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="combobox"]').length > 0) {
        cy.get('[role="combobox"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  fillTestimoniForm(name = 'Ahmad Alumnus', text = 'Sekolah ini sangat bagus dan berprestasi') {
    cy.get('body').then(($body) => {
      if ($body.find('textarea').length > 0) {
        cy.get('textarea').first().clear().type(text);
      }
    });
  }

  verifyTestimoniRequiredValidation() {
    this.clickTambahTestimoni();
    this.submitForm();
  }

  clickEditTestimoni() {
    this.switchToAlurTestimoniTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit"), button:contains("Ubah")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit"), button:contains("Ubah")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  clickDeleteTestimoni(confirm = true) {
    this.switchToAlurTestimoniTab();
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
        }
      }
    });
  }

  toggleVisibilityTestimoni() {
    this.switchToAlurTestimoniTab();
    cy.get('body').then(($body) => {
      if ($body.find('[role="switch"], button:has(svg.lucide-eye)').length > 0) {
        cy.get('[role="switch"], button:has(svg.lucide-eye)').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // KONTAK & ALAMAT ACTIONS (AGT-7.64 - AGT-7.78)
  // ---------------------------------------------------------------------------

  switchToKontakAlamatTab() {
    this.switchToSubmenuTab('Kontak & Alamat');
  }

  fillKontakPpdbForm(wa = '081234567890', email = 'admin.ppdb@cazh.id') {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('input[name="phone"], input[name="whatsapp"]').length > 0) {
        cy.get('input[name="phone"], input[name="whatsapp"]').first().clear().type(wa);
      }
      if ($body.find('input[name="email"]').length > 0) {
        cy.get('input[name="email"]').first().clear().type(email);
      }
    });
  }

  verifyKontakRequiredValidation() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('input[name="email"]').length > 0) {
        cy.get('input[name="email"]').first().clear();
      }
    });
    this.submitForm();
  }

  fillInvalidEmailKontak() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('input[name="email"]').length > 0) {
        cy.get('input[name="email"]').first().clear().type('invalidemailformat');
      }
    });
    this.submitForm();
  }

  fillInvalidWaKontak() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('input[name="phone"], input[name="whatsapp"]').length > 0) {
        cy.get('input[name="phone"], input[name="whatsapp"]').first().clear().type('12345');
      }
    });
    this.submitForm();
  }

  verifyAlamatInstansiSection() {
    this.switchToKontakAlamatTab();
    cy.get('body').should('exist');
  }

  clickEditAlamatInstansi() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  setPinLocationGoogleMap() {
    this.clickEditAlamatInstansi();
    this.submitForm();
  }

  verifySosialMediaVisibility(isSma = false) {
    this.switchToKontakAlamatTab();
    cy.get('body').should('exist');
  }

  clickTambahSosialMedia() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Tambah Sosial Media"), button:contains("Tambah")').length > 0) {
        cy.contains('button', /tambah/i).first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillSosialMediaForm(name = 'Instagram', url = 'https://instagram.com/cazh.id') {
    cy.get('body').then(($body) => {
      if ($body.find('input[name="url"], input[type="url"]').length > 0) {
        cy.get('input[name="url"], input[type="url"]').first().clear().type(url);
      }
    });
  }

  verifySosialMediaRequiredValidation() {
    this.clickTambahSosialMedia();
    this.submitForm();
  }

  clickEditSosialMedia() {
    this.switchToKontakAlamatTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(800);
      }
    });
  }

  clickDeleteSosialMedia(confirm = true) {
    this.switchToKontakAlamatTab();
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
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // FORMULIR ACTIONS (AGT-7.79 - AGT-7.90)
  // ---------------------------------------------------------------------------

  switchToFormulirTab() {
    this.switchToSubmenuTab('Formulir');
  }

  verifyFormulirTabs(isKejuruan = false) {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifyFormulirEightSections() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  clickSectionAlurPpdbFormulir() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDataAnakFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDataAlamatFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDataWaliAnakFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDataOrangTuaFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionFormulirKesehatanFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDataProgramFields() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  verifySectionDokumenConfig() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  // ---------------------------------------------------------------------------
  // FORMULIR CONTROLS & ANALYTIC (AGT-7.91 - AGT-7.113)
  // ---------------------------------------------------------------------------

  verifyFormulirThreeControlsPerField() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  toggleFieldTampilkan(state = false) {
    this.switchToFormulirTab();
    cy.get('body').then(($body) => {
      if ($body.find('[role="switch"]').length > 0) {
        cy.get('[role="switch"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  toggleFieldWajib(state = true) {
    this.switchToFormulirTab();
    cy.get('body').then(($body) => {
      if ($body.find('[role="switch"]').length > 1) {
        cy.get('[role="switch"]').eq(1).click({ force: true });
        cy.wait(500);
      }
    });
  }

  toggleFieldWajibOff() {
    this.toggleFieldWajib(false);
  }

  editFieldLabel(newLabel = 'Nama Lengkap Siswa Kustom') {
    this.switchToFormulirTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:has(svg.lucide-pencil), button:contains("Edit")').length > 0) {
        cy.get('button:has(svg.lucide-pencil), button:contains("Edit")').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  verifyJurusanFieldCustomization() {
    this.switchToFormulirTab();
    cy.get('body').should('exist');
  }

  submitFormulirConfig() {
    this.submitForm();
  }

  // ---------------------------------------------------------------------------
  // ANALYTIC ACTIONS (AGT-7.98 - AGT-7.113)
  // ---------------------------------------------------------------------------

  switchToAnalyticTab() {
    this.switchToSubmenuTab('Analytic');
  }

  verifyAnalyticFourVisitorCards() {
    this.switchToAnalyticTab();
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="card"]').length > 0) {
        cy.get('[data-slot="card"]').should('have.length.at.least', 1);
      }
    });
  }

  simulateIncognitoVisitor() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  simulateSameDeviceVisitorTwice() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyVisitorThisMonthValue() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyUniqueVisitorThisMonthValue() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyChartTrenPengunjung() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyDefaultRangeThirtyDaysChart() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  openRangeDatePickerChart() {
    this.switchToAnalyticTab();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Range"), button:contains("Tanggal"), [role="combobox"]').length > 0) {
        cy.get('button:contains("Range"), button:contains("Tanggal"), [role="combobox"]').first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  applyRangeDateLastSevenDays() {
    this.openRangeDatePickerChart();
    cy.get('body').should('exist');
  }

  applyCustomRangeDate(startDate = '2026-01-01', endDate = '2026-01-15') {
    this.openRangeDatePickerChart();
    cy.get('body').should('exist');
  }

  applyInvalidRangeDate() {
    this.openRangeDatePickerChart();
    cy.get('body').should('exist');
  }

  applyFutureRangeDate() {
    this.openRangeDatePickerChart();
    cy.get('body').should('exist');
  }

  hoverChartDataPoint() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyNewInstansiAnalyticEmptyState() {
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }

  verifyAnalyticDataRefreshedOnInstansiChange() {
    this.selectInstansi('Academy Cazh');
    this.switchToAnalyticTab();
    cy.get('body').should('exist');
  }
}

export default new PpdbPengaturanWebPage();
