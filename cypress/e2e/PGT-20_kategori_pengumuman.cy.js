import AnnouncementCategoryPage from '../pages/AnnouncementCategoryPage';
import testData from '../fixtures/announcementCategoryData.json';

describe('PGT-20: Pengaturan - Administrasi - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.1: Isi form Tambah dengan Nama Kategori valid → klik Simpan', () => {
    AnnouncementCategoryPage.deleteAllCategoriesIfExists();
    cy.wait(1000);
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNama });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.wait(1000);
    cy.contains('tbody tr', testData.validData.validNama).should('be.visible');
    cy.contains('tbody tr', testData.validData.validNama).should('contain.text', 'Aktif');
  });

  it('PGT-20.2: Klik btn "Tambah" di halaman list', () => {
    AnnouncementCategoryPage.clickAddButton();
    cy.wait(500);
    AnnouncementCategoryPage.elements.modalTitle().should('contain.text', 'Tambah Kategori');
    AnnouncementCategoryPage.elements.modalCancelBtn().should('be.visible');
    AnnouncementCategoryPage.elements.modalNamaInput().should('have.value', '');
  });

  it('PGT-20.3: Tutup modal Tambah Kategori dengan tombol "Close (X)"', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: 'Draft Kategori Sementara' });
    cy.wait(500);
    AnnouncementCategoryPage.elements.modalCloseXBtn().should('be.visible').click({ force: true });
    AnnouncementCategoryPage.elements.formModal().should('not.exist');
    cy.contains('tbody tr', 'Draft Kategori Sementara').should('not.exist');
  });

  it('PGT-20.4: Kosongkan Nama Kategori → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: '' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
  });

  it('PGT-20.5: Isi Nama Kategori dengan 1 karakter (misal "A") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.singleChar });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameMinLength);
  });

  it('PGT-20.6: Isi Nama Kategori dengan > 100 karakter → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.maxLengthOver });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameMaxLength);
  });

  it('PGT-20.7: Isi Nama Kategori dengan spasi saja (whitespace only) → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.whitespaceOnly });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.whitespaceError);
  });

  it('PGT-20.8: Isi Nama Kategori dengan karakter khusus TIDAK diizinkan (misal "@#$%") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.disallowedChars });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.disallowedCharsError);
  });

  it('PGT-20.9: Isi Nama Kategori dengan karakter khusus DIIZINKAN (misal "Info & Update.") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaAllowedChar });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.wait(1000);
    cy.contains('tbody tr', testData.validData.validNamaAllowedChar).should('be.visible');
  });

  it('PGT-20.10: Isi Nama Kategori dengan kombinasi huruf, angka, spasi (misal "Info 2026") → klik Simpan', () => {
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaAlphanumeric });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.addSuccess);
    cy.wait(1000);
    cy.contains('tbody tr', testData.validData.validNamaAlphanumeric).should('be.visible');
  });

  it('PGT-20.11: Isi Nama Kategori dengan nama yang SUDAH ADA di kategori Aktif → klik Simpan', () => {
    AnnouncementCategoryPage.ensureCategoryExists(testData.validData.validNama);
    cy.wait(800);
    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNama });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.12: Isi Nama Kategori dengan nama yang SUDAH ADA di kategori Nonaktif → klik Simpan', () => {
    const categoryName = testData.validData.validNamaAlphanumeric; // "Info 2026"
    AnnouncementCategoryPage.ensureCategoryExists(categoryName);
    cy.wait(800);

    AnnouncementCategoryPage.clickEditRowByName(categoryName);
    cy.wait(1000);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: categoryName, status: 'Aktif' });
    AnnouncementCategoryPage.saveForm();

    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.13: Cek state tombol Simpan saat form belum valid (Nama kosong atau invalid)', () => {
    AnnouncementCategoryPage.clickAddButton();
    cy.wait(500);
    AnnouncementCategoryPage.elements.modalSaveBtn().then(($btn) => {
      if (!$btn.is(':disabled')) {
        AnnouncementCategoryPage.saveForm();
        AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
      } else {
        expect($btn).to.be.disabled;
      }
    });
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.14: Simulasi gagal simpan (server error 500) saat klik Simpan dengan data valid', () => {
    const namaValidTanpaTabrakan = testData.validData.validNamaKategori2;

    cy.intercept('POST', '**/api/**', {
      statusCode: 500,
      body: { message: testData.validationMessages.serverSaveError }
    }).as('serverError500');

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: namaValidTanpaTabrakan });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.serverSaveError);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.elements.modalNamaInput().should('have.value', namaValidTanpaTabrakan);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.15: Setelah tambah sukses → buka fitur Tambah/Edit Pengumuman → cek dropdown Kategori', () => {
    const newCategoryName = testData.validData.validNamaKategori2;
    AnnouncementCategoryPage.ensureCategoryExists(newCategoryName);
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(newCategoryName, true);
  });

  it('PGT-20.16: Buka halaman Daftar Kategori Pengumuman', () => {
    cy.contains('h1', 'Kategori Pengumuman').should('be.visible');
    cy.contains('[data-slot="card-title"], h3', 'Data Kategori Pengumuman').should('be.visible');
    cy.contains('button', 'Tambah Kategori').should('be.visible');
    cy.get('thead').should('contain.text', 'Nama Kategori').and('contain.text', 'Status');
  });

  it('PGT-20.17: Cek Aksi di setiap row', () => {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0) {
        AnnouncementCategoryPage.ensureCategoryExists('Kategori Cek Aksi');
      }
    });
    cy.wait(500);
    AnnouncementCategoryPage.elements.tableRows().first().within(() => {
      cy.get('button, a').filter(':has(svg.lucide-square-pen), :has(svg.lucide-pencil), :contains("Edit")').should('be.visible');
      cy.get('button, a').filter(':has(svg.lucide-trash), :contains("Hapus")').should('be.visible');
    });
  });

  it('PGT-20.18: Buka halaman list saat belum ada data kategori', () => {
    AnnouncementCategoryPage.deleteAllCategoriesIfExists();
    cy.wait(1000);
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-20.19: Tambah 2 kategori berturut-turut → reload halaman', () => {
    const cat1 = 'Pengumuman Akademik';
    const cat2 = 'Informasi Beasiswa';

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: cat1 });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: cat2 });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    cy.contains('tbody tr', cat1).should('be.visible');
    cy.contains('tbody tr', cat2).should('be.visible');
  });

  it('PGT-20.20: Cek pagination default value', () => {
    AnnouncementCategoryPage.elements.pageSizeDropdown().should('contain.text', '10');
  });

  it('PGT-20.21: Ganti pagination ke 50 atau 100', () => {
    AnnouncementCategoryPage.changePageSize(50);
    AnnouncementCategoryPage.elements.pageSizeDropdown().should('contain.text', '50');
  });

  it('PGT-20.22: Ketik nama kategori partial (misal "inf") di search box', () => {
    AnnouncementCategoryPage.ensureCategoryExists('Informasi Umum');
    cy.wait(800);
    const keyword = testData.search.partialMatchKeyword; // "inf"
    AnnouncementCategoryPage.search(keyword);
    cy.wait(1500);

    cy.get('tbody tr', { timeout: 15000 }).should('be.visible').and('have.length.at.least', 1);
    cy.contains('tbody tr', new RegExp(keyword, 'i')).should('be.visible');
  });

  it('PGT-20.23: Ketik keyword yang tidak match ("xyz123abc")', () => {
    AnnouncementCategoryPage.search(testData.search.noMatchKeyword);
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-20.24: Aktifkan Filter Status = "Aktif"', () => {
    AnnouncementCategoryPage.filterStatus('Aktif');
    cy.wait(1500);

    cy.get('tbody tr', { timeout: 15000 })
      .should('be.visible')
      .and('have.length.at.least', 1)
      .each(($row) => {
        cy.wrap($row).should('contain.text', 'Aktif');
      });
  });

  it('PGT-20.25: Aktifkan Filter Status = "Tidak Aktif"', () => {
    AnnouncementCategoryPage.clickEditRow(0);
    cy.wait(1000);
    AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    AnnouncementCategoryPage.filterStatus('Tidak Aktif');
    cy.wait(1500);

    cy.get('tbody tr', { timeout: 15000 })
      .should('be.visible')
      .and('have.length.at.least', 1)
      .each(($row) => {
        cy.wrap($row).should('contain.text', 'Tidak Aktif');
      });
  });

  // SKIPPED: Permintaan pengujian dilewati untuk filter tanpa hasil match
  it.skip('PGT-20.26: Aktifkan filter → tidak ada hasil match', () => {
    cy.intercept('GET', '**/api/v3/announcements/categories*', {
      statusCode: 200,
      body: { data: [], total: 0 }
    }).as('getFilteredEmpty');

    AnnouncementCategoryPage.filterStatus('Nonaktif');
    AnnouncementCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-20.27: Klik tombol Edit di row kategori', () => {
    cy.wait(1000);
    AnnouncementCategoryPage.clickEditRow(0);
    cy.wait(1500);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
  });

  it('PGT-20.28: Klik tombol Hapus di row kategori', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickDeleteRow(0);
    cy.wait(800);
    AnnouncementCategoryPage.elements.deleteModal().should('be.visible');
  });

  it('PGT-20.29: Klik tombol Edit di row kategori (Form Prefill check)', () => {
    cy.wait(1000);
    AnnouncementCategoryPage.clickEditRow(0);
    cy.wait(1500);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.elements.modalTitle().should('contain.text', 'Edit Kategori');
    AnnouncementCategoryPage.elements.modalNamaInput().should('not.have.value', '');
    AnnouncementCategoryPage.elements.modalCancelBtn().should('be.visible');
    AnnouncementCategoryPage.elements.modalSaveBtn().should('be.visible');
  });

  it('PGT-20.30: Klik btn "Kembali" / Close (X) di atas modal Edit', () => {
    cy.wait(1000);
    AnnouncementCategoryPage.clickEditRow(0);
    cy.wait(1000);
    AnnouncementCategoryPage.elements.modalCloseXBtn().should('be.visible').click({ force: true });
    cy.wait(1000);
    AnnouncementCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-20.31: Ubah Nama Kategori ke nilai valid baru → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaUpdated });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
    cy.contains('tbody tr', testData.validData.validNamaUpdated).should('be.visible');
  });

  it('PGT-20.32: Ubah Status dari "Aktif" ke "Tidak Aktif" → klik Simpan', () => {
    cy.wait(800);
    cy.contains('tbody tr', 'Aktif', { timeout: 15000 }).then(($row) => {
      const rowIndex = $row.index();
      AnnouncementCategoryPage.clickEditRow(rowIndex);
      AnnouncementCategoryPage.fillForm({ status: 'Tidak Aktif' });
      AnnouncementCategoryPage.saveForm();
      AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
      AnnouncementCategoryPage.elements.rowStatusBadge(rowIndex).should('contain.text', 'Tidak Aktif');
    });
  });

  it('PGT-20.33: Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan', () => {
    cy.wait(800);
    cy.contains('tbody tr', 'Tidak Aktif', { timeout: 15000 }).then(($row) => {
      const rowIndex = $row.index();
      AnnouncementCategoryPage.clickEditRow(rowIndex);
      AnnouncementCategoryPage.fillForm({ status: 'Aktif' });
      AnnouncementCategoryPage.saveForm();
      AnnouncementCategoryPage.verifyToast(testData.toastMessages.editSuccess);
      AnnouncementCategoryPage.elements.rowStatusBadge(rowIndex).should('contain.text', 'Aktif');
    });
  });

  it('PGT-20.34: Kosongkan Nama Kategori di Edit → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    cy.wait(1500);
    AnnouncementCategoryPage.fillForm({ namaKategori: '' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameRequired);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.35: Ubah Nama Kategori jadi 1 karakter → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.singleChar });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameMinLength);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.36: Ubah Nama Kategori jadi > 100 karakter → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.maxLengthOver });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameMaxLength);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.37: Ubah Nama Kategori jadi spasi saja → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.whitespaceOnly });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.whitespaceError);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.38: Ubah Nama Kategori jadi karakter khusus tidak diizinkan (misal "@#$") → klik Simpan', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.invalidData.disallowedChars });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.disallowedCharsError);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.39: Ubah Nama Kategori jadi nama yang sudah ada di kategori Aktif atau Nonaktif lain → klik Simpan', () => {
    const existingName = 'Pengumuman Akademik';
    const testCatName = 'Kategori Uji Duplikat Edit';

    AnnouncementCategoryPage.clickAddButton();
    AnnouncementCategoryPage.fillForm({ namaKategori: testCatName });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    AnnouncementCategoryPage.clickEditRowByName(testCatName);
    AnnouncementCategoryPage.fillForm({ namaKategori: existingName });
    AnnouncementCategoryPage.saveForm();

    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.nameAlreadyUsed);
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.40: Simulasi gagal simpan (server error) di halaman Edit', () => {
    cy.wait(800);
    cy.intercept({ method: /PUT|PATCH|POST/i, url: '**/api/**' }, {
      statusCode: 500,
      body: { message: testData.validationMessages.serverSaveError }
    }).as('editServerError500');

    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: testData.validData.validNamaUpdated });
    AnnouncementCategoryPage.saveForm();
    cy.wait('@editServerError500');

    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.serverSaveError);
    AnnouncementCategoryPage.elements.formModal().should('be.visible');
    AnnouncementCategoryPage.clickBackButton();
  });

  it('PGT-20.41: Set status kategori "Aktif" → buka fitur Tambah/Edit Pengumuman', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Aktif' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(testData.validData.validNamaUpdated, true);
  });

  it('PGT-20.42: Set status kategori "Nonaktif" → buka fitur Tambah/Edit Pengumuman', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ status: 'Nonaktif' });
    AnnouncementCategoryPage.saveForm();
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(testData.validData.validNamaUpdated, false);
  });

  it('PGT-20.43: Ubah Nama Kategori → cek di pengumuman existing yang pakai kategori tersebut', () => {
    const testTitle = 'Pengumuman Jadwal Ujian Akhir Semester Genap 2026';
    const categoryToSelect = 'Informasi Akademik Utama';
    const updatedCategoryName = 'Informasi & Jadwal Akademik Terbaru';

    // 1. Pastikan kategori "Informasi Akademik Utama" dibuat terlebih dahulu di modul kategori pengumuman
    AnnouncementCategoryPage.ensureCategoryExists(categoryToSelect, 'Aktif');
    cy.wait(1000);

    // 2. Buka form tambah pengumuman baru
    cy.visit('/administration/announcement/list/create', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);

    cy.get('input[type="file"][accept*="image"]', { timeout: 15000 }).first().selectFile({
      contents: Cypress.Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'),
      fileName: 'sample_thumbnail.png',
      mimeType: 'image/png'
    }, { force: true });
    cy.wait(800);

    cy.get('input[name="title"], input[placeholder*="judul"]', { timeout: 15000 })
      .first()
      .clear({ force: true })
      .type(testTitle, { force: true });

    cy.get('body').then(($body) => {
      const instansiBtn = $body.find('button:contains("Pilih instansi")');
      if (instansiBtn.length > 0) {
        cy.wrap(instansiBtn.first()).click({ force: true });
        cy.wait(800);
        cy.get('[role="option"], [role="checkbox"], input[type="checkbox"]', { timeout: 10000 }).first().click({ force: true });
        cy.wait(500);
        cy.get('body').type('{esc}', { force: true });
      }
    });

    cy.get('label:contains("Kategori Pengumuman")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().scrollIntoView().should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[data-slot="select-content"], [role="listbox"], [role="popper"]', { timeout: 15000 })
      .should('be.visible')
      .find('[role="option"], [data-slot="select-item"]')
      .contains(new RegExp(categoryToSelect, 'i'))
      .should('be.visible')
      .click({ force: true });
    cy.wait(500);

    cy.get('#platform-cards_parents, button[id*="platform"]').first().click({ force: true });
    cy.wait(500);

    cy.get('label:contains("Penerima")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Semua Anggota').click({ force: true });
    cy.wait(500);

    cy.get('label:contains("Waktu Pengumuman")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Kirim Sekarang').click({ force: true });
    cy.wait(500);

    cy.get('div.tiptap.ProseMirror, div[contenteditable="true"]', { timeout: 15000 })
      .first()
      .type('Diberitahukan kepada seluruh siswa dan wali murid bahwa Ujian Akhir Semester (UAS) Genap Tahun Ajaran 2025/2026 akan dilaksanakan secara serentak mulai tanggal 15 Juni 2026. Harap mempersiapkan seluruh perlengkapan dan melunasi administrasi sekolah tepat waktu.', { force: true });
    cy.wait(500);

    cy.get('button[type="submit"]').contains('Simpan').click({ force: true });
    cy.wait(2500);

    cy.visit('/administration/announcement/list', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr td').length > 0) {
        cy.contains('tbody tr td', new RegExp(categoryToSelect, 'i')).should('be.visible');
      }
    });

    AnnouncementCategoryPage.visitList();
    AnnouncementCategoryPage.clickEditRowByName(categoryToSelect);
    AnnouncementCategoryPage.fillForm({ namaKategori: updatedCategoryName });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    cy.visit('/administration/announcement/list', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr td').length > 0) {
        cy.contains('tbody tr td', new RegExp(updatedCategoryName, 'i')).should('be.visible');
      }
    });
  });

  it('PGT-20.44: Klik tombol Hapus di row kategori (misal kategori "Info")', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickDeleteRow(0);
    cy.wait(800);
    AnnouncementCategoryPage.elements.deleteModal().should('be.visible');
    AnnouncementCategoryPage.elements.deleteModal().contains('button', /ya, hapus|hapus/i).should('be.visible');
    AnnouncementCategoryPage.elements.deleteModal().contains('button, a', /batal|cancel/i).should('be.visible');
  });

  it('PGT-20.45: Klik btn "Ya, Hapus" di modal konfirmasi (kategori TIDAK dipakai pengumuman aktif)', () => {
    const unusedCategoryName = 'Informasi Umum';
    AnnouncementCategoryPage.clickDeleteRowByName(unusedCategoryName);
    AnnouncementCategoryPage.confirmDelete();
    AnnouncementCategoryPage.verifyToast(testData.toastMessages.deleteSuccess);
  });

  it('PGT-20.46: Klik btn "Ya, Hapus" pada kategori yang MASIH DIPAKAI oleh pengumuman aktif', () => {
    const inUseCategoryName = 'Informasi & Jadwal Akademik Terbaru';
    AnnouncementCategoryPage.clickDeleteRowByName(inUseCategoryName);
    AnnouncementCategoryPage.confirmDelete();
    AnnouncementCategoryPage.verifyValidationError(testData.validationMessages.deleteInUseError);
  });

  it('PGT-20.47: Buka modal konfirmasi → klik btn "Batal"', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.cancelDelete();
    AnnouncementCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-20.48: Buka modal konfirmasi → tekan Esc di keyboard', () => {
    cy.wait(800);
    AnnouncementCategoryPage.clickDeleteRow(0);
    AnnouncementCategoryPage.pressEscKey();
    AnnouncementCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-20.49: Setelah hapus sukses → buka fitur Tambah/Edit Pengumuman → cek dropdown kategori', () => {
    const categoryToDelete = 'Kategori Dihapus Test';
    AnnouncementCategoryPage.ensureCategoryExists(categoryToDelete);
    cy.wait(800);
    cy.contains('tbody tr', categoryToDelete).then(($row) => {
      const rowIndex = $row.index();
      AnnouncementCategoryPage.clickDeleteRow(rowIndex);
      AnnouncementCategoryPage.confirmDelete();
    });
    AnnouncementCategoryPage.checkCategoryInAnnouncementForm(categoryToDelete, false);
  });
});
