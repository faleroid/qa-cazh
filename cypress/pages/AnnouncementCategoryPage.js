import testData from '../fixtures/announcementCategoryData.json';

class AnnouncementCategoryPage {
  // ---------------------------------------------------------------------------
  // ELEMENT SELECTORS (Radix / shadcn UI Dialog & Table Optimized)
  // ---------------------------------------------------------------------------
  elements = {
    // Sidebar Navigation Elements
    sidebarMenuPengaturan: () => cy.contains('button, [role="button"], a, span', /pengaturan/i, { timeout: 10000 }),
    sidebarMenuAdministrasi: () => cy.contains('button, [role="button"], a, span', /administrasi/i, { timeout: 10000 }),
    sidebarMenuKategoriPengumuman: () => cy.contains('button, [role="button"], a, span', /kategori pengumuman/i, { timeout: 10000 }),

    // Page Title & Header
    pageTitle: () => cy.get('h1, h2, h3, header, [data-slot="page-title"], [data-slot="dialog-title"], [data-slot="card-title"]', { timeout: 10000 }),
    addButton: () => cy.contains('button, a', /tambah|tambah kategori/i, { timeout: 10000 }),

    // Dialog Modal (Tambah / Edit Form)
    formModal: () => cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }),
    modalTitle: () => this.elements.formModal().find('[data-slot="dialog-title"], h2'),
    modalNamaInput: () => this.elements.formModal().find('input[name="name"], input[placeholder="Nama Kategori"], input[data-slot="form-control"]').first(),
    modalStatusDropdown: () => this.elements.formModal().find('button[role="combobox"], button:has(span[data-slot="select-value"])').first(),
    modalSaveBtn: () => this.elements.formModal().find('button[type="submit"], button:contains("Simpan")').first(),
    modalCancelBtn: () => this.elements.formModal().find('button[data-slot="dialog-close"]:contains("Batal"), button:contains("Batal")').first(),
    modalCloseXBtn: () => this.elements.formModal().find('button[data-slot="dialog-close"]:has(svg.lucide-x), button:has(svg.lucide-x)').first(),
    backButton: () => cy.contains('button, a', /kembali|batal/i, { timeout: 10000 }),

    // Search & Filters on List Page (Outside Dialog)
    searchInput: () => cy.get('input[placeholder*="Cari"], input[placeholder*="Search"], input[type="search"]').first(),
    filterStatusSelect: () => cy.get('[data-slot="card-header"] [role="combobox"], [data-slot="card-header"] [data-slot="select-trigger"], [role="combobox"]').filter(':contains("Status"), :contains("Semua")').first(),

    // Delete Confirmation Modal
    deleteModal: () => cy.get('[role="dialog"]:contains("Hapus"), [data-slot="dialog-content"]:contains("Hapus"), [role="dialog"]:contains("kategori"), [data-slot="dialog-content"]:contains("Apakah Anda yakin")', { timeout: 10000 }),
    deleteConfirmBtn: () => this.elements.deleteModal().contains('button', /ya, hapus|hapus|delete/i),
    deleteCancelBtn: () => this.elements.deleteModal().contains('button, a', /batal|cancel/i),
    deleteMessage: () => this.elements.deleteModal().find('p, [data-slot="dialog-description"], div'),

    // Options & Portals (Focused strictly inside Radix Select Content portal)
    selectOptionsContainer: () => cy.get('[data-slot="select-content"], [role="listbox"]', { timeout: 15000 }),
    selectOptions: () => cy.get('[data-slot="select-content"], [role="listbox"]', { timeout: 15000 }).find('[role="option"], [data-slot="select-item"]', { timeout: 15000 }),
    validationError: () => cy.get('[data-slot="form-message"], [data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 }),

    // Data Table
    tableHeaderNodes: () => cy.get('thead th'),
    tableRows: () => cy.get('tbody tr', { timeout: 10000 }),
    emptyState: () => cy.contains('h3, td, div, p, span', /belum ada kategori|kategori tidak ditemukan|tidak ada data|kosong|no data/i, { timeout: 10000 }),
    rowEditBtn: (index = 0) => cy.get('tbody tr').eq(index).find('button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), a:has(svg.lucide-pencil), button:contains("Edit"), a:contains("Edit")').first(),
    rowDeleteBtn: (index = 0) => cy.get('tbody tr').eq(index).find('button:has(svg.lucide-trash), a:has(svg.lucide-trash), button:contains("Hapus"), a:contains("Hapus")').first(),
    rowStatusBadge: (index = 0) => cy.get('tbody tr').eq(index).find('[data-slot="badge"], span.badge, td:nth-child(2)'),

    // Pagination
    pageSizeDropdown: () => cy.get('[role="combobox"], [data-slot="select-trigger"]').filter(':contains("10"), :contains("50"), :contains("100"), :contains("500")'),

    // Announcement Create/Edit Form (Usage Check)
    announcementCategoryDropdown: () => cy.contains('button[role="combobox"], [data-slot="select-trigger"], [role="combobox"]', /pilih kategori|kategori/i, { timeout: 15000 }).first()
  };

  // ---------------------------------------------------------------------------
  // ACTIONS & BUSINESS LOGIC
  // ---------------------------------------------------------------------------
  visitList() {
    cy.visit(testData.urls.announcementCategoryPage, { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    // Dynamic recovery if user is unauthenticated or on error page
    cy.get('body').then(($body) => {
      if ($body.text().includes('Peran Belum Ditetapkan') || $body.text().includes('Hubungi admin') || $body.find('input[type="email"]').length > 0) {
        cy.log('Memulihkan sesi login...');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        cy.visit(testData.urls.announcementCategoryPage, { failOnStatusCode: false, timeout: 30000 });
        cy.get('body', { timeout: 15000 }).should('be.visible');
      }
    });
  }

  clickAddButton() {
    this.elements.addButton().click({ force: true });
    this.elements.formModal().should('be.visible');
    cy.wait(1000);
  }

  clickBackButton() {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        this.elements.modalCancelBtn().click({ force: true });
      } else {
        this.elements.backButton().click({ force: true });
      }
    });
    cy.wait(1200);
  }

  fillForm({ namaKategori, status }) {
    if (namaKategori !== undefined) {
      this.elements.modalNamaInput().then(($input) => {
        if (namaKategori === '') {
          cy.wrap($input).clear({ force: true });
        } else {
          cy.wrap($input).clear({ force: true }).type(namaKategori, { force: true, delay: 50 });
        }
      });
      cy.wait(800);
    }

    if (status !== undefined) {
      cy.get('body').then(($body) => {
        const modalEl = $body.find('[role="dialog"]');
        const comboboxBtn = modalEl.find('button[role="combobox"], button:has(span[data-slot="select-value"])');
        if (comboboxBtn.length > 0) {
          cy.wrap(comboboxBtn.first()).click({ force: true });
          cy.wait(800);

          const isNonActive = status.toLowerCase().includes('tidak') || status.toLowerCase().includes('non');
          const targetRegex = isNonActive ? /tidak aktif|nonaktif/i : /^aktif$/i;

          cy.get('[data-slot="select-content"], [role="listbox"]', { timeout: 10000 })
            .find('[role="option"], [data-slot="select-item"]')
            .contains(targetRegex)
            .click({ force: true });
          cy.wait(800);
        } else {
          cy.log(`Field Status tidak ada pada modal form ini (status default ${status}).`);
        }
      });
    }
  }

  saveForm() {
    this.elements.modalSaveBtn().click({ force: true });
    cy.wait(2000);
  }

  search(keyword) {
    if (keyword === '') {
      this.elements.searchInput().clear({ force: true });
    } else {
      this.elements.searchInput().clear({ force: true }).type(keyword, { force: true, delay: 50 });
    }
    cy.wait(1500);
  }

  filterStatus(statusText) {
    this.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);
    const isNonActive = statusText.toLowerCase().includes('tidak') || statusText.toLowerCase().includes('non');
    const targetRegex = isNonActive ? /tidak aktif|nonaktif/i : /^aktif$/i;
    this.elements.selectOptions().contains(targetRegex).click({ force: true });
    cy.wait(1500);
  }

  changePageSize(size) {
    this.elements.pageSizeDropdown().click({ force: true });
    cy.wait(800);
    this.elements.selectOptions().contains(String(size)).click({ force: true });
    cy.wait(1500);
  }

  clickEditRow(index = 0) {
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.gt', 0);
    cy.get('tbody tr', { timeout: 15000 })
      .eq(index)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), button:contains("Edit")')
      .first()
      .click({ force: true });
    this.elements.formModal().should('be.visible');
    cy.wait(1000);
  }

  clickDeleteRow(index = 0) {
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.gt', 0);
    cy.get('tbody tr', { timeout: 15000 })
      .eq(index)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-trash), button:has(svg.lucide-trash), button:contains("Hapus")')
      .first()
      .click({ force: true });
    this.elements.formModal().should('be.visible');
    cy.wait(1000);
  }

  confirmDelete() {
    this.elements.deleteConfirmBtn().click({ force: true });
    cy.wait(2500);
  }

  cancelDelete() {
    this.elements.deleteCancelBtn().click({ force: true });
    cy.wait(1000);
  }

  pressEscKey() {
    cy.get('body').type('{esc}', { force: true });
    cy.wait(800);
  }

  deleteCategoryIfExists(categoryName) {
    this.search(categoryName);
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if (!$body.text().includes('tidak ditemukan') && $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button:contains("Hapus")').length > 0) {
        cy.log(`Kategori "${categoryName}" sudah ada. Menghapus data lama...`);
        this.clickDeleteRow(0);
        this.confirmDelete();
        cy.wait(1500);
      }
    });
    this.search('');
    cy.wait(800);
  }

  deleteAllCategoriesIfExists() {
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    const deleteRowIfDataExists = (rowIndex = 0, retryCount = 0) => {
      if (retryCount > 30) return;
      cy.get('body').then(($body) => {
        if ($body.find('[role="dialog"]').length > 0) {
          cy.wait(800);
        }
        const trashBtns = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button:contains("Hapus"), tbody tr a:has(svg.lucide-trash)');
        if (trashBtns.length > rowIndex) {
          const targetBtn = trashBtns.eq(rowIndex);
          cy.wrap(targetBtn).scrollIntoView();
          cy.wait(300);
          cy.wrap(targetBtn).click({ force: true });
          cy.wait(1000);
          this.confirmDelete();
          cy.wait(1500);

          cy.get('body').then(($afterBody) => {
            const hasInUseError = $afterBody.text().includes('masih digunakan') || $afterBody.find('[data-sonner-toast]:contains("masih digunakan")').length > 0;
            if (hasInUseError) {
              cy.log(`Kategori pada baris ${rowIndex} masih digunakan oleh pengumuman lain. Kategori ini di-skip.`);
              cy.wait(1000);
              deleteRowIfDataExists(rowIndex + 1, retryCount + 1);
            } else {
              deleteRowIfDataExists(rowIndex, retryCount + 1);
            }
          });
        } else {
          cy.log('Pembersihan data kategori selesai.');
        }
      });
    };

    deleteRowIfDataExists(0, 0);
  }

  verifyToast(expectedMessage) {
    cy.contains(new RegExp(expectedMessage, 'i'), { timeout: 15000 }).should('exist');
  }

  verifyValidationError(expectedMessage) {
    cy.contains(new RegExp(expectedMessage, 'i'), { timeout: 15000 }).should('exist');
  }

  checkCategoryInAnnouncementForm(categoryName, shouldExist = true) {
    cy.visit(testData.urls.announcementFormPage, { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    cy.get('body').then(($body) => {
      if ($body.text().includes('Peran Belum Ditetapkan') || $body.text().includes('Hubungi admin') || $body.find('input[type="email"]').length > 0) {
        cy.log('Memulihkan sesi login...');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        cy.visit(testData.urls.announcementFormPage, { failOnStatusCode: false, timeout: 30000 });
        cy.get('body', { timeout: 15000 }).should('be.visible');
      }
    });

    this.elements.announcementCategoryDropdown().scrollIntoView().click({ force: true });
    cy.wait(800);

    this.elements.selectOptionsContainer().should('be.visible');

    if (shouldExist) {
      this.elements.selectOptions().should('contain.text', categoryName);
    } else {
      this.elements.selectOptions().should('not.contain.text', categoryName);
    }
  }
}

export default new AnnouncementCategoryPage();
