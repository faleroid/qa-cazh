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
    // Dialog Modal (Tambah / Edit)
    formModal: () => cy.get('[role="dialog"], [data-slot="dialog-content"], [data-slot="dialog"]', { timeout: 15000 }),
    modalInstansiDropdown: () => this.elements.formModal().find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], [role="combobox"], [data-slot="select-trigger"]').first(),
    modalInstansiValue: () => this.elements.modalInstansiDropdown().find('span, [data-slot="select-value"]'),
    modalNamaInput: () => this.elements.formModal().find('input[name="name"], input[name="title"], input[placeholder*="Nama"], input[data-slot="input"]').first(),
    modalMinPoinInput: () => this.elements.formModal().find('input[name="min_point"], input[name="min_poin"], input[placeholder*="Min"], input[type="number"]').first(),
    modalMaxPoinInput: () => this.elements.formModal().find('input[name="max_point"], input[name="max_poin"], input[placeholder*="Max"], input[type="number"]').last(),
    modalStatusDropdown: () => this.elements.formModal().find('[data-slot="form-item"]:contains("Status") [role="combobox"], [data-slot="form-item"]:contains("Status") [data-slot="select-trigger"], [role="combobox"], [data-slot="select-trigger"]').last(),
    modalSaveBtn: () => this.elements.formModal().contains('button', /simpan/i),
    modalCancelBtn: () => this.elements.formModal().contains('button', /batal|cancel/i),
    
    // Delete Confirmation Modal
    deleteModal: () => cy.get('[role="dialog"]:contains("Hapus"), [data-slot="dialog-content"]:contains("Hapus"), [role="dialog"]:contains("yakin")', { timeout: 10000 }),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().contains('button, a', /batal|cancel/i),
    deleteCloseXBtn: () => this.elements.deleteModal().find('button[data-slot="dialog-close"], button:has(svg.lucide-x)').last(),
    
    // Portal / Dropdown Options & Validation
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"], [data-radix-collection-item], div[class*="select-item"]', { timeout: 15000 }),
    validationError: () => cy.get('[data-slot="form-message"], [data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"], [data-sonner-toast]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 }),
    
    // Data Table & List
    tableRows: () => cy.get('tbody tr', { timeout: 10000 }),
    tableHeaderNodes: () => cy.get('thead th'),
    emptyState: () => cy.contains('td, div, p, h3', /tidak ada data|tidak ditemukan|no data/i, { timeout: 10000 }),
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
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.get('body').then(($body) => {
      if ($body.text().includes('Peran Belum Ditetapkan') || $body.text().includes('Hubungi admin')) {
        cy.log('Terdeteksi halaman Peran Belum Ditetapkan. Memulihkan sesi login...');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        cy.visit('/setting/student-affairs/violation-type', { failOnStatusCode: false, timeout: 30000 });
        cy.get('body', { timeout: 15000 }).should('be.visible');
      }
    });
    cy.get('tbody', { timeout: 15000 }).should('exist');
    cy.wait(2500);
  }

  clickAddButton() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.wait(1000);
      }
    });
    this.elements.addButton().scrollIntoView().click({ force: true });
    cy.wait(1000);
    this.elements.formModal().should('be.visible');
  }

  clearAndType(cyElement, value) {
    if (value === undefined) return;
    cyElement.scrollIntoView().focus();
    cy.wait(200);
    cyElement.clear({ force: true });
    if (value !== '') {
      cyElement.type(value, { force: true });
    }
    cy.wait(300);
  }

  fillModalForm({ instansiIndex, instansiText, nama, minPoin, maxPoin, statusIndex, statusText }) {
    const triggerInstansiClick = () => {
      this.elements.modalInstansiDropdown().scrollIntoView();
      cy.wait(300);
      this.elements.modalInstansiDropdown().click({ force: true });
      cy.wait(800);
      cy.get('body').then(($body) => {
        if ($body.find('[role="option"], [data-slot="select-item"], [data-radix-collection-item]').length === 0) {
          cy.log('Portal instansi belum muncul, klik ulang trigger...');
          this.elements.modalInstansiDropdown().click({ force: true });
          cy.wait(800);
        }
      });
    };

    const targetInstansi = instansiText || 'Academy QA Engineer';
    if (instansiText !== undefined || instansiIndex !== undefined) {
      triggerInstansiClick();
      cy.get('[role="option"], [data-slot="select-item"], [data-radix-collection-item]', { timeout: 10000 })
        .contains(new RegExp(targetInstansi, 'i'))
        .click({ force: true });
      cy.wait(800);
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
      this.elements.modalStatusDropdown().scrollIntoView().click({ force: true });
      cy.wait(800);
      cy.get('[role="option"], [data-slot="select-item"], [data-radix-collection-item]', { timeout: 10000 })
        .contains(new RegExp(statusText, 'i'))
        .click({ force: true });
      cy.wait(800);
    } else if (statusIndex !== undefined) {
      this.elements.modalStatusDropdown().scrollIntoView().click({ force: true });
      cy.wait(800);
      cy.get('[role="option"], [data-slot="select-item"], [data-radix-collection-item]', { timeout: 10000 })
        .eq(statusIndex)
        .click({ force: true });
      cy.wait(800);
    }
  }

  saveForm() {
    cy.wait(1000);
    this.elements.modalSaveBtn().scrollIntoView().click({ force: true });
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"], [data-slot="dialog-content"]').length > 0 && $body.find('[data-slot="form-message"], p.text-destructive, p.text-red-500').length === 0) {
        const saveBtn = $body.find('button[type="submit"], button:contains("Simpan")');
        if (saveBtn.length > 0) {
          cy.log('Modal masih terbuka tanpa error, mencoba klik Simpan kembali...');
          cy.wrap(saveBtn.first()).click({ force: true });
          cy.wait(2000);
        }
      }
    });
  }

  cancelForm() {
    this.elements.modalCancelBtn().scrollIntoView().click({ force: true });
    cy.wait(800);
  }

  search(keyword) {
    if (keyword === '') {
      this.elements.searchInput().clear({ force: true });
    } else {
      this.elements.searchInput().clear({ force: true }).type(keyword, { force: true });
    }
    cy.wait(2000);
  }

  changePageSize(size) {
    this.elements.pageSizeDropdown().click({ force: true });
    cy.wait(500);
    this.elements.selectOptions().contains(String(size)).click({ force: true });
    cy.wait(1000);
  }

  clickEditFirstRow() {
    this.ensureDataExists();
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.wait(1000);
      }
    });
    cy.get('tbody tr', { timeout: 15000 }).should('be.visible').and('have.length.at.least', 1);
    cy.wait(1000);

    const tryClickEdit = () => {
      cy.get('tbody tr', { timeout: 10000 }).first().then(($row) => {
        const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), button:has(svg[class*="pen"]), button:has(svg[class*="pencil"])');
        if (editBtn.length > 0) {
          cy.wrap(editBtn.first()).scrollIntoView();
          cy.wait(500);
          cy.wrap(editBtn.first()).click({ force: true });
        } else {
          cy.wrap($row).find('button').first().click({ force: true });
        }
      });
    };

    tryClickEdit();
    cy.wait(1500);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"], [data-slot="dialog-content"]').length === 0) {
        cy.log('Modal edit belum terbuka, mencoba klik ulang...');
        tryClickEdit();
        cy.wait(1500);
      }
    });

    this.elements.formModal({ timeout: 15000 }).should('be.visible');
  }

  clickDeleteFirstRow() {
    this.ensureDataExists();
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.wait(1000);
      }
    });
    cy.get('tbody tr', { timeout: 15000 }).should('be.visible').and('have.length.at.least', 1);
    cy.wait(1000);

    const tryClickDelete = () => {
      cy.get('tbody tr', { timeout: 10000 }).first().then(($row) => {
        const deleteBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-trash), button:has(svg.lucide-trash), button:has(svg.lucide-trash-2), button:has(svg[class*="trash"])');
        if (deleteBtn.length > 0) {
          cy.wrap(deleteBtn.first()).scrollIntoView();
          cy.wait(500);
          cy.wrap(deleteBtn.first()).click({ force: true });
        }
      });
    };

    tryClickDelete();
    cy.wait(1500);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"], [data-slot="dialog-content"]').length === 0) {
        cy.log('Modal delete belum terbuka, mencoba klik ulang...');
        tryClickDelete();
        cy.wait(1500);
      }
    });

    this.elements.deleteModal({ timeout: 15000 }).should('be.visible');
  }

  confirmDelete() {
    cy.wait(1000);
    this.elements.deleteConfirmBtn().click({ force: true });
    cy.wait(2500);
  }

  cancelDelete() {
    this.elements.deleteCancelBtn().click({ force: true });
    cy.wait(800);
  }

  cancelDeleteByX() {
    this.elements.deleteCloseXBtn().click({ force: true });
    cy.wait(800);
  }

  verifyValidationError(expectedText) {
    if (expectedText) {
      cy.contains(new RegExp(expectedText, 'i'), { timeout: 15000 }).first().scrollIntoView().should('exist');
    } else {
      this.elements.validationError().first().scrollIntoView().should('exist');
    }
  }

  ensureDataExists() {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0 || $body.text().match(/tidak ada data/i)) {
        cy.log('Tabel kosong. Membuat data dummy otomatis...');
        const setupName = 'Keterlambatan Masuk Sekolah';
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

  ensureInactiveDataExists() {
    this.ensureDataExists();
    cy.get('body').then(($body) => {
      if (!$body.text().match(/tidak aktif/i)) {
        cy.log('Tidak ada data Tidak Aktif. Mengubah status baris pertama menjadi Tidak Aktif...');
        this.clickEditFirstRow();
        this.fillModalForm({ statusText: 'Tidak Aktif' });
        this.saveForm();
        this.elements.formModal().should('not.exist');
        cy.wait(1500);
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

export default new ViolationTypePage();
