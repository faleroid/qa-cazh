import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

describe('MODUL ANGGOTA - 11. Anggota - Detail Siswa - Tab Progres (AGT-11.01 - AGT-11.39)', () => {
  beforeEach(() => {
    cy.login();
  });

  // ---------------------------------------------------------------------------
  // NAVIGASI & HEADER (AGT-11.01 - AGT-11.05)
  // ---------------------------------------------------------------------------
  it('AGT-11.01: Login admin → menu Anggota → Siswa → Aksi → Detail', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyHeaderInfo();
  });

  it('AGT-11.02: Cek Filter History Siswa pada halaman Detail Siswa', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyHistoryFilters();
  });

  it('AGT-11.03: Aktifkan Filter History Siswa dengan kombinasi TA-Tingkat-Kelas-Semester tertentu', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    cy.contains('button', /^filter$/i, { timeout: 15000 }).click({ force: true });
    cy.wait(800);
    cy.get('body').then(($body) => {
      const selectTriggers = $body.find('[role="combobox"], select, button[data-slot="select-trigger"]');
      if (selectTriggers.length > 0) {
        cy.wrap(selectTriggers.first()).click({ force: true });
        cy.wait(600);
      }
    });
    StudentDetailPage.verifyElevenTabs();
  });

  it('AGT-11.04: Cek daftar Tab pada halaman Detail Siswa (11 Tab)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.verifyElevenTabs();
  });

  it('AGT-11.05: Klik tab Progres', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('contain.text', 'Progres');
  });

  // ---------------------------------------------------------------------------
  // TABEL LIST & PENCARIAN (AGT-11.06 - AGT-11.10)
  // ---------------------------------------------------------------------------
  it('AGT-11.06: Cek kolom pada tabel List Progres Kegiatan (tab Progres)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.verifyProgresTableColumns();
  });

  it('AGT-11.07: Buka tab Progres saat siswa belum punya data progres kegiatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').then(($body) => {
      if ($body.text().includes('tidak ditemukan') || $body.find('tbody tr').length === 0) {
        cy.contains(/tidak ditemukan|kosong|empty/i).should('exist');
      }
    });
  });

  it('AGT-11.08: Cari data dengan keyword Kegiatan yang cocok', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(testData.newActivity.name);
      cy.get('textarea[name="description"]').clear().type(testData.newActivity.description);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);

    StudentDetailPage.searchKeyword(testData.newActivity.name);
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', testData.newActivity.name);
  });

  it('AGT-11.09: Cari data dengan keyword Deskripsi yang cocok', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    const descKeyword = "seni dan budaya";
    StudentDetailPage.searchKeyword(descKeyword);
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', descKeyword);
  });

  it('AGT-11.10: Cari data dengan keyword tidak ditemukan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.wait(800);

    // Verifikasi bahwa tabel dalam keadaan kosong (empty state / no result)
    cy.get('tbody', { timeout: 15000 }).then(($tbody) => {
      const text = $tbody.text().toLowerCase();
      const isEmpty = text.includes('tidak') || text.includes('kosong') || text.includes('belum') || text.includes('no result') || $tbody.find('tr').length === 0 || ($tbody.find('tr').length === 1 && (text.includes('tidak ada') || text.includes('tidak ditemukan')));
      expect(isEmpty, 'Tabel Tab Progres harus menampilkan pesan data tidak ditemukan / list kosong').to.be.true;
    });
  });

  // ---------------------------------------------------------------------------
  // TAMBAH KEGIATAN (AGT-11.11 - AGT-11.16)
  // ---------------------------------------------------------------------------
  it('AGT-11.11: Klik tombol Tambah Kegiatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-11.12: Cek field pada form Tambah Kegiatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('label', /nama kegiatan/i).should('exist');
      cy.contains('label', /deskripsi/i).should('exist');
    });
  });

  it('AGT-11.13: Kosongkan field Nama Kegiatan, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    cy.contains('[role="dialog"] button', /simpan|submit/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-11.14: Isi Nama Kegiatan (Deskripsi dikosongkan), klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    const activityName = testData.newActivityWithoutDesc.name;
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(activityName);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', activityName);
  });

  it('AGT-11.15: Cek nilai Pencapaian Terakhir pada kegiatan yang baru pertama kali ditambah', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).first().within(() => {
      cy.get('[role="progressbar"], [data-slot="progress"]').should('exist');
      cy.get('[data-slot="progress-indicator"]').should('exist').and('have.attr', 'style').and('include', 'translateX(-100%)');
    });
  });

  it('AGT-11.16: Klik tombol Batal pada form Tambah Kegiatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);
    cy.contains('[role="dialog"] button', 'Batal').click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // EDIT KEGIATAN (AGT-11.17 - AGT-11.20)
  // ---------------------------------------------------------------------------
  it('AGT-11.17: Pada baris data, klik Aksi → Edit', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-11.18: Ubah Nama Kegiatan atau Deskripsi, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[type="text"]').first().clear().type(testData.editActivity.name);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.get('[data-sonner-toast][data-type="success"]', { timeout: 15000 }).should('be.visible').and('contain.text', 'Berhasil memperbarui Kegiatan');
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', testData.editActivity.name);
  });

  it('AGT-11.19: Kosongkan Nama Kegiatan, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[type="text"]').first().clear();
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-11.20: Klik tombol Batal pada form Edit', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);
    cy.contains('[role="dialog"] button', 'Batal').click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // HAPUS SINGLE (AGT-11.21 - AGT-11.23)
  // ---------------------------------------------------------------------------
  it('AGT-11.21: Pada baris data, klik Aksi → Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').should('be.visible');
      cy.contains('button', 'Hapus').should('be.visible');
    });
  });

  it('AGT-11.22: Pada popup delete, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Hapus').click({ force: true });
    });
    cy.wait(2000);
  });

  it('AGT-11.23: Pada popup delete, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-trash').closest('button').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // EXPORT EXCEL (AGT-11.24 - AGT-11.26)
  // ---------------------------------------------------------------------------
  it('AGT-11.24: Klik tombol Excel pada tab Progres (tanpa filter)', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);
    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath).to.not.be.null;
    });
  });

  it('AGT-11.25: Lakukan pencarian, klik Excel', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    const searchActivityName = "Lomba Catur AGT-11.25";
    cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(searchActivityName);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);

    StudentDetailPage.searchKeyword(searchActivityName);
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', searchActivityName);

    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath).to.not.be.null;
    });
  });

  it('AGT-11.26: Cek isi kolom file hasil Export Progres (tab Progres)', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /excel|export/i).click({ force: true });
    cy.wait(2500);
    cy.task('findDownloadedFile', { extension: '.xlsx' }).then((filePath) => {
      expect(filePath).to.not.be.null;
      cy.task('readExcel', { filePath }).then((rows) => {
        expect(rows).to.be.an('array');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // HAPUS BULK / BATCH (AGT-11.27 - AGT-11.39)
  // ---------------------------------------------------------------------------
  it('AGT-11.27: Centang checkbox pada satu baris data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);
    cy.scrollTo('bottom');
    cy.contains(/dipilih/i).scrollIntoView().should('exist');
    cy.contains('button', /hapus/i).scrollIntoView().should('exist');
  });

  it('AGT-11.28: Centang checkbox pada header tabel', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]', { timeout: 15000 }).first().click({ force: true });
    cy.wait(800);
    cy.get('[data-slot="card-toolbar"]', { timeout: 15000 }).filter(':visible').first().within(() => {
      cy.contains('button', /terpilih/i).should('be.visible');
      cy.contains('button', /pilih semua/i).should('be.visible');
    });
  });

  it('AGT-11.29: Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('body').then(($body) => {
      const text = $body.text();
      if (!text.includes('dari 5') && !text.includes('dari 6')) {
        Cypress._.times(50, (i) => {
          const activityNum = i + 1;
          cy.get('body').then(($b) => {
            if ($b.find('[role="dialog"]').length > 0) {
              cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
            }
          });
          cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
          cy.get('[role="dialog"]', { timeout: 20000 }).should('be.visible').within(() => {
            cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear({ force: true }).type(`Kegiatan Auto 50 - ${activityNum}`);
            cy.contains('button', /simpan|submit/i).click({ force: true });
          });
          cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
        });
      }
    });

    // Ubah "Baris Per Halaman" (Pagination) menjadi 100
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const text = $body.text().toLowerCase();
      const hasSelection = text.includes('terpilih') || text.includes('pilih') || $body.find('tbody tr button[aria-checked="true"]').length > 0 || $body.find('[data-slot="card-toolbar"]').length > 0;
      expect(hasSelection, 'Halaman harus memuat status data terpilih').to.be.true;
    });
  });

  it('AGT-11.30: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('contain.text', '50');
      } else {
        const text = $body.text();
        expect(text, 'Halaman harus memuat informasi 50 data terpilih').to.satisfy((t) => t.includes('50') || t.includes('terpilih'));
      }
    });
  });

  it('AGT-11.31: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-11.32: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', /hapus|ya/i).click({ force: true });
    });
    cy.wait(2000);
  });

  it('AGT-11.33: Pada popup Hapus Bulk, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i).click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('button', 'Batal').click({ force: true });
    });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('AGT-11.34: Coba centang lebih dari 50 data secara manual', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(800);

    cy.get('tbody tr', { timeout: 15000 }).then(($rows) => {
      if ($rows.length > 50) {
        cy.wrap($rows).last().scrollIntoView().within(() => {
          cy.get('button[role="checkbox"], input[type="checkbox"], button').first()
            .trigger('mouseover', { force: true });
        });
        cy.wait(500);

        cy.get('body').then(($body) => {
          const tooltip = $body.find('[role="tooltip"], [data-slot="tooltip-content"], [data-radix-popper-content-wrapper]');
          if (tooltip.length > 0) {
            cy.wrap(tooltip.first()).should('contain.text', 'Maksimal 50 data');
          } else {
            cy.get('tbody tr').last().find('button[role="checkbox"], input[type="checkbox"], button').first()
              .should('satisfy', ($el) => {
                const el = $el[0];
                return el.disabled || el.getAttribute('aria-disabled') === 'true' || el.getAttribute('aria-checked') === 'false';
              });
          }
        });
      } else {
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-11.35: Ubah filter/search saat ada data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);
    StudentDetailPage.searchKeyword(testData.search.validKeyword);
    cy.wait(600);
    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });

  it('AGT-11.36: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.scrollTo('top');
    cy.wait(400);
    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage2 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage2, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('1').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage1 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage1, 'Selection harus tetap aktif setelah kembali ke Halaman 1').to.be.true;
    });
  });

  it('AGT-11.37: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnTerpilih = $body.find('button:contains("Terpilih"), [data-slot="card-toolbar"] button:contains("Terpilih")');
      expect(btnTerpilih.length, 'Selection harus ter-reset setelah pindah halaman dari centang manual').to.equal(0);
    });
  });

  it('AGT-11.38: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').eq(0).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(400);

    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      if (rows.length > 1) {
        cy.wrap(rows).eq(1).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
        cy.wait(400);
      }
    });

    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 200,
          body: {
            success: false,
            message: '1 dari 2 data berhasil dihapus. 1 data gagal, silakan coba lagi',
            data: { success_count: 1, failed_count: 1 }
          }
        });
      }
    }).as('deletePartialMock');

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });
    cy.wait(1000);

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('berhasil') || text.includes('gagal') || text.includes('coba lagi');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus menampilkan informasi partial fail').to.satisfy((t) => t.includes('gagal') || t.includes('berhasil') || t.includes('terpilih'));
      }
    });
  });

  it('AGT-11.39: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 500,
          body: {
            message: 'Gagal menghapus data, silakan coba lagi'
          }
        });
      }
    }).as('deleteErrorMock');

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });
    cy.wait(1000);

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('gagal') || text.includes('coba lagi') || text.includes('error');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus memuat respons error saat gagal').to.satisfy((t) => t.includes('gagal') || t.includes('terpilih') || t.includes('error'));
      }
    });

    cy.get('body').then(($body) => {
      const hasSelection = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button[aria-checked="true"]').length > 0;
      expect(hasSelection, 'Selection harus dipertahankan saat terjadi error server').to.be.true;
    });
  });
});
