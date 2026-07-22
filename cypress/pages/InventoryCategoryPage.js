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
    // Filter
    filterInstansiSelect: () => cy.get('[data-slot="card-header"] [role="combobox"], [data-slot="card-header"] [data-slot="select-trigger"]').first(),
    filterClearBtnInList: () => cy.get('[data-slot="card-header"] [data-slot="badge"] button:has(svg.lucide-x)'),
    
    // Dialog Modal (Tambah / Edit)
    formModal: () => cy.get('[role="dialog"], [data-slot="dialog"]', { timeout: 10000 }),
    modalInstansiDropdown: () => this.elements.formModal().find('[role="combobox"], [data-slot="select-trigger"]'),
    modalInstansiValue: () => this.elements.modalInstansiDropdown().find('span, [data-slot="select-value"]'),
    modalNamaInput: () => this.elements.formModal().find('input[data-slot="input"], input:not([type="hidden"]), input[placeholder*="Contoh"], input[placeholder*="Example"]').last(),
    modalSaveBtn: () => this.elements.formModal().contains('button', /simpan/i),
    modalCancelBtn: () => this.elements.formModal().contains('button', /batal|cancel/i),
    
    // Delete Modal
    deleteModal: () => cy.get('[role="dialog"]:contains("Apakah anda yakin menghapus"), [data-slot="dialog-content"]:contains("Apakah anda yakin menghapus")', { timeout: 10000 }),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().contains('button, a', /batal|cancel/i),
    deleteCloseXBtn: () => this.elements.deleteModal().find('button[data-slot="dialog-close"], button:has(svg.lucide-x)').last(),
    
    // Shared / Global components
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }),
    loadingAnimation: () => cy.contains(/tunggu sesaat|loading/i, { timeout: 10000 }),
    validationError: () => cy.get('[data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"], [data-slot="form-message"]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 }),
    
    // Data Table
    tableRows: () => cy.get('tbody tr', { timeout: 10000 }),
    tableHeaderNodes: () => cy.get('thead th'),
    emptyState: () => cy.contains(/data inventaris tidak ditemukan/i, { timeout: 10000 }),
    rowEditBtn: () => this.elements.tableRows().find('button:has(svg.lucide-square-pen), a:has(svg.lucide-square-pen)').first(),
    rowDeleteBtn: () => this.elements.tableRows().find('button:has(svg.lucide-trash), a:has(svg.lucide-trash)').first(),
    
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
    // Tambahkan wait sejenak agar React benar-benar siap dan nge-bind semua fungsi onClick
    cy.wait(1500);
  }

  clickAddButton() {
    // Hindari force: true agar Cypress menunggu jika tombol masih dilindungi efek loading
    this.elements.addButton().click();
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



  clickEditFirstRow() {
    this.elements.rowEditBtn().click();
  }

  clickDeleteFirstRow() {
    this.elements.rowDeleteBtn().click();
  }

  confirmDelete() {
    this.elements.deleteConfirmBtn().click({ force: true });
  }

  cancelDeleteByX() {
    this.elements.deleteCloseXBtn().click({ force: true });
  }

  ensureDataExists() {
    // Cek apakah tabel kosong berdasarkan empty state atau jumlah TR
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0 || $body.text().match(/data inventaris tidak ditemukan/i)) {
        cy.log('Table is empty. Auto-creating dummy data for testing...');
        this.clickAddButton();
        this.fillModalForm({ instansiIndex: 0, namaKategori: 'Data Dummy Otomatis' });
        this.saveForm();
        this.elements.formModal().should('not.exist');
        cy.wait(2000); // Tunggu data muncul di tabel
      }
    });
  }
}

export default new InventoryCategoryPage();
