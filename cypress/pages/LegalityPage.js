class LegalityPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Optimized for Dialog Modal)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('button, [role="button"], a, span', /pengaturan/i, { timeout: 10000 }),
    sidebarMenuTagihan: () => cy.contains('button, [role="button"], a, span', /tagihan/i, { timeout: 10000 }),
    sidebarMenuLegalitas: () => cy.contains('button, [role="button"], a, span', /legalitas bukti bayar/i, { timeout: 10000 }),
    
    // Dialog / Modal Container (Stable Radix Selector)
    dialogContainer: () => cy.get('[role="dialog"][data-state="open"], [data-slot="dialog"]', { timeout: 10000 }),
    
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
    // Kita gunakan rute dasar aplikasi untuk memicu layout sidebar
    cy.visit('/', { failOnStatusCode: false });
    
    // Tunggu sidebar load
    cy.get('aside, nav', { timeout: 10000 }).should('be.visible');

    // 1. Expand 'Pengaturan' accordion
    this.elements.sidebarMenuPengaturan().click({ force: true });
    
    // 2. Expand 'Tagihan' accordion
    this.elements.sidebarMenuTagihan().click({ force: true });
    
    // 3. Klik menu 'Legalitas Bukti Bayar' untuk membuka modal
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
    this.elements.allInputs().then(($inputs) => {
      if ($inputs.length >= 3) {
        if (pengesahan !== undefined) cy.wrap($inputs[0]).clear({ force: true }).type(pengesahan || ' ', { force: true });
        if (jabatan !== undefined) cy.wrap($inputs[1]).clear({ force: true }).type(jabatan || ' ', { force: true });
        if (namaTerang !== undefined) cy.wrap($inputs[2]).clear({ force: true }).type(namaTerang || ' ', { force: true });
      }
    });
  }

  uploadSignature(filePath) {
    this.elements.fileInput().selectFile(filePath, { force: true });
  }

  clickSave() {
    cy.intercept('POST', '**').as('saveLegality');
    this.elements.saveButton().click({ force: true });
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
    cy.contains(/berhasil|sukses|saved|success/i, { timeout: 10000 }).should('be.visible');
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
