import ViolationTypePage from '../pages/ViolationTypePage';
import testData from '../fixtures/violationTypeData.json';

describe('UAT Suite: PGT-18 - Pengaturan Kesiswaan: Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(2500);
  });

  // ---------------------------------------------------------------------------
  // 1. TAMBAH TIPE PELANGGARAN & FORM VALIDASI (POSISTIF & NEGATIF)
  // ---------------------------------------------------------------------------
  it('PGT-18.1 Isi form Tambah Tipe Pelanggaran dengan semua field valid (Instansi + Nama + Min Poin + Max Poin) -> klik Simpan', () => {
    ViolationTypePage.deleteAllDataIfExists();
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
      nama: 'Ketidakhadiran Tanpa Keterangan',
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
    ViolationTypePage.verifyValidationError(testData.validationMessages.minPoinRequired);
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
    ViolationTypePage.verifyValidationError(testData.validationMessages.maxPoinRequired);
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
    ViolationTypePage.verifyValidationError();
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
    ViolationTypePage.verifyValidationError(testData.validationMessages.minGreaterMax);
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
    ViolationTypePage.verifyValidationError();
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
    ViolationTypePage.verifyValidationError(testData.validationMessages.maxExceeds999);
  });

  it('PGT-18.16 Input Range Poin yang OVERLAP dengan tipe pelanggaran existing -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Merokok di Lingkungan Sekolah',
      minPoin: '1',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.overlap);
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
    cy.contains(/Batas 100 karakter tercapai/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.contains('A'.repeat(100), { timeout: 10000 }).should('be.visible');
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
    ViolationTypePage.elements.rowEditBtn().should('exist');
    ViolationTypePage.elements.rowDeleteBtn().should('exist');
  });

  it('PGT-18.21 Buka halaman list Tipe Pelanggaran saat belum ada data', () => {
    // 1. Tunggu tabel selesai muat data awal dari API backend
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    // 2. Fungsi Hapus Bertahap Seluruh Data Eksis
    const deleteRowIfDataExists = () => {
      cy.get('tbody').then(($tbody) => {
        const trashBtns = $tbody.find('tr button:has(svg.lucide-trash)');
        if (trashBtns.length > 0) {
          // Klik tombol trash baris pertama
          cy.wrap(trashBtns.first()).click({ force: true });
          cy.wait(800);

          // Klik konfirmasi Hapus
          ViolationTypePage.confirmDelete();
          cy.wait(2500);

          // Cek kembali baris berikutnya secara rekursif
          deleteRowIfDataExists();
        } else {
          // 3. Ketika seluruh data terhapus, verifikasi state kosong
          ViolationTypePage.elements.emptyState().should('be.visible');
        }
      });
    };

    deleteRowIfDataExists();
  });

  it('PGT-18.22 Tambah 2 tipe pelanggaran berturut-turut -> reload halaman', () => {
    const cat1 = 'Penggunaan Ponsel Saat KBM';
    const cat2 = 'Tindakan Perundungan (Bullying)';

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat1, minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    
    // Jeda 3.5 detik untuk memulihkan threshold API Rate Limit backend
    cy.wait(3500);

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 1, nama: cat2, minPoin: '11', maxPoin: '20' });
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

    // Edit salah satu tipe pelanggaran (cat2) menjadi 'Tidak Aktif' untuk keperluan testing filter status
    cy.contains('tbody tr', cat2, { timeout: 15000 }).should('be.visible');
    cy.contains('tbody tr', cat2).find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)').first().click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
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
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    ViolationTypePage.search('Ponsel');
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().first().should('contain.text', 'Ponsel');
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
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().eq(1).click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });

  it("PGT-18.30 Aktifkan Filter Status = 'Aktif'", () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    ViolationTypePage.ensureDataExists();
    cy.wait(2000);
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);

    // 2. Klik opsi "Aktif" secara presisi (exact match ^Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Aktif\s*$/i).first().click({ force: true });
    
    // Jeda lebih lama (4 detik) agar API backend filter status selesai memuat data dan tabel ter-render ulang secara penuh
    cy.wait(4000);
    cy.get('tbody', { timeout: 15000 }).should('be.visible');

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Aktif'
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').then(($rows) => {
      $rows.each((_, row) => {
        expect(Cypress.$(row).text()).to.include('Aktif');
      });
    });
  });

  it("PGT-18.31 Aktifkan Filter Status = 'Tidak Aktif'", () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    ViolationTypePage.ensureInactiveDataExists();
    cy.wait(2000);
    
    // 1. Buka dropdown Filter Status
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);

    // 2. Klik opsi "Tidak Aktif" secara presisi (exact match ^Tidak Aktif$)
    ViolationTypePage.elements.selectOptions().contains(/^\s*Tidak Aktif\s*$/i).first().click({ force: true });
    
    // Jeda lebih lama (4 detik) agar API backend filter status selesai memuat data dan tabel ter-render ulang secara penuh
    cy.wait(4000);
    cy.get('tbody', { timeout: 15000 }).should('be.visible');

    // 3. Verifikasi baris tabel ter-filter hanya menampilkan status 'Tidak Aktif'
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').then(($rows) => {
      $rows.each((_, row) => {
        expect(Cypress.$(row).text()).to.include('Tidak Aktif');
      });
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
    cy.wait(500);
    ViolationTypePage.elements.selectOptions().contains(/^aktif$/i).first().click({ force: true });
    cy.wait(1500);

    cy.get('tbody tr').first().then(($row) => {
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const keyword = typeName.split(' ')[0] || typeName.slice(0, 5);
      
      ViolationTypePage.search(keyword);
      ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
      cy.get('tbody tr').should('contain.text', keyword);
    });
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
    const newName = 'Pengrusakan Fasilitas Sekolah';
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: newName });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });

  it('PGT-18.37 Ubah Range Poin (Min-Max) valid & tidak overlap -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '15', maxPoin: '20' });
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
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    cy.wait(1000);
    
    // Dapatkan nama instansi terpilih saat ini lalu pilih instansi yang BERBEDA
    ViolationTypePage.elements.modalInstansiValue().invoke('text').then((currentInstansiText) => {
      const cleanCurrent = currentInstansiText.trim();
      const targetNewInstansi = cleanCurrent.includes('QA') ? 'Academy Cazh' : 'Academy QA Engineer';
      ViolationTypePage.fillModalForm({ instansiText: targetNewInstansi });
    });

    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });

  it('PGT-18.41 Ubah field di form Edit -> klik Batal', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Meninggalkan Kelas Tanpa Izin' });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });

  it('PGT-18.42 Kosongkan Nama Tipe Pelanggaran di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().first().scrollIntoView().should('exist');
    ViolationTypePage.cancelForm();
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
    // 1. Buat data dummy terlebih dahulu untuk diedit
    const timestamp = Date.now().toString().slice(-4);
    const dummyName = `Dummy Edit Duplikat ${timestamp}`;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: dummyName,
      minPoin: '25',
      maxPoin: '30'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 2. Klik Edit pada data dummy yang baru dibuat
    cy.contains('tbody tr', dummyName)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)')
      .first()
      .click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.formModal().should('be.visible');

    // 3. Ganti nama dengan nama yang sudah ada dari PGT-18.22 ('Penggunaan Ponsel Saat KBM')
    ViolationTypePage.fillModalForm({ nama: 'Penggunaan Ponsel Saat KBM' });
    ViolationTypePage.saveForm();

    // 4. Verifikasi Notif Error 'Nama tipe pelanggaran sudah ada' / Toast error muncul
    ViolationTypePage.verifyValidationError('sudah');

    // 5. Data tidak tersimpan (modal tetap terbuka & tombol simpan tetap aktif)
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('be.enabled');

    // 6. Tutup modal secara manual agar tidak mengganggu tes berikutnya
    ViolationTypePage.cancelForm();
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

  it('PGT-18.49 Ubah Nama Tipe Pelanggaran jadi > 100 karakter -> pangkas 100 karakter & klik Simpan', () => {
    const longName = 'B'.repeat(105);
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: longName });
    cy.contains(/Batas 100 karakter tercapai/i, { timeout: 10000 }).scrollIntoView().should('be.visible');
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.contains('B'.repeat(100), { timeout: 10000 }).should('be.visible');
  });

  // ---------------------------------------------------------------------------
  // 5. INTEGRATION WITH CREATE VIOLATION FEATURE & DELETE LIFECYCLE
  // ---------------------------------------------------------------------------
  it("PGT-18.50 Set status 'Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    ViolationTypePage.visit();
    ViolationTypePage.ensureInactiveDataExists();

    // 1. Cari baris dengan status 'Tidak Aktif' dan dapatkan nama Instansi & Tipe Pelanggaran
    cy.contains('tbody tr', /tidak aktif/i).first().then(($row) => {
      const instansiName = $row.find('td').eq(0).text().trim();
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\n')[0].trim();
      const cleanInstansi = instansiName.split('\n')[0].trim();
      
      cy.wrap(cleanName).as('targetTypeName');
      cy.wrap(cleanInstansi).as('targetInstansiName');

      // 2. Klik Edit pada baris 'Tidak Aktif' tersebut secara stabil
      const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)');
      cy.wrap(editBtn.first()).scrollIntoView();
      cy.wait(800);
      cy.wrap(editBtn.first()).click({ force: true });
    });
    cy.wait(1200);
    ViolationTypePage.elements.formModal({ timeout: 15000 }).should('be.visible');

    // 3. Ubah status dari 'Tidak Aktif' menjadi 'Aktif' lalu Simpan
    ViolationTypePage.fillModalForm({ statusText: 'Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 4. Navigasi ke Halaman Pelanggaran (/student-affairs/violation)
    cy.get('@targetInstansiName').then((targetInstansiName) => {
      cy.get('@targetTypeName').then((targetTypeName) => {
        const instansiKeyword = targetInstansiName.slice(0, 10);
        const typeKeyword = targetTypeName.slice(0, 15);

        cy.visit('/student-affairs/violation', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('be.visible');
        cy.wait(2500);

        // 5. Klik tombol "Tambah Pelanggaran"
        cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
        cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

        // 5.5. Pilih Instansi yang MATCH dengan Instansi tipe pelanggaran yang diaktifkan
        cy.get('[role="dialog"]').then(($dialog) => {
          const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
          if (instansiTrigger.length > 0) {
            cy.wrap(instansiTrigger.first()).click({ force: true });
            cy.wait(800);
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(instansiKeyword, 'i')).first().click({ force: true });
            cy.wait(1200);
          }
        });

        // 6. Buka dropdown "Tipe Pelanggaran" di dalam dialog modal
        cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
          .find('[role="combobox"], [data-slot="select-trigger"]')
          .click({ force: true });
        cy.wait(1000);

        // 7. Verifikasi tipe pelanggaran yang diaktifkan muncul dan dapat dipilih
        cy.get('body').then(($body) => {
          if ($body.find('[role="option"], [data-slot="select-item"]').length > 0) {
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(typeKeyword, 'i')).should('be.visible').click({ force: true });
          } else {
            cy.get('select option').contains(new RegExp(typeKeyword, 'i')).should('exist');
          }
        });
      });
    });
  });

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    ViolationTypePage.visit();
    ViolationTypePage.ensureDataExists();

    // 1. Cari baris dengan status 'Aktif' dan dapatkan nama Instansi & Tipe Pelanggaran
    cy.contains('tbody tr', /aktif/i).first().then(($row) => {
      const instansiName = $row.find('td').eq(0).text().trim();
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\n')[0].trim();
      const cleanInstansi = instansiName.split('\n')[0].trim();
      
      cy.wrap(cleanName).as('targetTypeName');
      cy.wrap(cleanInstansi).as('targetInstansiName');

      // 2. Klik Edit pada baris 'Aktif' tersebut secara stabil
      const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)');
      cy.wrap(editBtn.first()).scrollIntoView();
      cy.wait(800);
      cy.wrap(editBtn.first()).click({ force: true });
    });
    cy.wait(1200);
    ViolationTypePage.elements.formModal({ timeout: 15000 }).should('be.visible');

    // 3. Ubah status dari 'Aktif' menjadi 'Tidak Aktif' lalu Simpan
    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 4. Navigasi ke Halaman Pelanggaran (/student-affairs/violation)
    cy.get('@targetInstansiName').then((targetInstansiName) => {
      cy.get('@targetTypeName').then((targetTypeName) => {
        const instansiKeyword = targetInstansiName.slice(0, 10);
        const typeKeyword = targetTypeName.slice(0, 15);

        cy.visit('/student-affairs/violation', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('be.visible');
        cy.wait(2500);

        // 5. Klik tombol "Tambah Pelanggaran"
        cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
        cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

        // 5.5. Pilih Instansi yang MATCH dengan Instansi tipe pelanggaran yang dinonaktifkan
        cy.get('[role="dialog"]').then(($dialog) => {
          const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
          if (instansiTrigger.length > 0) {
            cy.wrap(instansiTrigger.first()).click({ force: true });
            cy.wait(800);
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(instansiKeyword, 'i')).first().click({ force: true });
            cy.wait(1200);
          }
        });

        // 6. Buka dropdown "Tipe Pelanggaran" di dalam dialog modal
        cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
          .find('[role="combobox"], [data-slot="select-trigger"]')
          .click({ force: true });
        cy.wait(1000);

        // 7. Verifikasi tipe pelanggaran yang dinonaktifkan TIDAK muncul di dropdown pilihan aktif
        cy.get('body').then(($body) => {
          if ($body.find('[role="option"], [data-slot="select-item"]').length > 0) {
            cy.get('[role="option"], [data-slot="select-item"]').should('not.contain.text', typeKeyword);
          } else {
            cy.get('select option').should('not.contain.text', typeKeyword);
          }
        });
      });
    });
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
    ViolationTypePage.ensureDataExists();
    cy.get('tbody tr').first().then(($row) => {
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\n')[0].trim();

      ViolationTypePage.search(cleanName);
      ViolationTypePage.elements.tableRows().should('have.length', 1);
      ViolationTypePage.clickDeleteFirstRow();
      ViolationTypePage.confirmDelete();
      ViolationTypePage.elements.emptyState().should('be.visible');
    });
  });

  it('PGT-18.57 Tambah Pelanggaran -> Cek Tipe Pelanggaran di tabel -> Hapus Tipe di setting -> Cek kembali di Pelanggaran', () => {
    const targetTypeName = 'Meninggalkan Kelas Tanpa Izin';

    // 1. Clean up existing test data with this name if present
    ViolationTypePage.visit();
    ViolationTypePage.search(targetTypeName);
    ViolationTypePage.deleteAllDataIfExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiText: 'Academy QA Engineer', nama: targetTypeName, minPoin: '5', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    // 2. Buka Halaman Pelanggaran (/student-affairs/violation) & Tambah Pelanggaran
    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);

    cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

    // 2.1 Pilih Instansi "Academy QA Engineer"
    cy.get('[role="dialog"]').then(($dialog) => {
      const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
      if (instansiTrigger.length > 0) {
        cy.wrap(instansiTrigger.first()).click({ force: true });
        cy.wait(800);
        cy.get('[role="option"], [data-slot="select-item"]').contains(/Academy QA Engineer/i).click({ force: true });
        cy.wait(1200);
      }
    });

    // 2.2 Cari & Pilih Anggota ("rocky" -> Rocky Gibraltar)
    cy.get('[role="dialog"]').then(($dialog) => {
      const anggotaInput = $dialog.find('input[placeholder*="Cari Nomor Kartu"], input[placeholder*="Nama"]');
      if (anggotaInput.length > 0) {
        cy.wrap(anggotaInput.first()).clear({ force: true }).type('rocky', { force: true });
        cy.wait(1500);
        cy.contains('button', /Rocky Gibraltar|rocky/i, { timeout: 10000 })
          .scrollIntoView()
          .click({ force: true });
        cy.wait(800);
      }
    });

    // 2.3 Isi Tanggal Kejadian (Pilih Hari Ini pada Calendar)
    cy.get('[role="dialog"]').then(($dialog) => {
      const dateBtn = $dialog.find('button[name="date"], button:contains("DD/MM/YYYY")');
      if (dateBtn.length > 0) {
        cy.wrap(dateBtn.first()).click({ force: true });
        cy.wait(1000);
        cy.get('body').then(($body) => {
          const todayBtn = $body.find('button[aria-label*="Today"], td[data-today="true"] button, button.rdp-day_today');
          if (todayBtn.length > 0) {
            cy.wrap(todayBtn.first()).click({ force: true });
          } else {
            const dayCell = $body.find('table.rdp-month_grid tbody td button:not([disabled])');
            if (dayCell.length > 0) {
              cy.wrap(dayCell.last()).click({ force: true });
            }
          }
        });
        cy.wait(800);
      }
    });

    // 2.4 Pilih Tipe Pelanggaran yang baru dibuat
    cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
      .find('[role="combobox"], [data-slot="select-trigger"]')
      .click({ force: true });
    cy.wait(1000);
    cy.get('[role="option"], [data-slot="select-item"]').contains(targetTypeName).click({ force: true });
    cy.wait(800);

    // 2.5 Isi Kategori Pelanggaran
    cy.get('[role="dialog"]').then(($dialog) => {
      const catInput = $dialog.find('input[name="category"], input[placeholder*="Pelanggaran tata tertib"]');
      if (catInput.length > 0) {
        cy.wrap(catInput.first()).clear({ force: true }).type('Pelanggaran Tata Tertib', { force: true });
        cy.wait(500);
      }
    });

    // 2.6 Isi Poin Pelanggaran (Poin 100 sesuai range 100 - 110)
    cy.get('[role="dialog"]').then(($dialog) => {
      const pointInput = $dialog.find('input[name="point"], input[placeholder*="100"], input[type="number"]');
      if (pointInput.length > 0) {
        cy.wrap(pointInput.first()).clear({ force: true }).type('100', { force: true });
        cy.wait(500);
      }
    });

    // 2.7 Isi Sanksi
    cy.get('[role="dialog"]').then(($dialog) => {
      const penaltyInput = $dialog.find('input[name="penalty"], input[placeholder*="Peringatan tertulis"]');
      if (penaltyInput.length > 0) {
        cy.wrap(penaltyInput.first()).clear({ force: true }).type('Peringatan Tertulis', { force: true });
        cy.wait(500);
      }
    });

    // 2.8 Simpan Form Pelanggaran (dengan jeda untuk mencegah Rate Limit Exceeded)
    cy.wait(2000);
    cy.get('[role="dialog"]').find('button[type="submit"], button:contains("Simpan")').first().click({ force: true });
    cy.wait(3500);

    // 3. Verifikasi Tipe Pelanggaran ada di tabel /student-affairs/violation (termasuk elemen badge)
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('contain.text', targetTypeName);
        cy.get('td span[data-slot="badge"], td').contains(targetTypeName).should('be.visible');
      }
    });

    // 4. Kembali ke /setting/student-affairs/violation-type dan hapus Tipe Pelanggaran tersebut
    ViolationTypePage.visit();
    ViolationTypePage.search(targetTypeName);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    cy.wait(2000);

    // 5. Kembali lagi ke /student-affairs/violation dan verifikasi kolom Tipe Pelanggaran berubah menjadi <span>-</span>
    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('not.contain.text', targetTypeName);
        cy.get('table tbody td span').contains('-').should('be.visible');
      }
    });
  });
});
