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
    deleteModal: () => cy.get('[role="dialog"]:contains("Apakah anda yakin menghapus"), [data-slot="dialog-content"]:contains("Apakah anda yakin menghapus"), [role="dialog"]:contains("yakin"), [data-slot="dialog-content"]:contains("yakin")', { timeout: 10000 }),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().contains('button, a', /batal|cancel/i),
    deleteCloseXBtn: () => this.elements.deleteModal().find('button[data-slot="dialog-close"], button:has(svg.lucide-x)').last(),
    
    // Shared / Global components
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 }),
    loadingAnimation: () => cy.contains(/tunggu sesaat|loading/i, { timeout: 10000 }),
    validationError: () => cy.get('[data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"], [data-slot="form-message"]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 }),
    
    // Data Table
    tableRows: () => cy.get('tbody tr:has(button:has(svg.lucide-trash))', { timeout: 10000 }),
    tableHeaderNodes: () => cy.get('thead th'),
    emptyState: () => cy.contains('h3, td', /data inventaris tidak ditemukan|tidak ada data/i, { timeout: 10000 }),
    rowEditBtn: () => this.elements.tableRows().find('button:has(svg.lucide-square-pen), a:has(svg.lucide-square-pen)').first(),
    rowDeleteBtn: () => this.elements.tableRows().find('button:has(svg.lucide-trash), a:has(svg.lucide-trash)').first(),
    
    // Pagination & Sorting
    pageSizeDropdown: () => cy.get('[role="combobox"], [data-slot="select-trigger"]').filter(':contains("10"), :contains("50"), :contains("100"), :contains("500")'),
    sortArrowBtn: (columnName) => cy.contains('th', new RegExp(columnName, 'i')).find('button, svg').first()
  };

  // ---------------------------------------------------------------------------
  // ACTIONS (Balanced Pacing & Rate Limit Protected)
  // ---------------------------------------------------------------------------
  visit() {
    cy.visit('/setting/inventory', { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.wait(2000);
  }

  clickAddButton() {
    this.elements.addButton().click({ force: true });
    cy.wait(1000);
  }

  fillModalForm({ instansiIndex, namaKategori }) {
    if (instansiIndex !== undefined) {
      this.elements.modalInstansiDropdown().click({ force: true });
      cy.wait(500);
      this.elements.selectOptions().eq(instansiIndex).click({ force: true });
      cy.wait(500);
    }
    if (namaKategori !== undefined) {
      if (namaKategori === '') {
        this.elements.modalNamaInput().clear({ force: true });
      } else {
        this.elements.modalNamaInput().clear({ force: true }).type(namaKategori, { force: true });
      }
      cy.wait(500);
    }
  }

  saveForm() {
    this.elements.modalSaveBtn().click({ force: true });
    cy.wait(2000);
  }

  cancelForm() {
    this.elements.modalCancelBtn().click({ force: true });
    cy.wait(1000);
  }

  search(keyword) {
    this.elements.searchInput().clear({ force: true }).type(keyword, { force: true });
    cy.wait(1500);
  }

  changePageSize(size) {
    this.elements.pageSizeDropdown().click({ force: true });
    cy.wait(500);
    this.elements.selectOptions().contains(String(size)).click({ force: true });
    cy.wait(1500);
  }

  clickEditFirstRow() {
    this.elements.rowEditBtn().click({ force: true });
    cy.wait(1000);
  }

  clickDeleteFirstRow() {
    this.elements.rowDeleteBtn().click({ force: true });
    cy.wait(1000);
  }

  confirmDelete() {
    this.elements.deleteConfirmBtn().click({ force: true });
    cy.wait(2500);
  }

  cancelDeleteByX() {
    this.elements.deleteCloseXBtn().click({ force: true });
    cy.wait(1000);
  }

  ensureDataExists() {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr button:has(svg.lucide-trash)').length === 0 || $body.text().match(/data inventaris tidak ditemukan/i)) {
        cy.log('Table is empty. Auto-creating dummy data for testing...');
        this.clickAddButton();
        this.fillModalForm({ instansiIndex: 0, namaKategori: 'Meja & Kursi Siswa' });
        this.saveForm();
        this.elements.formModal().should('not.exist');
        cy.wait(2500);
      }
    });
  }

  deleteAllDataIfExists() {
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    const deleteRowIfDataExists = (retryCount = 0) => {
      if (retryCount > 15) return;
      cy.get('body').then(($body) => {
        if ($body.find('[role="dialog"]').length > 0) {
          cy.wait(1200);
        }
        const trashBtns = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button[data-slot="dialog-trigger"]:has(svg.lucide-trash), tbody tr button:has(svg.lucide-trash-2)');
        if (trashBtns.length > 0) {
          cy.wrap(trashBtns.first()).scrollIntoView();
          cy.wait(500);
          cy.wrap(trashBtns.first()).click({ force: true });
          cy.wait(1200);
          this.elements.deleteModal({ timeout: 10000 }).should('be.visible');
          this.confirmDelete();
          this.elements.deleteModal().should('not.exist');
          cy.wait(2500);
          deleteRowIfDataExists(retryCount + 1);
        }
      });
    };
    deleteRowIfDataExists();
  }
}

export default new InventoryCategoryPage();
