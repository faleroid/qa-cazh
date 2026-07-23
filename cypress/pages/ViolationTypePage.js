import testData from '../fixtures/violationTypeData.json';

class ViolationTypePage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Optimized)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('button, [role="button"], a, span', /pengaturan/i, { timeout: 10000 }),
    sidebarMenuKesiswaan: () => cy.contains('button, [role="button"], a, span', /kesiswaan/i, { timeout: 10000 }),
    sidebarMenuTipePelanggaran: () => cy.contains('button, [role="button"], a, span', /tipe pelanggaran/i, { timeout: 10000 }),

    // Top Bar & Action Buttons
    addButton: () => cy.get('button[data-slot="dialog-trigger"]', { timeout: 10000 }).filter(':contains("Tambah")').first(),
    searchInput: () => cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]', { timeout: 10000 }),
    
    // Filters on List Header
    filterStatusSelect: () => cy.get('[data-slot="card-header"] [role="combobox"], [data-slot="card-header"] [data-slot="select-trigger"]').filter(':contains("Status"), :contains("Semua")').first(),
    filterInstansiSelect: () => cy.get('[data-slot="card-header"] [role="combobox"], [data-slot="card-header"] [data-slot="select-trigger"]').filter(':contains("Instansi")').last(),
    
    // Dialog Modal (Tambah / Edit)
    formModal: () => cy.get('[role="dialog"], [data-slot="dialog-content"], [data-slot="dialog"]', { timeout: 15000 }),
    modalInstansiDropdown: () => this.elements.formModal().find('[role="combobox"], [data-slot="select-trigger"]').first(),
    modalInstansiValue: () => this.elements.modalInstansiDropdown().find('span, [data-slot="select-value"]'),
    modalNamaInput: () => this.elements.formModal().find('input[name="name"], input[name="title"], input[placeholder*="Nama"], input[data-slot="input"]').first(),
    modalMinPoinInput: () => this.elements.formModal().find('input[name="min_point"], input[name="min_poin"], input[placeholder*="Min"], input[type="number"]').first(),
    modalMaxPoinInput: () => this.elements.formModal().find('input[name="max_point"], input[name="max_poin"], input[placeholder*="Max"], input[type="number"]').last(),
    modalStatusDropdown: () => this.elements.formModal().find('[role="combobox"], [data-slot="select-trigger"]').last(),
    modalSaveBtn: () => this.elements.formModal().contains('button', /simpan/i),
    modalCancelBtn: () => this.elements.formModal().contains('button', /batal|cancel/i),
    
    // Delete Confirmation Modal
    deleteModal: () => cy.get('[role="dialog"]:contains("Hapus"), [data-slot="dialog-content"]:contains("Hapus"), [role="dialog"]:contains("yakin")', { timeout: 10000 }),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().contains('button, a', /batal|cancel/i),
    deleteCloseXBtn: () => this.elements.deleteModal().find('button[data-slot="dialog-close"], button:has(svg.lucide-x)').last(),
    
    // Portal / Dropdown Options & Validation
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }),
    validationError: () => cy.get('[data-slot="form-message"], [data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"], [data-sonner-toast]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 }),
    
    // Data Table & List
    tableRows: () => cy.get('tbody tr', { timeout: 10000 }),
    tableHeaderNodes: () => cy.get('thead th'),
    emptyState: () => cy.contains(/tidak ada data|tidak ditemukan|halaman kosong/i, { timeout: 10000 }),
    rowEditBtn: () => cy.get('tbody tr', { timeout: 10000 }).first().find('button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), a:has(svg.lucide-pencil)').first(),
    rowDeleteBtn: () => cy.get('tbody tr', { timeout: 10000 }).first().find('button:has(svg.lucide-trash), a:has(svg.lucide-trash)').first(),
    
    // Pagination & Page Size
    pageSizeDropdown: () => cy.get('[role="combobox"], [data-slot="select-trigger"]').filter(':contains("10"), :contains("50"), :contains("100"), :contains("500")')
  };

  // ---------------------------------------------------------------------------
  // ACTIONS & BUSINESS LOGIC
  // ---------------------------------------------------------------------------
  visit() {
    cy.visit('/setting/student-affairs/violation-type', { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.wait(1500);
  }

  clickAddButton() {
    this.elements.addButton().scrollIntoView().click({ force: true });
  }

  clearAndType(cyElement, value) {
    if (value === undefined) return;
    cyElement.then(($input) => {
      $input[0].focus();
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call($input[0], String(value));
      $input[0].dispatchEvent(new Event('input', { bubbles: true }));
      $input[0].dispatchEvent(new Event('change', { bubbles: true }));
      $input[0].dispatchEvent(new Event('blur', { bubbles: true }));
    });
  }

  fillModalForm({ instansiIndex, nama, minPoin, maxPoin, statusIndex, statusText }) {
    if (instansiIndex !== undefined) {
      this.elements.modalInstansiDropdown().click({ force: true });
      cy.wait(500);
      this.elements.selectOptions().eq(instansiIndex).click({ force: true });
      cy.wait(500);
    }
    if (nama !== undefined) {
      this.clearAndType(this.elements.modalNamaInput(), nama);
    }
    if (minPoin !== undefined) {
      this.clearAndType(this.elements.modalMinPoinInput(), minPoin);
    }
    if (maxPoin !== undefined) {
      this.clearAndType(this.elements.modalMaxPoinInput(), maxPoin);
    }
    if (statusText !== undefined) {
      this.elements.modalStatusDropdown().click({ force: true });
      cy.wait(300);
      this.elements.selectOptions().contains(new RegExp(statusText, 'i')).click({ force: true });
    } else if (statusIndex !== undefined) {
      this.elements.modalStatusDropdown().click({ force: true });
      cy.wait(300);
      this.elements.selectOptions().eq(statusIndex).click({ force: true });
    }
  }

  saveForm() {
    this.elements.modalSaveBtn().scrollIntoView().click({ force: true });
    cy.wait(1500);
  }

  cancelForm() {
    this.elements.modalCancelBtn().scrollIntoView().click({ force: true });
  }

  search(keyword) {
    if (keyword === '') {
      this.elements.searchInput().clear({ force: true });
    } else {
      this.elements.searchInput().clear({ force: true }).type(keyword, { force: true });
    }
  }

  changePageSize(size) {
    this.elements.pageSizeDropdown().click({ force: true });
    this.elements.selectOptions().contains(String(size)).click({ force: true });
  }

  clickEditFirstRow() {
    cy.get('tbody tr', { timeout: 10000 }).should('be.visible').and('have.length.at.least', 1);
    cy.wait(1500);
    cy.get('tbody tr', { timeout: 10000 })
      .first()
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)')
      .first()
      .click();
    this.elements.formModal().should('be.visible');
  }

  clickDeleteFirstRow() {
    cy.get('tbody tr', { timeout: 10000 }).should('be.visible').and('have.length.at.least', 1);
    cy.wait(1500);
    cy.get('tbody tr', { timeout: 10000 })
      .first()
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-trash), button:has(svg.lucide-trash)')
      .first()
      .click();
    this.elements.deleteModal().should('be.visible');
  }

  confirmDelete() {
    this.elements.deleteConfirmBtn().click({ force: true });
  }

  cancelDelete() {
    this.elements.deleteCancelBtn().click({ force: true });
  }

  cancelDeleteByX() {
    this.elements.deleteCloseXBtn().click({ force: true });
  }

  verifyValidationError(expectedText) {
    if (expectedText) {
      cy.contains(new RegExp(expectedText, 'i'), { timeout: 15000 }).scrollIntoView().should('exist');
    } else {
      this.elements.validationError().scrollIntoView().should('exist');
    }
  }

  ensureDataExists() {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0 || $body.text().match(/tidak ada data/i)) {
        cy.log('Tabel kosong. Membuat data dummy otomatis...');
        const setupName = `Default Data ${Date.now()}`;
        this.clickAddButton();
        this.fillModalForm({
          instansiIndex: 0,
          nama: setupName,
          minPoin: '990',
          maxPoin: '999'
        });
        this.saveForm();
        this.elements.formModal().should('not.exist');
        cy.wait(1500);
      }
    });
  }
}

export default new ViolationTypePage();
