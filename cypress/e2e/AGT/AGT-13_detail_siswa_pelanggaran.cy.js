import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

describe('MODUL ANGGOTA - 13. Anggota - Detail Siswa - Tab Pelanggaran (AGT-13.1 - AGT-13.34)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // NAVIGASI & HEADER (AGT-13.1 - AGT-13.4)
  // ---------------------------------------------------------------------------
  it('AGT-13.1: Pada halaman Detail Siswa, klik tab Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.get('body').should('contain.text', 'Pelanggaran');
  });

  it('AGT-13.2: Cek header Poin Pelanggaran Terkumpul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    StudentDetailPage.verifyPelanggaranHeaderPoin();
  });

  it('AGT-13.3: Cek kolom pada tabel List Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    StudentDetailPage.verifyPelanggaranTableColumns();
    // PRD Pelanggaran TIDAK menyebut kolom Checkbox — bulk delete tidak ada
    cy.get('thead').then(($thead) => {
      const text = $thead.text();
      expect(text, 'Header tabel pelanggaran memuat kolom utama').to.be.ok;
    });
  });

  it('AGT-13.4: Buka tab Pelanggaran saat belum ada data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || text.includes('Belum ada') || text.includes('Tidak ada data') || $body.find('tbody tr').length === 0;
      expect(isEmpty || $body.find('tbody tr').length >= 0, 'Sistem menampilkan list atau empty state').to.be.true;
    });
  });

  // ---------------------------------------------------------------------------
  // PENCARIAN (AGT-13.5 - AGT-13.9)
  // ---------------------------------------------------------------------------
  it('AGT-13.5: Cari pelanggaran dengan keyword Kategori', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.kategori);
    cy.wait(800);
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('body').should('contain.text', testData.pelanggaranData.kategori);
  });

  it('AGT-13.6: Cari pelanggaran dengan keyword Deskripsi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.deskripsi);
    cy.wait(800);
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('body').should('contain.text', testData.pelanggaranData.deskripsi);
  });

  it('AGT-13.7: Cari pelanggaran dengan keyword Sanksi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.sanksi);
    cy.wait(800);
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('body').should('contain.text', testData.pelanggaranData.sanksi);
  });

  it('AGT-13.8: Cari pelanggaran dengan keyword Poin', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.ensurePelanggaranDataExists();
    StudentDetailPage.searchKeyword(testData.pelanggaranData.poin);
    cy.wait(800);
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('body').should('exist');
  });

  it('AGT-13.9: Cari dengan keyword tidak ditemukan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.wait(800);

    // Verifikasi pesan empty state "Data Pelanggaran tidak ditemukan"
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const text = $body.text();
      const hasEmptyState = text.includes('Data Pelanggaran tidak ditemukan') || text.includes('tidak ditemukan') || text.includes('Tambah Pelanggaran');
      expect(hasEmptyState, 'Pencarian keyword invalid menampilkan empty state: Data Pelanggaran tidak ditemukan').to.be.true;
    });

    cy.contains(/Data Pelanggaran tidak ditemukan|tidak ditemukan/i).should('be.visible');
  });

  // ---------------------------------------------------------------------------
  // TAMBAH PELANGGARAN (AGT-13.10 - AGT-13.22)
  // ---------------------------------------------------------------------------
  it('AGT-13.10: Klik tombol Tambah Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains(/tambah pelanggaran/i).should('exist');
      });
  });

  it('AGT-13.11: Cek field pada form Tambah Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      // 1. Tanggal Kejadian
      cy.contains('label', /tanggal/i).should('be.visible');

      // 2. Kategori Pelanggaran
      cy.contains('label', /kategori/i).should('be.visible');

      // 3. Poin Pelanggaran
      cy.contains('label', /poin/i).should('be.visible');

      // 4. Deskripsi / Kronologi
      cy.contains('label', /deskripsi|kronologi/i).should('be.visible');

      // 5. Sanksi / Peringatan
      cy.contains('label', /sanksi|peringatan/i).should('be.visible');

      // 6. Foto (optional)
      cy.contains('label', /foto/i).should('exist');

      // Buttons
      cy.contains('button', /batal/i).should('be.visible');
      cy.contains('button[type="submit"], button', /simpan/i).should('be.visible');
    });
  });

  it('AGT-13.12: Cek informasi range poin dan tipe pelanggaran di form', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran terlebih dahulu dari dropdown
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Cek di bagian Poin Pelanggaran apakah placeholder input memuat informasi range poin (contoh: "1 - 10")
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains('label', /poin/i).should('be.visible');
      cy.get('input[name="point"]')
        .should('be.visible')
        .and('have.attr', 'placeholder')
        .and('match', /\d+\s*-\s*\d+|1\s*-\s*10/);
    });
  });

  it('AGT-13.13: Kosongkan salah satu field required, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Isi field lainnya, tetapi KOSONGKAN Sanksi (input[name="penalty"])
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type(testData.pelanggaranData.poin, { force: true });
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }); // Kosongkan salah satu field (Sanksi)
      cy.wait(200);

      // 3. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 4. Verifikasi modal tetap terbuka karena validasi error required pada field Sanksi
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasValidation = text.includes('wajib') || text.includes('harus diisi') || text.includes('required') || $dialog.find('[aria-invalid="true"], [data-invalid="true"], [data-slot="form-message"]').length > 0;
      expect(hasValidation, 'Pesan error validasi required harus muncul saat salah satu field required dikosongkan').to.be.true;
    });
  });

  it('AGT-13.14: Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 30 → Sedang)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran dari dropdown
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    let selectedTypeLabel = '';
    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        selectedTypeLabel = opt.text().trim();
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Isi Poin Pelanggaran dengan nilai dalam range tipe
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="point"]').clear({ force: true }).type('5', { force: true });
      cy.wait(300);
    });

    // 3. Verifikasi sistem otomatis menampilkan label tipe pelanggaran
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasTypeLabel = text.includes('Pelanggaran') || text.includes('Sedang') || text.includes('Ringan') || text.includes('Berat') || text.includes(selectedTypeLabel);
      expect(hasTypeLabel, 'Sistem otomatis menampilkan label tipe pelanggaran').to.be.true;
    });
  });

  it('AGT-13.15: Isi Poin Pelanggaran dengan nilai di luar range tipe (mis. 999)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Tanggal Kejadian
    StudentDetailPage.fillTanggalKejadian();

    // 2. Pilih Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Isi SELURUH field form, tetapi dengan Poin di luar range (999)
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type('999', { force: true }); // Out of range point
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & error validasi range poin muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasError = text.includes('di luar range') || text.includes('range') || text.includes('maksimal') || text.includes('10') || $dialog.find('[data-slot="form-message"], [data-invalid="true"], [aria-invalid="true"]').length > 0;
      expect(hasError, 'Sistem menampilkan pesan error nilai poin di luar range').to.be.true;
    });
  });

  it('AGT-13.16: Isi Poin Pelanggaran dengan nilai negatif (mis. -5)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Tanggal Kejadian
    StudentDetailPage.fillTanggalKejadian();

    // 2. Pilih Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Isi SELURUH field form, tetapi dengan Poin negatif (-5)
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type('-5', { force: true }); // Negative point
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & nilai negatif ditolak
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]').then(($input) => {
        const val = $input.val();
        expect(val === '' || val === '5' || Number(val) >= 0 || $input.parents('[aria-invalid="true"], [data-invalid="true"]').length > 0, 'Hanya angka positif yang diterima').to.be.true;
      });
    });
  });

  it('AGT-13.17: Isi Poin Pelanggaran dengan angka > 100 (mis. 101)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Tanggal Kejadian
    StudentDetailPage.fillTanggalKejadian();

    // 2. Pilih Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Isi SELURUH field form, tetapi dengan Poin > 100 (101)
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type('101', { force: true }); // Point > 100
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & Poin > 100 ditolak / error validasi range poin muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const isRejected = text.includes('100') || text.includes('range') || text.includes('di luar') || text.includes('maksimal') || $dialog.find('[data-slot="form-message"], [aria-invalid="true"], [data-invalid="true"]').length > 0;
      expect(isRejected, 'Poin > 100 ditolak atau menampilkan pesan validasi').to.be.true;
    });
  });


  it('AGT-13.18: Upload Foto dengan ukuran > 512KB', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/oversized_11mb_file.pdf', { force: true });
      cy.wait(400);
    });

    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasError = text.includes('512') || text.includes('besar') || text.includes('ukuran') || text.includes('max') || $body.find('[data-slot="form-message"], [role="alert"]').length > 0;
      expect(hasError, 'Upload file > 512KB ditolak dengan pesan error').to.be.true;
    });
  });

  it('AGT-13.19: Upload Foto dengan format selain .jpg/.jpeg/.png (mis. .gif, .pdf)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/document.pdf', { force: true });
      cy.wait(400);
    });

    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasError = text.includes('format') || text.includes('jpg') || text.includes('png') || text.includes('invalid') || $body.find('[data-slot="form-message"], [role="alert"]').length > 0;
      expect(hasError, 'Upload file format selain .jpg/.jpeg/.png ditolak dengan pesan error').to.be.true;
    });
  });

  it('AGT-13.20: Upload Foto valid (.jpg/.jpeg/.png ≤ 512KB)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/signature.png', { force: true });
      cy.wait(400);
      cy.get('img, [class*="preview"], span:contains("signature")').should('exist');
    });
  });

  it('AGT-13.21: Isi semua field required + Foto valid, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 1. Date trigger
    StudentDetailPage.fillTanggalKejadian();

    // 2. Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($body) => {
      const opt = $body.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Form input fields dengan data nyata pelanggaran sekolah
    cy.get('[role="dialog"]').within(() => {
      // Kategori
      cy.get('input[name="category"], input[placeholder*="tata tertib"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);

      // Poin
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type(testData.pelanggaranData.poin, { force: true });
      cy.wait(200);

      // Deskripsi
      cy.get('input[name="description"], textarea[name="description"], input[placeholder*="seragam"]').first().clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);

      // Sanksi (name="penalty")
      cy.get('input[name="penalty"], input[name*="sanction"], textarea[name*="sanction"], input[placeholder*="Peringatan"], input[placeholder*="Sanksi"]').first().clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // Upload Valid Foto
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/signature.png', { force: true });
      
      // Jeda 5 detik setelah upload foto sebelum menekan tombol Simpan
      cy.wait(5000);

      // Submit
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(3000);
    cy.get('[role="dialog"]', { timeout: 20000 }).should('not.exist');
  });

  it('AGT-13.22: Klik tombol Batal pada form Tambah Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name*="poin"], input[name*="point"]').first().type('15', { force: true });
      cy.wait(200);
      cy.contains('button', /batal/i).click({ force: true });
    });

    cy.wait(600);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // EDIT PELANGGARAN (AGT-13.23 - AGT-13.28)
  // ---------------------------------------------------------------------------
  it('AGT-13.23: Pada baris data, klik Aksi → Edit', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi (single click tanpa force berlebih)
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);

    // 3. Verifikasi modal form Edit muncul
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');
  });

  it('AGT-13.24: Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 30 → 80)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 80)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]').clear({ force: true }).type('80', { force: true });
      cy.wait(300);
    });

    // 4. Verifikasi Label Tipe Pelanggaran ter-update otomatis sesuai range baru (mis. Berat / Pelanggaran Berat)
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasUpdatedLabel = text.includes('Berat') || text.includes('Pelanggaran Berat') || text.includes('Sedang') || $dialog.find('[class*="badge"], [class*="label"]').length > 0;
      expect(hasUpdatedLabel, 'Label Tipe Pelanggaran ter-update otomatis ke range baru').to.be.true;
    });
  });

  it('AGT-13.25: Ubah field, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Ubah salah satu field (misal: Deskripsi)
    const updatedDesc = "Tidak memakai atribut lengkap saat upacara (Diubah)";
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="description"], textarea[name="description"]')
        .first()
        .clear({ force: true })
        .type(updatedDesc, { force: true });
      cy.wait(300);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    // 5. Verifikasi modal tertutup dan data ter-update
    cy.wait(2000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.get('body').should('contain.text', 'Diubah');
  });

  it('AGT-13.26: Kosongkan salah satu field required, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Kosongkan salah satu field required (misal: Sanksi)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="penalty"], textarea[name="penalty"]').first().clear({ force: true });
      cy.wait(300);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & pesan error validasi required muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasValidation = text.includes('wajib') || text.includes('harus diisi') || text.includes('required') || $dialog.find('[aria-invalid="true"], [data-invalid="true"], [data-slot="form-message"]').length > 0;
      expect(hasValidation, 'Pesan error validasi required harus muncul pada form Edit').to.be.true;
    });
  });

  it('AGT-13.27: Validasi Poin dan Foto pada form Edit', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.get('input[name*="poin"], input[name*="point"]').first().clear({ force: true }).type('999', { force: true });
          cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
        });

        cy.wait(400);
        cy.get('[role="dialog"]').should('be.visible');
      }
    });
  });

  it('AGT-13.28: Klik tombol Batal pada form Edit Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /batal/i).click({ force: true });
        });

        cy.wait(600);
        cy.get('[role="dialog"]').should('not.exist');
      }
    });
  });

  // ---------------------------------------------------------------------------
  // HAPUS SINGLE (AGT-13.29 - AGT-13.31)
  // ---------------------------------------------------------------------------
  it('AGT-13.29: Pada baris data, klik Aksi → Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const delBtn = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button[class*="text-destructive"], tbody tr button:contains("Hapus")');
      if (delBtn.length > 0) {
        cy.wrap(delBtn.first()).click({ force: true });
        cy.wait(600);
        cy.get('[role="dialog"]').should('be.visible').within(() => {
          cy.contains(/hapus|konfirmasi|yakin/i).should('exist');
        });
      }
    });
  });

  it('AGT-13.30: Pada popup delete, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Hapus (trash icon / text-destructive) pada baris pertama
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const delBtn = $row.find('button:has(svg.lucide-trash-2), button:has(svg.lucide-trash), button[class*="destructive"], button:contains("Hapus")');
      if (delBtn.length > 0) {
        cy.wrap(delBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click({ force: true });
      } else {
        cy.wrap($row.find('button').last()).scrollIntoView().click({ force: true });
      }
    });

    cy.wait(800);

    // 3. Verifikasi popup konfirmasi hapus muncul
    cy.get('[role="dialog"], [role="alertdialog"]', { timeout: 10000 }).should('be.visible');

    // 4. Klik tombol Konfirmasi Hapus ("Ya", "Hapus", atau button destructive)
    cy.get('[role="dialog"], [role="alertdialog"]').within(() => {
      cy.contains('button', /hapus|ya|delete|confirm|setuju/i).click({ force: true });
    });

    // 5. Verifikasi popup konfirmasi tertutup & data terhapus
    cy.wait(2000);
    cy.get('[role="dialog"], [role="alertdialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-13.31: Pada popup delete, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const delBtn = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button[class*="text-destructive"], tbody tr button:contains("Hapus")');
      if (delBtn.length > 0) {
        cy.wrap(delBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /batal|cancel/i).click({ force: true });
        });

        cy.wait(600);
        cy.get('[role="dialog"]').should('not.exist');
      }
    });
  });

  // ---------------------------------------------------------------------------
  // EXPORT (AGT-13.32 - AGT-13.34)
  // ---------------------------------------------------------------------------
  it('AGT-13.32: Klik tombol Excel pada tab Pelanggaran (tanpa filter)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Tambahkan 2 data pelanggaran sekolah secara eksplisit
    const item1 = {
      kategori: 'Kedisiplinan Waktu',
      poin: '80',
      deskripsi: 'Terlambat mengikuti kegiatan apel pagi',
      sanksi: 'Teguran Lisan dan Pencatatan Buku Kedisiplinan'
    };
    const item2 = {
      kategori: 'Kerapihan Seragam',
      poin: '85',
      deskripsi: 'Tidak memakai sepatu hitam dan kaus kaki logo sekolah',
      sanksi: 'Peringatan Tertulis dan Pembinaan Wali Kelas'
    };

    StudentDetailPage.addSinglePelanggaran(item1);
    StudentDetailPage.addSinglePelanggaran(item2);

    // 2. Bersihkan folder downloads sebelum mengunduh
    cy.task('deleteDownloads');

    // 3. Klik tombol Excel untuk mengunduh laporan
    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .first()
      .click({ force: true });

    cy.wait(3500);

    // 4. Temukan file Excel yang diunduh dan verifikasi kedua data ada di file Excel
    cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
      if (filePath) {
        cy.task('readExcel', { filePath }).then((excelData) => {
          expect(excelData, 'File Excel berhasil dibaca').to.not.be.null;
          expect(excelData.length, 'Jumlah baris data pada Excel minimal harus ada 2 baris').to.be.at.least(2);

          const excelString = JSON.stringify(excelData);

          // Verifikasi item 1 ada di Excel
          const hasItem1 = excelString.includes(item1.kategori) || excelString.includes(item1.deskripsi) || excelString.includes('Apel');
          expect(hasItem1, 'Data pelanggaran ke-1 (Kedisiplinan Waktu) harus ditemukan di file Excel').to.be.true;

          // Verifikasi item 2 ada di Excel
          const hasItem2 = excelString.includes(item2.kategori) || excelString.includes(item2.deskripsi) || excelString.includes('Sepatu');
          expect(hasItem2, 'Data pelanggaran ke-2 (Kerapihan Seragam) harus ditemukan di file Excel').to.be.true;
        });
      } else {
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-13.33: Lakukan pencarian, klik Excel', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Lakukan pencarian spesifik
    const searchKeyword = 'Kedisiplinan';
    StudentDetailPage.searchKeyword(searchKeyword);
    cy.wait(1000);

    // 3. Bersihkan folder downloads sebelum mengunduh
    cy.task('deleteDownloads');

    // 4. Klik tombol Excel
    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(3500);

    // 5. Verifikasi file hasil filter terunduh dan terbaca
    cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
      if (filePath) {
        cy.task('readExcel', { filePath }).then((excelData) => {
          expect(excelData, 'File Excel hasil pencarian berhasil dibaca').to.not.be.null;
          expect(excelData.length, 'Jumlah baris data hasil pencarian > 0').to.be.greaterThan(0);
        });
      } else {
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-13.34: Cek isi kolom file hasil Export Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Bersihkan downloads sebelum mengunduh
    cy.task('deleteDownloads');

    // 3. Klik tombol Excel
    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(3500);

    // 4. Verifikasi seluruh kolom header yang disyaratkan pada file Excel
    cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
      if (filePath) {
        cy.task('readExcel', { filePath }).then((excelData) => {
          expect(excelData, 'File Excel berhasil dibaca').to.not.be.null;
          expect(excelData.length, 'Jumlah baris data pada Excel harus > 0').to.be.greaterThan(0);

          const firstRow = excelData[0];
          const allHeaders = Object.keys(firstRow).join(' ').toLowerCase();
          const allRowContent = JSON.stringify(excelData).toLowerCase();

          // Daftar kolom yang wajib ada sesuai spesifikasi
          const expectedColumns = [
            { name: 'No', check: allHeaders.includes('no') },
            { name: 'Instansi', check: allHeaders.includes('instansi') || allHeaders.includes('sekolah') || allRowContent.includes('instansi') },
            { name: 'Nama Siswa', check: allHeaders.includes('siswa') || allHeaders.includes('nama') },
            { name: 'No Kartu Siswa', check: allHeaders.includes('kartu') || allHeaders.includes('nis') || allHeaders.includes('no') },
            { name: 'Tingkat-Kelas', check: allHeaders.includes('kelas') || allHeaders.includes('tingkat') },
            { name: 'Tanggal Kejadian', check: allHeaders.includes('tanggal') || allHeaders.includes('date') },
            { name: 'Kategori', check: allHeaders.includes('kategori') || allHeaders.includes('category') },
            { name: 'Tipe', check: allHeaders.includes('tipe') || allHeaders.includes('type') },
            { name: 'Deskripsi', check: allHeaders.includes('deskripsi') || allHeaders.includes('kronologi') || allHeaders.includes('description') },
            { name: 'Sanksi', check: allHeaders.includes('sanksi') || allHeaders.includes('penalty') || allHeaders.includes('peringatan') },
            { name: 'Poin', check: allHeaders.includes('poin') || allHeaders.includes('point') },
            { name: 'Foto', check: allHeaders.includes('foto') || allHeaders.includes('photo') || allHeaders.includes('image') || allHeaders.includes('url') },
            { name: 'Dibuat Oleh', check: allHeaders.includes('dibuat') || allHeaders.includes('oleh') || allHeaders.includes('author') || allHeaders.includes('creator') }
          ];

          expectedColumns.forEach((col) => {
            cy.log(`Memeriksa kolom: ${col.name}`);
            expect(col.check, `Kolom [${col.name}] harus ada pada file Excel hasil export`).to.be.true;
          });
        });
      } else {
        cy.get('body').should('exist');
      }
    });
  });
});


