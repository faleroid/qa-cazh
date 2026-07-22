class LegalityPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Optimized for Dialog Modal)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('[data-slot="accordion-menu-title"], button', /pengaturan/i, { timeout: 10000 }),
    
    // Gunakan filter .text() untuk mendapatkan 'Tagihan F' secara exact tanpa match 'Jenis Tagihan F'
    sidebarMenuTagihan: () => cy.get('button', { timeout: 10000 }).filter((index, el) => Cypress.$(el).text().trim() === 'Tagihan F').first(),
    
    sidebarMenuLegalitas: () => cy.contains('button, a', /legalitas bukti bayar/i, { timeout: 10000 }),
    
    // Dialog / Modal Container (Stable Radix Selector)
    dialogContainer: () => cy.get('[role="dialog"][data-state="open"], [data-slot="dialog-content"]', { timeout: 10000 }),
    
    // Elements scoped inside the Dialog Modal
    dialogTitle: () => this.elements.dialogContainer().find('h2, [data-slot="dialog-title"], .text-lg').contains(/legalitas bukti bayar/i),
    instansiDropdown: () => this.elements.dialogContainer().find('[data-slot="select-trigger"], [role="combobox"], button:contains("Instansi")'),
    instansiDropdownValue: () => this.elements.instansiDropdown().find('[data-slot="select-value"], span').first(),
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }), // Portal (renders outside dialog)
    legalitySwitch: () => this.elements.dialogContainer().find('button[role="switch"], [data-slot="switch"], input[type="checkbox"]').first(),
    allInputs: () => this.elements.dialogContainer().find('input[data-slot="input"], input:visible'),
    fileInput: () => this.elements.dialogContainer().find('input[type="file"]'),
    saveButton: () => this.elements.dialogContainer().find('button[data-slot="button"], button').contains(/simpan|save/i),
    infoMessage: () => this.elements.dialogContainer().contains(/transparan|putih|background|tanda tangan/i),
    
    // Toasts and Errors
    toastNotification: () => cy.get('[role="status"], [data-slot="toast"], .toast', { timeout: 10000 }),
    validationErrorMessage: () => this.elements.dialogContainer().find('[data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"]')
  };

  // ---------------------------------------------------------------------------
  // ACTIONS & BUSINESS LOGIC
  // ---------------------------------------------------------------------------
  
  /**
   * Navigate to the Dashboard and open the Legality Modal via Sidebar
   */
  openModal() {
    cy.visit('/setting/inventory', { failOnStatusCode: false });
    
    // Tunggu halaman selesai load (jangan tekan ESC saat masih loading agar tidak membatalkan request AJAX Auth)
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    // Tutup paksa jika ada modal yang masih menggantung dari test sebelumnya
    cy.get('body').type('{esc}{esc}', { force: true });
    cy.wait(500);

    // Cek apakah menu Legalitas Bukti Bayar sudah ada di DOM dan terlihat
    // Jika belum, berarti Tagihan F masih tertutup dan harus diklik
    cy.get('body').then(($body) => {
      const isLegalitasVisible = $body.find('button:contains("Legalitas Bukti Bayar")').is(':visible');
      if (!isLegalitasVisible) {
        this.elements.sidebarMenuTagihan().click({ force: true });
        cy.wait(1000);
      }
    });
    
    // Klik menu 'Legalitas Bukti Bayar' untuk membuka modal
    this.elements.sidebarMenuLegalitas().click({ force: true });

    // Tunggu Modal Terbuka
    this.elements.dialogContainer().should('be.visible');
    this.elements.dialogTitle().should('be.visible');
  }

  /**
   * Open instansi dropdown and select an item by index
   * @param {number} index 
   */
  selectInstansi(index = 0) {
    this.elements.instansiDropdown().click({ force: true });
    this.elements.selectOptions().eq(index).click({ force: true });
    this.elements.dialogContainer().should('not.contain', 'Loading...');
  }

  /**
   * Set toggle switch to desired state
   */
  setToggleState(targetState = true) {
    this.elements.legalitySwitch().then(($toggle) => {
      const isChecked = 
        $toggle.attr('data-state') === 'checked' || 
        $toggle.attr('aria-checked') === 'true' || 
        $toggle.is(':checked');

      if (targetState !== isChecked) {
        cy.wrap($toggle).click({ force: true });
      }
    });
  }

  fillForm({ pengesahan, jabatan, namaTerang }) {
    // Gunakan explicit name attributes dari DOM untuk mencegah silent failure
    if (pengesahan !== undefined) {
      this.elements.dialogContainer().find('input[name="endorsement"]')
        .clear({ force: true })
        .type(pengesahan || '{backspace}', { force: true });
    }
    if (jabatan !== undefined) {
      this.elements.dialogContainer().find('input[name="position"]')
        .clear({ force: true })
        .type(jabatan || '{backspace}', { force: true });
    }
    if (namaTerang !== undefined) {
      this.elements.dialogContainer().find('input[name="full_name"]')
        .clear({ force: true })
        .type(namaTerang || '{backspace}', { force: true });
    }
  }

  uploadSignature(filePath) {
    this.elements.fileInput().selectFile(filePath, { force: true });
  }

  clickSave() {
    cy.intercept('POST', '**/legality**').as('saveLegality');
    this.elements.saveButton().click({ force: true });
    // Tunggu sedikit untuk memberi waktu validasi frontend atau API call
    cy.wait(1000);
  }

  // ---------------------------------------------------------------------------
  // ASSERTIONS & VERIFICATIONS
  // ---------------------------------------------------------------------------

  verifySubFieldsVisible() {
    this.elements.dialogContainer().should('contain.text', 'Pengesahan');
    this.elements.dialogContainer().should('contain.text', 'Jabatan');
    this.elements.dialogContainer().should('contain.text', 'Nama Terang');
  }

  verifySubFieldsHidden() {
    this.elements.dialogContainer().contains('label', /pengesahan/i).should('not.exist');
    this.elements.dialogContainer().contains('label', /jabatan/i).should('not.exist');
  }

  verifyToastSuccess() {
    // Kita perlu menangani 2 kemungkinan:
    // 1. Toast error dari backend (seperti "kesalahan pada database")
    // 2. Toast sukses dari backend (seperti "Berhasil", "Disimpan")
    cy.get('.toast, [role="status"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 })
      .should('exist')
      .invoke('text')
      .then((text) => {
        // Log teks toast ke console Cypress agar terlihat di test runner
        cy.log('TOAST MESSAGE MUNCUL: ' + text);
        
        // Kita izinkan "kesalahan pada database" lewat agar QA tau ini bug backend, bukan bug skrip.
        // Jika memang ingin menggagalkan test, biarkan fail di sini jika tidak match "berhasil/sukses"
        if (text.toLowerCase().includes('kesalahan') || text.toLowerCase().includes('error')) {
           throw new Error(`[BACKEND BUG] Aplikasi mengembalikan error: ${text}`);
        }
        
        expect(text.toLowerCase()).to.match(/berhasil|sukses|saved|success|tersimpan/);
      });
  }

  verifyValidationError(expectedText) {
    this.elements.dialogContainer().contains(new RegExp(expectedText, 'i')).should('be.visible');
  }

  verifyLegalityOnInvoice(proofUrl, namaText, jabatanText, shouldExist = true) {
    cy.visit(proofUrl, { failOnStatusCode: false });
    if (shouldExist) {
      cy.contains(namaText, { timeout: 10000 }).should('be.visible');
      cy.contains(jabatanText, { timeout: 10000 }).should('be.visible');
    } else {
      cy.contains(namaText).should('not.exist');
    }
  }
}

export default new LegalityPage();
