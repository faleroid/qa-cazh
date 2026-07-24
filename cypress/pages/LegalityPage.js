class LegalityPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Optimized for Dialog Modal)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('[data-slot="accordion-menu-title"], button', /pengaturan/i, { timeout: 10000 }),
    
    // Matched using regex starting with Tagihan so 'Jenis Tagihan F' (starts with J) is automatically ignored
    sidebarMenuTagihan: () => cy.contains('button, [role="button"], a, span, [data-slot="accordion-menu-item"]', /tagihan/i, { timeout: 10000 }),
    
    sidebarMenuLegalitas: () => cy.contains('button, [role="button"], a, span, [data-slot="accordion-menu-item"]', /legalitas bukti bayar/i, { timeout: 10000 }),
    
    // Dialog / Modal Container (Stable Radix Selector)
    dialogContainer: () => cy.get('[role="dialog"][data-state="open"], [data-slot="dialog-content"]', { timeout: 10000 }),
    
    // Elements scoped inside the Dialog Modal
    dialogTitle: () => this.elements.dialogContainer().find('h2, [data-slot="dialog-title"]').contains(/legalitas bukti bayar/i),
    instansiLabel: () => this.elements.dialogContainer().find('label[data-slot="form-label"]').contains(/pilih instansi/i),
    instansiDropdown: () => this.elements.dialogContainer().find('[data-slot="select-trigger"], [role="combobox"]').first(),
    instansiDropdownValue: () => this.elements.instansiDropdown().find('[data-slot="select-value"], span').first(),
    hiddenSelect: () => this.elements.dialogContainer().find('select[aria-hidden="true"]'),
    dialogCloseBtn: () => this.elements.dialogContainer().find('button[data-slot="dialog-close"]'),
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }), // Portal (renders outside dialog)
    legalitySwitch: () => this.elements.dialogContainer().find('button[role="switch"], [data-slot="switch"], input[type="checkbox"]').first(),
    allInputs: () => this.elements.dialogContainer().find('input[data-slot="input"], input:visible'),
    fileInput: () => this.elements.dialogContainer().find('input[type="file"]'),
    saveButton: () => this.elements.dialogContainer().find('button[type="submit"]:contains("Simpan"), button[data-slot="button"]:contains("Simpan")').first(),
    closeButton: () => this.elements.dialogContainer().find('button[data-slot="dialog-close"]'),
    infoMessage: () => this.elements.dialogContainer().contains(/transparan|putih|background|tanda tangan/i),
    signatureLabel: () => this.elements.dialogContainer().contains('label, [data-slot="form-label"]', /foto tanda tangan/i),
    signatureDropzone: () => this.elements.dialogContainer().find('div[role="button"]:has(input[type="file"]), div.border-dashed'),
    signatureSelectFileBtn: () => this.elements.dialogContainer().contains('button', /pilih file/i),
    signatureUploadText: () => this.elements.dialogContainer().contains(/untuk diunggah/i),
    
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
    cy.visit('/setting/invoice/invoice-reminder', { failOnStatusCode: false });
    
    // Tunggu halaman selesai load
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    // Tutup paksa jika ada modal yang masih menggantung dari test sebelumnya
    cy.get('body').type('{esc}{esc}', { force: true });
    cy.wait(500);

    // Klik menu 'Legalitas Bukti Bayar' langsung untuk membuka modal dialog (force: true menangani state accordion closed)
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
    // Pastikan Instansi sudah dipilih jika masih placeholder "Pilih instansi terlebih dahulu"
    this.elements.instansiDropdownValue().then(($val) => {
      if ($val.text().includes('Pilih instansi terlebih dahulu')) {
        this.selectInstansi(0);
        cy.wait(800);
      }
    });

    this.elements.legalitySwitch().then(($toggle) => {
      const isChecked = 
        $toggle.attr('data-state') === 'checked' || 
        $toggle.attr('aria-checked') === 'true' || 
        $toggle.is(':checked');

      if (targetState !== isChecked) {
        cy.wrap($toggle).click({ force: true });
        cy.wait(800);
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
    // Jeda beberapa detik agar pengunggahan & state form berkas selesai sepenuhnya sebelum simpan
    cy.wait(3000);
    this.elements.dialogContainer().should('be.visible');
    cy.wait(1000);
  }

  clickSave() {
    cy.intercept('POST', '**').as('saveLegality');
    this.elements.saveButton()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    cy.wait(3000);
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
    // Menangani respons backend yang memerlukan waktu simpan lebih lama
    cy.get('.toast, [role="status"], [data-slot="toast"], [data-sonner-toast], [data-state="open"]', { timeout: 30000 })
      .should('exist')
      .invoke('text')
      .then((text) => {
        cy.log('TOAST MESSAGE MUNCUL: ' + text);
        if (text.toLowerCase().includes('kesalahan') || text.toLowerCase().includes('error')) {
           throw new Error(`[BACKEND BUG] Aplikasi mengembalikan error: ${text}`);
        }
        expect(text.toLowerCase()).to.match(/berhasil|sukses|saved|success|tersimpan/);
      });
  }

  verifyUploadErrorAlert(expectedText) {
    // 1. Memvalidasi Elemen Utama Alert Box ([data-slot="alert"][role="alert"])
    cy.get('[data-slot="alert"][role="alert"]', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible');

    // 2. Memvalidasi Judul Alert Box ([data-slot="alert-title"]) -> "Gagal mengunggah file"
    cy.get('[data-slot="alert-title"]')
      .should('be.visible')
      .and('contain.text', 'Gagal mengunggah file');

    // 3. Memvalidasi Deskripsi Pesan Error Alert Box ([data-slot="alert-description"])
    if (expectedText) {
      cy.get('[data-slot="alert-description"]')
        .should('be.visible')
        .and('contain.text', expectedText);
    }
  }

  verifyValidationError(expectedText) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-slot="alert"][role="alert"]').length > 0) {
        this.verifyUploadErrorAlert(expectedText);
      } else if (expectedText) {
        cy.contains(new RegExp(expectedText, 'i'), { timeout: 15000 })
          .first()
          .scrollIntoView()
          .should('exist');
      } else {
        cy.get('[data-slot="error"], [data-slot="alert"], p.text-destructive, p.text-red-500, [role="alert"], [data-sonner-toast]', { timeout: 15000 })
          .first()
          .scrollIntoView()
          .should('exist');
      }
    });
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
