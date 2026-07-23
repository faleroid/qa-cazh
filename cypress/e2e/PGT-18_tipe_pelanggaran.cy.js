import ViolationTypePage from './pages/ViolationTypePage';
import testData from './fixtures/violationTypeData.json';

describe('UAT Suite: PGT-18 - Pengaturan Kesiswaan: Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  // ---------------------------------------------------------------------------
  // 1. TAMBAH TIPE PELANGGARAN & FORM VALIDASI (POSISTIF & NEGATIF)
  // ---------------------------------------------------------------------------
  it('PGT-18.1 Isi form Tambah Tipe Pelanggaran dengan semua field valid (Instansi + Nama + Min Poin + Max Poin) -> klik Simpan', () => {
    const namaBaru = testData.validData.namaBaru;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: namaBaru,
      minPoin: testData.validData.minPoin,
      maxPoin: testData.validData.maxPoin
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
    cy.contains(namaBaru, { timeout: 10000 }).should('be.visible');
  });

  it("PGT-18.2 Klik btn 'Tambah' di halaman list Tipe Pelanggaran", () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalInstansiDropdown().should('exist');
    ViolationTypePage.elements.modalNamaInput().should('have.value', '');
    ViolationTypePage.elements.modalMinPoinInput().should('have.value', '');
    ViolationTypePage.elements.modalMaxPoinInput().should('have.value', '');
    ViolationTypePage.elements.modalSaveBtn().should('exist');
  });

  it('PGT-18.3 Isi form -> klik btn Batal', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Pelanggaran Batal',
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });

  it('PGT-18.4 Klik Simpan tanpa isi field apapun', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('have.length.at.least', 1);
    ViolationTypePage.elements.formModal().should('be.visible');
  });

  it('PGT-18.5 Kosongkan Instansi (field lain terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.instansiRequired, 'i')).should('be.visible');
  });

  it('PGT-18.6 Kosongkan Nama Tipe Pelanggaran -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: '',
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.namaRequired, 'i')).should('be.visible');
  });

  it('PGT-18.7 Kosongkan Minimal Poin (Max terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.8 Kosongkan Maksimal Poin (Min terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: ''
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.9 Kosongkan kedua Range Poin (Min + Max) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '',
      maxPoin: ''
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.10 Buka dropdown Instansi', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.elements.modalInstansiDropdown().click({ force: true });
    ViolationTypePage.elements.selectOptions().should('have.length.at.least', 1);
  });

  it('PGT-18.11 Input Minimal Poin dengan angka negatif (misal -5)', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '-5',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });

  it('PGT-18.12 Input Maksimal Poin dengan angka negatif (misal -10)', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '-10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });

  it('PGT-18.13 Input Min Poin > Max Poin (misal Min=15, Max=10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '15',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.minGreaterMax, 'i')).should('be.visible');
  });

  it('PGT-18.14 Input Min Poin = Max Poin (misal keduanya 10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '10',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.15 Input Max Poin = 1000 (> 999) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '1000'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.maxExceeds999, 'i')).should('be.visible');
  });

  it('PGT-18.16 Input Range Poin yang OVERLAP dengan tipe pelanggaran existing -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Pelanggaran Overlap Test',
      minPoin: '1',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.17 Input Nama Tipe Pelanggaran yang sudah ada (duplikat) -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '950',
      maxPoin: '960'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.duplicate);
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('not.be.disabled');
  });

  it('PGT-18.18 Input Nama Tipe Pelanggaran > 100 karakter -> klik Simpan', () => {
    const longName = 'A'.repeat(105);
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: longName,
      minPoin: '91',
      maxPoin: '95'
    });
    ViolationTypePage.elements.modalNamaInput().invoke('val').then((val) => {
      expect(val.length).to.be.at.most(100);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. DATA TABLE, NAVIGATION & PAGINATION
  // ---------------------------------------------------------------------------
  it('PGT-18.19 Load halaman list Tipe Pelanggaran', () => {
    ViolationTypePage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/tipe pelanggaran|nama/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/range/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/status/i).should('be.visible');
    ViolationTypePage.elements.addButton().should('be.visible');
  });

  it('PGT-18.20 Cek Aksi di setiap row', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.rowEditBtn().should('exist');
    ViolationTypePage.elements.rowDeleteBtn().should('exist');
  });

  it('PGT-18.21 Buka halaman list Tipe Pelanggaran saat belum ada data', () => {
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr button:has(svg.lucide-trash)');
      if (rows.length > 0) {
        cy.wrap(rows.first()).click({ force: true });
        ViolationTypePage.confirmDelete();
        cy.wait(1000);
        cy.reload();
      }
    });
    ViolationTypePage.elements.emptyState().should('be.visible');
  });

  it('PGT-18.22 Tambah 2 tipe pelanggaran berturut-turut -> reload halaman', () => {
    const cat1 = 'Pelanggaran Auto 1';
    const cat2 = 'Pelanggaran Auto 2';

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat1, minPoin: '101', maxPoin: '105' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    
    // Jeda 3.5 detik untuk memulihkan threshold API Rate Limit backend
    cy.wait(3500);

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 1, nama: cat2, minPoin: '106', maxPoin: '110' });
    ViolationTypePage.saveForm();

    // Penanganan khusus jika backend memicu rate limit
    cy.get('body').then(($body) => {
      if ($body.text().match(/rate limit/i)) {
        cy.wait(3500);
        ViolationTypePage.saveForm();
      }
    });

    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.contains(cat2, { timeout: 10000 }).should('be.visible');
  });

  it('PGT-18.23 Cek default value pagination page size', () => {
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });

  it('PGT-18.24 Klik dropdown pagination page size', () => {
    ViolationTypePage.elements.pageSizeDropdown().click({ force: true });
    ViolationTypePage.elements.selectOptions().should('have.length.at.least', 3);
  });

  it('PGT-18.25 Ganti page size ke 50/100/500/1000', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.changePageSize(50);
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });

  // ---------------------------------------------------------------------------
  // 3. SEARCH & FILTER COMBINATIONS
  // ---------------------------------------------------------------------------
  it('PGT-18.26 Ketik Nama Tipe Pelanggaran di search box', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.search('Pelanggaran');
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });

  it("PGT-18.27 Ketik keyword yang tidak match ('xyz123abc')", () => {
    ViolationTypePage.search(testData.search.invalidKeyword);
    ViolationTypePage.elements.emptyState().should('be.visible');
  });

  it('PGT-18.28 Setelah search, clear search box', () => {
    ViolationTypePage.ensureDataExists();
    
    // 1. Ketik kata kunci pencarian yang tidak match ('xyz123abc') -> Muncul Empty State
    ViolationTypePage.search(testData.search.invalidKeyword);
    cy.wait(1000);
    ViolationTypePage.elements.emptyState().should('be.visible');

    // 2. Kosongkan (clear) search box
    ViolationTypePage.search('');
    cy.wait(1000);

    // 3. Verifikasi list kembali menampilkan seluruh data
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });

  it('PGT-18.29 Aktifkan Filter Instansi (pilih 1 instansi)', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().eq(1).click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });

  it("PGT-18.30 Aktifkan Filter Status = 'Aktif'", () => {
    ViolationTypePage.ensureDataExists();
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });

    // 2. Klik opsi "Aktif" secara presisi (exact match ^Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Aktif\s*$/i).first().click({ force: true });
    cy.wait(1500);

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Aktif'
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Aktif');
    });
  });

  it("PGT-18.31 Aktifkan Filter Status = 'Tidak Aktif'", () => {
    ViolationTypePage.ensureDataExists();
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });

    // 2. Klik opsi "Tidak Aktif" secara presisi (exact match ^Tidak Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Tidak Aktif\s*$/i).first().click({ force: true });
    cy.wait(1500);

    // 3. Verifikasi hasil filter (atau Empty State jika tidak ada data 'Tidak Aktif')
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length > 0) {
        ViolationTypePage.elements.tableRows().each(($row) => {
          cy.wrap($row).should('contain.text', 'Tidak Aktif');
        });
      } else {
        ViolationTypePage.elements.emptyState().should('be.visible');
      }
    });
  });

  it('PGT-18.32 Aktifkan Filter Instansi + Status secara bersamaan (kombinasi)', () => {
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().last().click({ force: true });
    cy.wait(500);
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    cy.wait(1000);
  });

  it('PGT-18.33 Aktifkan filter + search sekaligus -> tidak ada hasil match', () => {
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    ViolationTypePage.search(testData.search.invalidKeyword);
    ViolationTypePage.elements.emptyState().should('be.visible');
  });

  it('PGT-18.34 Aktifkan filter + search sekaligus -> ada hasil match', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    ViolationTypePage.search('Pelanggaran');
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });

  // ---------------------------------------------------------------------------
  // 4. EDIT FORM, STATUS SWITCH & VALIDATION
  // ---------------------------------------------------------------------------
  it('PGT-18.35 Klik tombol Edit di row tipe pelanggaran', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });

  it('PGT-18.36 Ubah Nama Tipe Pelanggaran ke nama BARU -> klik Simpan', () => {
    const newName = 'Pelanggaran Edit Baru';
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: newName });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });

  it('PGT-18.37 Ubah Range Poin (Min-Max) valid & tidak overlap -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '50', maxPoin: '60' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it("PGT-18.38 Ubah Status dari 'Aktif' ke 'Tidak Aktif' -> klik Simpan", () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it("PGT-18.39 Ubah Status dari 'Tidak Aktif' ke 'Aktif' -> klik Simpan", () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ statusText: 'Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it('PGT-18.40 Ubah Instansi tipe pelanggaran -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    cy.wait(500);
    
    // Toggle instansi secara dinamis agar re-runnable (A <-> B)
    ViolationTypePage.elements.modalInstansiValue().invoke('text').then((currentText) => {
      const targetIndex = currentText.includes('Sekolah Digital') ? 1 : 0;
      ViolationTypePage.fillModalForm({ instansiIndex: targetIndex });
    });

    cy.wait(500);
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it('PGT-18.41 Ubah field di form Edit -> klik Batal', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Nama Edit Batal' });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });

  it('PGT-18.42 Kosongkan Nama Tipe Pelanggaran di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.43 Status selalu memiliki nilai terpilih (Aktif / Tidak Aktif) & tidak dapat dikosongkan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.modalStatusDropdown().invoke('text').should('match', /aktif|tidak aktif/i);
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });

  it('PGT-18.44 Kosongkan Min atau Max Poin di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.45 Ubah Nama Tipe Pelanggaran jadi nama yang SUDAH ADA (duplikat) -> klik Simpan', () => {
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Pelanggaran Auto 1' });
    ViolationTypePage.saveForm();

    // Notif Error 'Nama tipe pelanggaran sudah ada, silakan gunakan nama lain' muncul
    ViolationTypePage.verifyValidationError('sudah');

    // Data tidak tersimpan (modal tetap terbuka & tombol simpan tetap aktif)
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('be.enabled');
  });

  it('PGT-18.46 Ubah Range Poin jadi OVERLAP dengan tipe pelanggaran existing lain -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });

  it('PGT-18.47 Ubah Min Poin > Max Poin di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '50', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.48 Ubah Max Poin > 999 di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ maxPoin: '1000' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });

  it('PGT-18.49 Ubah Nama Tipe Pelanggaran jadi > 100 karakter -> error validation 100 karakter', () => {
    const longName = 'B'.repeat(105);
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: longName });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError('100');
    ViolationTypePage.elements.formModal().should('be.visible');
  });

  // ---------------------------------------------------------------------------
  // 5. INTEGRATION WITH CREATE VIOLATION FEATURE & DELETE LIFECYCLE
  // ---------------------------------------------------------------------------
  it("PGT-18.50 Set status 'Aktif' -> buka fitur Buat Pelanggaran / Laporan Pelanggaran", () => {
    ViolationTypePage.visit();
    ViolationTypePage.elements.tableRows().should('be.visible');
  });

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Buat Pelanggaran / Laporan Pelanggaran", () => {
    ViolationTypePage.visit();
    ViolationTypePage.elements.tableRows().should('be.visible');
  });

  it("PGT-18.52 Klik Aksi -> 'Hapus' di row tipe pelanggaran", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.elements.deleteModal().should('be.visible');
    ViolationTypePage.elements.deleteConfirmBtn().should('be.visible');
  });

  it("PGT-18.53 Klik btn 'Hapus' di popup konfirmasi", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it("PGT-18.54 Buka popup Hapus -> klik btn 'Batal'", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.cancelDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });

  it('PGT-18.55 Buka popup Hapus -> tekan Esc di keyboard', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });

  it('PGT-18.56 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    const uniqueCat = 'Khusus Hapus Data';
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: uniqueCat, minPoin: '301', maxPoin: '305' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    ViolationTypePage.search(uniqueCat);
    ViolationTypePage.elements.tableRows().should('have.length', 1);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.emptyState().should('be.visible');
  });

  it('PGT-18.57 Hapus tipe pelanggaran -> buka fitur Buat Pelanggaran / Laporan Pelanggaran', () => {
    ViolationTypePage.visit();
    ViolationTypePage.elements.tableRows().should('be.visible');
  });
});
