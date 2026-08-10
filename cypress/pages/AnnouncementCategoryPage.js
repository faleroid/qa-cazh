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
    modalTitle: () => cy.get('[role="dialog"] [data-slot="dialog-title"], [data-slot="dialog-content"] [data-slot="dialog-title"], [role="dialog"] h2, [data-slot="dialog-content"] h2', { timeout: 15000 }).first(),
    modalNamaInput: () => cy.get('[role="dialog"] input, [data-slot="dialog-content"] input, input[name="name"], input[placeholder="Nama Kategori"]', { timeout: 15000 }).first(),
    modalStatusDropdown: () => cy.get('[role="dialog"] button[role="combobox"], [data-slot="dialog-content"] button[role="combobox"], [role="dialog"] [data-slot="form-control"], [data-slot="dialog-content"] [data-slot="form-control"]', { timeout: 15000 }).first(),
    modalSaveBtn: () => cy.get('[role="dialog"] button[type="submit"], [data-slot="dialog-content"] button[type="submit"], button[type="submit"], [role="dialog"] button:contains("Simpan"), [data-slot="dialog-content"] button:contains("Simpan")', { timeout: 15000 }).first(),
    modalCancelBtn: () => cy.get('[role="dialog"] button[data-slot="dialog-close"], [data-slot="dialog-content"] button[data-slot="dialog-close"], button:contains("Batal"), button:contains("Kembali")', { timeout: 15000 }).first(),
    modalCloseXBtn: () => cy.get('[role="dialog"] button[data-slot="dialog-close"]:has(svg.lucide-x), [data-slot="dialog-content"] button[data-slot="dialog-close"]:has(svg.lucide-x), button:has(svg.lucide-x)', { timeout: 15000 }).first(),
    backButton: () => cy.contains('button, a', /kembali|batal/i, { timeout: 10000 }),

    // Search & Filters on List Page (Outside Dialog)
    searchInput: () => cy.get('input[placeholder*="Cari"], input[placeholder*="Search"], input[type="search"]').first(),
    filterStatusSelect: () => cy.get('[data-slot="card-header"] [role="combobox"], [data-slot="card-header"] [data-slot="select-trigger"], [role="combobox"]').first(),

    // Delete Confirmation Modal
    deleteModal: () => cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }),
    deleteConfirmBtn: () => cy.get('[role="dialog"] [data-slot="dialog-footer"] button, [data-slot="dialog-content"] [data-slot="dialog-footer"] button, [role="dialog"] button', { timeout: 15000 }).filter(':contains("Hapus")').first(),
    deleteCancelBtn: () => cy.get('[role="dialog"] [data-slot="dialog-footer"] button, [data-slot="dialog-content"] [data-slot="dialog-footer"] button, [role="dialog"] button').filter(':contains("Batal")').first(),
    deleteMessage: () => cy.get('[role="dialog"] p, [data-slot="dialog-content"] p, [data-slot="dialog-description"]', { timeout: 15000 }),

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
    rowStatusBadge: (index = 0) => cy.get('tbody tr').eq(index).find('[data-slot="badge"], span.badge, span, td'),

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

      // Reset search filter input if previously filled
      const searchInput = $body.find('input[placeholder*="Cari"], input[placeholder*="Search"], input[type="search"]');
      if (searchInput.length > 0 && searchInput.val() !== '') {
        cy.wrap(searchInput.first()).clear({ force: true });
        cy.wait(800);
      }
    });
  }

  clickAddButton() {
    cy.wait(500);
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"][data-state="open"]').length > 0) {
        cy.get('body').type('{esc}', { force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(800);
      }
    });

    this.elements.addButton().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(1000);
    this.elements.formModal().should('be.visible');
    cy.wait(500);
  }

  clickBackButton() {
    cy.wait(500);
    cy.get('body').then(($body) => {
      const openDialog = $body.find('[role="dialog"][data-state="open"], [data-slot="dialog-content"]');
      if (openDialog.length > 0) {
        const cancelBtn = openDialog.find('button:contains("Batal"), button[data-slot="dialog-close"], button:contains("Kembali")');
        if (cancelBtn.length > 0) {
          cy.wrap(cancelBtn.first()).click({ force: true });
        } else {
          cy.get('body').type('{esc}', { force: true });
        }
      } else {
        cy.log('Modal Form/Dialog sudah dalam posisi tertutup.');
      }
    });
    cy.wait(1000);
  }

  fillForm({ namaKategori, status }) {
    cy.wait(500);
    if (namaKategori !== undefined) {
      this.elements.modalNamaInput().should('be.visible').then(($input) => {
        if (namaKategori === '') {
          cy.wrap($input).clear({ force: true });
        } else {
          cy.wrap($input).clear({ force: true }).type(namaKategori, { force: true, delay: 20, parseSpecialCharSequences: false });
        }
      });
      cy.wait(800);
    }

    if (status !== undefined) {
      cy.wait(500);
      cy.get('body').then(($body) => {
        const modalEl = $body.find('[role="dialog"], [data-slot="dialog-content"]');
        const comboboxBtn = modalEl.find('button[role="combobox"], button:has(span[data-slot="select-value"]), [data-slot="select-trigger"]');
        if (comboboxBtn.length > 0) {
          cy.wrap(comboboxBtn.first()).scrollIntoView().should('be.visible').click({ force: true });
          cy.wait(800);

          const isNonActive = status.toLowerCase().includes('tidak') || status.toLowerCase().includes('non');
          const targetRegex = isNonActive ? /tidak aktif|nonaktif/i : /^aktif$/i;

          cy.get('[data-slot="select-content"], [role="listbox"], [role="popper"]', { timeout: 15000 })
            .should('be.visible')
            .find('[role="option"], [data-slot="select-item"]')
            .contains(targetRegex)
            .should('be.visible')
            .click({ force: true });
          cy.wait(800);
        } else {
          cy.log(`Field Status tidak ada pada modal form ini (status default ${status}).`);
        }
      });
    }
  }

  saveForm() {
    cy.wait(500);
    this.elements.modalSaveBtn().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(2000);
  }

  search(keyword) {
    cy.wait(500);
    if (keyword === '') {
      this.elements.searchInput().clear({ force: true });
    } else {
      this.elements.searchInput().clear({ force: true }).type(keyword, { force: true, delay: 50 });
    }
    cy.wait(1500);
  }

  filterStatus(statusText) {
    cy.wait(500);
    this.elements.filterStatusSelect().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(800);

    const isNonActive = statusText.toLowerCase().includes('tidak') || statusText.toLowerCase().includes('non');
    const isAll = statusText.toLowerCase().includes('semua');

    let targetRegex = /^aktif$/i;
    if (isNonActive) {
      targetRegex = /tidak aktif|nonaktif/i;
    } else if (isAll) {
      targetRegex = /^semua$/i;
    }

    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 15000 })
      .contains(targetRegex)
      .should('be.visible')
      .click({ force: true });
    cy.wait(1500);
  }

  changePageSize(size) {
    cy.wait(500);
    this.elements.pageSizeDropdown().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 15000 })
      .contains(String(size))
      .should('be.visible')
      .click({ force: true });
    cy.wait(1500);
  }

  clickEditRow(index = 0) {
    cy.wait(500);
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"][data-state="open"]').length > 0) {
        cy.get('body').type('{esc}', { force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(800);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('be.visible').and('have.length.gt', index);
    cy.wait(800);

    cy.get('tbody tr', { timeout: 15000 })
      .eq(index)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), button:contains("Edit")')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    this.elements.formModal().should('be.visible');
    cy.wait(500);
  }

  clickEditRowByName(categoryName) {
    cy.wait(500);
    this.search('');
    cy.wait(800);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"][data-state="open"]').length > 0) {
        cy.get('body').type('{esc}', { force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(800);
      }
    });

    cy.contains('tbody tr', categoryName, { timeout: 15000 })
      .should('be.visible')
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil), button:contains("Edit")')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    this.elements.formModal().should('be.visible');
    cy.wait(500);
  }

  clickDeleteRow(index = 0) {
    cy.wait(800);
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('body').type('{esc}', { force: true });
        cy.wait(800);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('be.visible').and('have.length.gt', index);
    cy.wait(500);

    cy.get('tbody tr', { timeout: 15000 })
      .eq(index)
      .find('button:has(svg.lucide-trash), button:contains("Hapus"), a:has(svg.lucide-trash)')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    this.elements.deleteModal().should('be.visible');
    cy.wait(500);
  }

  clickDeleteRowByName(categoryName) {
    cy.wait(500);
    this.search('');
    cy.wait(800);
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('body').type('{esc}', { force: true });
        cy.wait(800);
      }
    });

    cy.contains('tbody tr', categoryName, { timeout: 15000 })
      .should('be.visible')
      .find('button:has(svg.lucide-trash), button:contains("Hapus"), a:has(svg.lucide-trash)')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    this.elements.deleteModal().should('be.visible');
    cy.wait(500);
  }

  confirmDelete() {
    cy.wait(800);
    this.elements.deleteConfirmBtn().should('be.visible').click({ force: true });
    cy.wait(2500);
  }

  cancelDelete() {
    cy.wait(500);
    this.elements.deleteCancelBtn().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(1000);
  }

  pressEscKey() {
    cy.wait(500);
    cy.get('body').type('{esc}', { force: true });
    cy.wait(800);
  }

  ensureCategoryExists(categoryName, status = 'Aktif') {
    cy.wait(500);
    this.search('');
    cy.wait(800);
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const hasCategory = $body.text().includes(categoryName);
      if (!hasCategory) {
        cy.log(`Membuat kategori "${categoryName}" dengan status ${status}...`);
        this.clickAddButton();
        this.fillForm({ namaKategori: categoryName, status: status });
        this.saveForm();
        cy.wait(1500);
      } else {
        const rowObj = $body.find(`tbody tr:contains("${categoryName}")`);
        if (rowObj.length > 0) {
          const rowText = rowObj.text();
          const targetIsNonActive = status.toLowerCase().includes('tidak') || status.toLowerCase().includes('non');
          const rowIsNonActive = rowText.toLowerCase().includes('tidak aktif') || rowText.toLowerCase().includes('nonaktif');
          if (targetIsNonActive !== rowIsNonActive) {
            cy.log(`Mengubah status kategori "${categoryName}" ke ${status}...`);
            this.clickEditRowByName(categoryName);
            this.fillForm({ status: status });
            this.saveForm();
            cy.wait(1500);
          }
        }
      }
    });
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
          cy.get('body').type('{esc}', { force: true });
          cy.wait(1000);
        }
        const trashBtns = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button:contains("Hapus"), tbody tr a:has(svg.lucide-trash)');
        if (trashBtns.length > rowIndex) {
          this.clickDeleteRow(rowIndex);
          this.confirmDelete();
          cy.wait(2000);

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
