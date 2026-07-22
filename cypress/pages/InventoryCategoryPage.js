class InventoryCategoryPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Optimized)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('button, [role="button"], a, span', /pengaturan/i, { timeout: 10000 }),
    sidebarMenuInventaris: () => cy.contains('button, [role="button"], a, span', /inventaris/i, { timeout: 10000 }),
    sidebarMenuKategori: () => cy.contains('button, [role="button"], a, span', /kategori inventaris/i, { timeout: 10000 }),

    // Top Bar & Actions
    addButton: () => cy.contains('button, a', /tambah kategori/i, { timeout: 10000 }),
    searchInput: () => cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]', { timeout: 10000 }),
    filterButton: () => cy.contains('button', /filter/i, { timeout: 10000 }),
    
    // Filter Dropdown Portal
    filterDropdown: () => cy.get('[data-slot="popover-content"], [role="dialog"]').filter(':contains("Terapkan"), :contains("Bersihkan")'),
    filterInstansiSelect: () => this.elements.filterDropdown().find('[role="combobox"], [data-slot="select-trigger"]'),
    filterApplyButton: () => this.elements.filterDropdown().contains('button', /terapkan/i),
    filterClearBtnInList: () => cy.contains('button', /bersihkan/i),
    
    // Dialog Modal (Tambah / Edit)
    formModal: () => cy.get('[role="dialog"][data-state="open"], [data-slot="dialog"]', { timeout: 10000 }).filter(':contains("Simpan")'),
    modalInstansiDropdown: () => this.elements.formModal().find('[role="combobox"], [data-slot="select-trigger"]'),
    modalInstansiValue: () => this.elements.modalInstansiDropdown().find('span, [data-slot="select-value"]'),
    modalNamaInput: () => this.elements.formModal().find('input[data-slot="input"], input:not([type="hidden"]), input[placeholder*="Contoh"], input[placeholder*="Example"]').last(),
    modalSaveBtn: () => this.elements.formModal().contains('button', /simpan/i),
    modalCancelBtn: () => this.elements.formModal().contains('button', /batal|cancel/i),
    
    // Dialog Delete
    deleteModal: () => cy.get('[role="dialog"][data-state="open"], [data-slot="dialog"]').filter(':contains("Hapus"), :contains("Delete")'),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().find('button[aria-label="Close"], [data-slot="dialog-close"]'),
    
    // Shared / Global components
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }),
    loadingAnimation: () => cy.contains(/tunggu sesaat|loading/i, { timeout: 10000 }),
    validationError: () => cy.get('[data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"]'),
    
    // Data Table
    tableRows: () => cy.get('tbody tr', { timeout: 10000 }),
    tableHeaderNodes: () => cy.get('thead th'),
    emptyState: () => cy.contains(/tidak ada data yang ditemukan/i, { timeout: 10000 }),
    rowEditBtn: () => this.elements.tableRows().find('button:has(svg), a').filter('[title*="Edit"], [aria-label*="Edit"]').first(),
    rowDeleteBtn: () => this.elements.tableRows().find('button:has(svg), a').filter('[title*="Hapus"], [aria-label*="Hapus"], [title*="Delete"]').first(),
    
    // Pagination & Sorting
    pageSizeDropdown: () => cy.get('[role="combobox"], [data-slot="select-trigger"]').filter(':contains("10"), :contains("50"), :contains("100"), :contains("500")'),
    sortArrowBtn: (columnName) => cy.contains('th', new RegExp(columnName, 'i')).find('button, svg').first()
  };

  // ---------------------------------------------------------------------------
  // ACTIONS
  // ---------------------------------------------------------------------------
  visit() {
    // Navigate directly to the page. We have set a global viewport and timeout in cypress.config.js to prevent hangs.
    cy.visit('/setting/inventory', { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  }

  clickAddButton() {
    this.elements.addButton().click({ force: true });
  }

  fillModalForm({ instansiIndex, namaKategori }) {
    if (instansiIndex !== undefined) {
      this.elements.modalInstansiDropdown().click({ force: true });
      this.elements.selectOptions().eq(instansiIndex).click({ force: true });
    }
    if (namaKategori !== undefined) {
      if (namaKategori === '') {
        this.elements.modalNamaInput().clear({ force: true });
      } else {
        this.elements.modalNamaInput().clear({ force: true }).type(namaKategori, { force: true });
      }
    }
  }

  saveForm() {
    this.elements.modalSaveBtn().click({ force: true });
  }

  cancelForm() {
    this.elements.modalCancelBtn().click({ force: true });
  }

  search(keyword) {
    this.elements.searchInput().clear({ force: true }).type(keyword, { force: true });
  }

  changePageSize(size) {
    this.elements.pageSizeDropdown().click({ force: true });
    this.elements.selectOptions().contains(String(size)).click({ force: true });
  }

  clickFilterButton() {
    this.elements.filterButton().click({ force: true });
  }

  applyFilter(instansiIndex) {
    if (instansiIndex !== undefined) {
      this.elements.filterInstansiSelect().click({ force: true });
      this.elements.selectOptions().eq(instansiIndex).click({ force: true });
    }
    this.elements.filterApplyButton().click({ force: true });
  }

  clickEditFirstRow() {
    this.elements.rowEditBtn().click({ force: true });
  }

  clickDeleteFirstRow() {
    this.elements.rowDeleteBtn().click({ force: true });
  }

  confirmDelete() {
    this.elements.deleteConfirmBtn().click({ force: true });
  }

  cancelDeleteByX() {
    this.elements.deleteCancelBtn().click({ force: true });
  }
}

export default new InventoryCategoryPage();
