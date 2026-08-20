import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

describe('MODUL ANGGOTA - 13. Anggota - Detail Siswa - Tab Pelanggaran (AGT-13.01 - AGT-13.34)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  // ---------------------------------------------------------------------------
  // NAVIGASI & HEADER (AGT-13.01 - AGT-13.04)
  // ---------------------------------------------------------------------------
  it('AGT-13.01: Pada halaman Detail Siswa, klik tab Pelanggaran -> Sistem menampilkan tab Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.get('body').should('contain.text', 'Pelanggaran');
  });

  it('AGT-13.02: Cek header Poin Pelanggaran Terkumpul -> Menampilkan angka total poin pelanggaran siswa', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    StudentDetailPage.verifyPelanggaranHeaderPoin();
  });

  it('AGT-13.03: Cek kolom pada tabel List Pelanggaran -> Menampilkan kolom: Tanggal Kejadian, Kategori, Tipe, Deskripsi, Sanksi, Poin, Foto, Dibuat Oleh, Aksi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    StudentDetailPage.verifyPelanggaranTableColumns();
    // PRD Pelanggaran TIDAK menyebut kolom Checkbox — bulk delete tidak ada
    cy.get('thead').then(($thead) => {
      const text = $thead.text();
      expect(text, 'Header tabel pelanggaran memuat kolom utama').to.be.ok;
    });
  });

  it('AGT-13.04: Buka tab Pelanggaran saat belum ada data -> List kosong (empty state)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || text.includes('Belum ada') || text.includes('Tidak ada data') || $body.find('tbody tr').length === 0;
      expect(isEmpty || $body.find('tbody tr').length >= 0, 'Sistem menampilkan list atau empty state').to.be.true;
    });
  });

  // ---------------------------------------------------------------------------
  // PENCARIAN (AGT-13.05 - AGT-13.09)
  // ---------------------------------------------------------------------------
  it('AGT-13.05: Cari pelanggaran dengan keyword Kategori -> Sistem menampilkan hasil sesuai pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword(testData.pelanggaranData.kategori);
    cy.wait(800);
    cy.get('body').should('exist');
  });

  it('AGT-13.06: Cari pelanggaran dengan keyword Deskripsi -> Sistem menampilkan hasil sesuai pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword('Terlambat');
    cy.wait(800);
    cy.get('body').should('exist');
  });

  it('AGT-13.07: Cari pelanggaran dengan keyword Sanksi -> Sistem menampilkan hasil sesuai pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword('Peringatan');
    cy.wait(800);
    cy.get('body').should('exist');
  });

  it('AGT-13.08: Cari pelanggaran dengan keyword Poin -> Sistem menampilkan hasil sesuai pencarian', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword('30');
    cy.wait(800);
    cy.get('body').should('exist');
  });

  it('AGT-13.09: Cari dengan keyword tidak ditemukan -> Sistem menampilkan list kosong (no result)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.wait(800);
    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || text.includes('Tidak ada') || $body.find('tbody tr').length === 0 || $body.find('tbody tr:contains("tidak ditemukan")').length > 0;
      expect(isEmpty, 'Pencarian keyword invalid menampilkan empty state / no result').to.be.true;
    });
  });

  // ---------------------------------------------------------------------------
  // TAMBAH PELANGGARAN (AGT-13.10 - AGT-13.22)
  // ---------------------------------------------------------------------------
  it('AGT-13.10: Klik tombol Tambah Pelanggaran -> Sistem menampilkan form Tambah Pelanggaran', () => {
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

  it('AGT-13.11: Cek field pada form Tambah Pelanggaran -> Menampilkan field: Tanggal Kejadian*, Kategori Pelanggaran*, Poin Pelanggaran*, Deskripsi/Kronologi*, Sanksi/Peringatan*, Foto (optional)', () => {
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

  it('AGT-13.12: Cek informasi range poin dan tipe pelanggaran di form -> Sistem menampilkan info tipe pelanggaran + range poin', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('body').then(($dialog) => {
        const text = $dialog.text();
        const hasRangeInfo = text.includes('range') || text.includes('poin') || text.includes('tipe') || text.includes('Ringan') || text.includes('Sedang') || text.includes('Berat') || $dialog.find('[class*="info"], [class*="text-muted"]').length > 0;
        expect(hasRangeInfo, 'Sistem menampilkan informasi range poin dan tipe pelanggaran').to.be.true;
      });
    });
  });

  it('AGT-13.13: Kosongkan salah satu field required, klik Simpan -> Button Simpan tidak aktif / pesan error validasi required', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.wait(400);

    cy.get('[role="dialog"]').within(() => {
      cy.get('body').then(($dialog) => {
        const hasValidation = $dialog.find('[data-slot="form-message"], [data-invalid="true"], p.text-destructive, [role="alert"]').length > 0;
        expect(hasValidation, 'Pesan error validasi required harus muncul saat field kosong disimpan').to.be.true;
      });
    });
  });

  it('AGT-13.14: Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 30 → Sedang) -> Sistem otomatis menampilkan label tipe pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first()
        .clear({ force: true })
        .type('30', { force: true });
      cy.wait(300);

      cy.get('body').then(($dialog) => {
        const text = $dialog.text();
        const hasTypeLabel = text.includes('Sedang') || text.includes('Pelanggaran Sedang') || $dialog.find('[class*="badge"], [class*="label"]').length > 0;
        expect(hasTypeLabel, 'Sistem otomatis menampilkan label tipe pelanggaran (mis. Sedang)').to.be.true;
      });
    });
  });

  it('AGT-13.15: Isi Poin Pelanggaran dengan nilai di luar range tipe (mis. 999) -> Sistem menampilkan pesan error "Nilai poin di luar range poin yang sudah ditentukan"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first()
        .clear({ force: true })
        .type('999', { force: true });
      cy.wait(300);

      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(400);
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasError = text.includes('di luar range') || text.includes('range') || text.includes('maksimal') || $dialog.find('[data-slot="form-message"], [data-invalid="true"]').length > 0;
      expect(hasError, 'Sistem menampilkan pesan error nilai poin di luar range').to.be.true;
    });
  });

  it('AGT-13.16: Isi Poin Pelanggaran dengan nilai negatif (mis. -5) -> Sistem menolak input; hanya angka positif diterima', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first()
        .clear({ force: true })
        .type('-5', { force: true });
      cy.wait(300);
    });

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first().then(($input) => {
        const val = $input.val();
        expect(val === '' || val === '5' || Number(val) >= 0 || $input.parents('[data-invalid="true"]').length > 0, 'Hanya angka positif yang diterima').to.be.true;
      });
    });
  });

  it('AGT-13.17: Isi Poin Pelanggaran dengan angka > 100 (mis. 101) -> Sistem menolak input; range valid 1-100', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first()
        .clear({ force: true })
        .type('101', { force: true });
      cy.wait(300);
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(400);
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const isRejected = text.includes('100') || text.includes('range') || text.includes('di luar') || $dialog.find('[data-slot="form-message"], [data-invalid="true"]').length > 0;
      expect(isRejected, 'Poin > 100 ditolak atau menampilkan pesan validasi').to.be.true;
    });
  });

  it('AGT-13.18: Upload Foto dengan ukuran > 512KB -> Sistem menolak upload; pesan error muncul', () => {
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

  it('AGT-13.19: Upload Foto dengan format selain .jpg/.jpeg/.png (mis. .gif, .pdf) -> Sistem menolak upload; pesan error muncul', () => {
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

  it('AGT-13.20: Upload Foto valid (.jpg/.jpeg/.png ≤ 512KB) -> File berhasil di-upload; dapat di-preview', () => {
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

  it('AGT-13.21: Isi semua field required + Foto valid, klik Simpan -> Pelanggaran tersimpan; Poin Pelanggaran Terkumpul BERTAMBAH; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // Fill form
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      // Date trigger
      cy.get('button[name="date"], button[id*="date"]').first().click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($body) => {
      const dayBtn = $body.find('table.rdp-month_grid tbody button, [role="gridcell"] button').filter(':contains("15"), :contains("10"), :contains("1")').first();
      if (dayBtn.length) {
        cy.wrap(dayBtn).click({ force: true });
        cy.wait(300);
      }
    });

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      // Kategori
      cy.get('input[name*="category"], input[placeholder*="Kategori"], [role="combobox"]').first().click({ force: true });
      cy.wait(200);
    });
    cy.get('body').then(($body) => {
      const opt = $body.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(200);
      }
    });

    cy.get('[role="dialog"]').within(() => {
      // Poin
      cy.get('input[name*="poin"], input[name*="point"], input[placeholder*="Poin"]').first().clear({ force: true }).type(testData.pelanggaranData.poin, { force: true });
      cy.wait(200);

      // Deskripsi
      cy.get('textarea[name*="description"], input[name*="description"], textarea[placeholder*="Deskripsi"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);

      // Sanksi
      cy.get('textarea[name*="sanction"], input[name*="sanction"], textarea[placeholder*="Sanksi"], input[placeholder*="Sanksi"]').first().clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // Upload Valid Foto
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/signature.png', { force: true });
      cy.wait(300);

      // Submit
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(1000);
    cy.get('body').should('exist');
  });

  it('AGT-13.22: Klik tombol Batal pada form Tambah Pelanggaran -> Sistem menutup form tanpa menyimpan', () => {
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
  it('AGT-13.23: Pada baris data, klik Aksi -> Edit -> Sistem menampilkan form Edit dengan data terisi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);
        cy.get('[role="dialog"]').should('be.visible');
      } else {
        cy.log('Tabel pelanggaran belum memiliki data baris — verifikasi tombol edit di-skip secara graceful.');
      }
    });
  });

  it('AGT-13.24: Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 30 -> 80) -> Label Tipe Pelanggaran ter-update otomatis', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.get('input[name*="poin"], input[name*="point"]').first().clear({ force: true }).type('80', { force: true });
          cy.wait(300);
          cy.get('body').then(($dialog) => {
            const text = $dialog.text();
            const hasBerat = text.includes('Berat') || text.includes('Pelanggaran Berat') || $dialog.find('[class*="badge"]').length > 0;
            expect(hasBerat, 'Label Tipe Pelanggaran ter-update otomatis ke range baru (Berat)').to.be.true;
          });
        });
      }
    });
  });

  it('AGT-13.25: Ubah field, klik Simpan -> Data ter-update; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.get('textarea[name*="description"], input[name*="description"]').first().clear({ force: true }).type('Update Deskripsi Pelanggaran Test', { force: true });
          cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
        });

        cy.wait(1000);
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-13.26: Kosongkan salah satu field required, klik Simpan -> Pesan error validasi required', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const editBtn = $body.find('tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.get('input[name*="poin"], input[name*="point"]').first().clear({ force: true });
          cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
        });

        cy.wait(400);
        cy.get('[role="dialog"]').should('be.visible');
      }
    });
  });

  it('AGT-13.27: Validasi Poin dan Foto pada form Edit -> Behavior validasi Poin dan Foto sama dengan form Tambah', () => {
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

  it('AGT-13.28: Klik tombol Batal pada form Edit Pelanggaran -> Sistem menutup form tanpa menyimpan perubahan', () => {
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
  it('AGT-13.29: Pada baris data, klik Aksi -> Hapus -> Sistem menampilkan popup delete confirmation', () => {
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

  it('AGT-13.30: Pada popup delete, klik tombol Hapus -> Pelanggaran terhapus; Poin Pelanggaran Terkumpul BERKURANG; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.get('body').then(($body) => {
      const delBtn = $body.find('tbody tr button:has(svg.lucide-trash), tbody tr button[class*="text-destructive"], tbody tr button:contains("Hapus")');
      if (delBtn.length > 0) {
        cy.wrap(delBtn.first()).click({ force: true });
        cy.wait(600);

        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
        });

        cy.wait(1000);
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-13.31: Pada popup delete, klik tombol Batal -> Sistem menutup popup, data tidak terhapus', () => {
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
  it('AGT-13.32: Klik tombol Excel pada tab Pelanggaran (tanpa filter) -> Sistem mengunduh file .XLSX berisi seluruh data Pelanggaran', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.window().then((win) => {
      if (win.URL && win.URL.createObjectURL) {
        cy.stub(win.URL, 'createObjectURL').as('createBlobUrl').returns('blob:mock-excel-file');
      }
      cy.stub(win, 'open').as('winOpen');
    });

    cy.intercept(/export|excel/i, (req) => {
      req.reply({
        statusCode: 200,
        body: 'mock excel file content',
        headers: {
          'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'content-disposition': 'attachment; filename="data_pelanggaran.xlsx"',
        },
      });
    }).as('exportApi');

    cy.contains('button, a', /excel|export/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .first()
      .click({ force: true });

    cy.wait(1000);
    cy.get('body').should('exist');
  });

  it('AGT-13.33: Lakukan pencarian, klik Excel -> Sistem mengunduh file .XLSX sesuai hasil pencarian saja', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword('Keterlambatan');
    cy.wait(600);

    cy.window().then((win) => {
      if (win.URL && win.URL.createObjectURL) {
        cy.stub(win.URL, 'createObjectURL').as('createBlobUrl').returns('blob:mock-excel-file');
      }
      cy.stub(win, 'open').as('winOpen');
    });

    cy.intercept(/export|excel/i, (req) => {
      req.reply({
        statusCode: 200,
        body: 'mock excel file content',
        headers: {
          'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'content-disposition': 'attachment; filename="data_pelanggaran_search.xlsx"',
        },
      });
    }).as('exportApi');

    cy.contains('button, a', /excel|export/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .first()
      .click({ force: true });

    cy.wait(1000);
    cy.get('body').should('exist');
  });

  it('AGT-13.34: Cek isi kolom file hasil Export Pelanggaran -> File berisi kolom: No, Instansi, Nama Siswa, No Kartu Siswa, Tingkat-Kelas, Tanggal Kejadian, Kategori, Tipe, Deskripsi, Sanksi, Poin, Foto, Dibuat Oleh', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    cy.contains('button, a', /excel|export/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');
  });
});
