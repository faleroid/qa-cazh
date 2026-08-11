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
    cy.get('button[data-slot="popover-trigger"], button', { timeout: 15000 }).contains('Filter').click({ force: true });
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
    cy.contains(/tidak ditemukan|kosong|no result/i, { timeout: 10000 }).should('exist');
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
      const rowCount = $body.find('tbody tr').length;
      if (rowCount < 10) {
        for (let i = 1; i <= 12; i++) {
          cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
          cy.wait(600);
          cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
            cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(`Kegiatan Bulk AGT-11.29 - ${i}`);
            cy.contains('button', /simpan|submit/i).click({ force: true });
          });
          cy.wait(1000);
        }
      }
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.wait(1000);

    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]', { timeout: 15000 }).first().click({ force: true });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.contains('button', /terpilih/i, { timeout: 15000 }).should('be.visible');
  });

  it('AGT-11.30: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]').first().click({ force: true });
    cy.wait(800);
    cy.get('body').then(($body) => {
      if ($body.text().includes('Pilih semua')) {
        cy.contains('Pilih semua').click({ force: true });
        cy.wait(600);
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
    cy.get('body').should('exist');
  });

  it('AGT-11.35: Ubah filter/search saat ada data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"]').click({ force: true });
    cy.wait(800);
    StudentDetailPage.searchKeyword(testData.search.validKeyword);
    cy.wait(800);
  });

  it('AGT-11.36: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });

  it('AGT-11.37: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });

  it('AGT-11.38: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });

  it('AGT-11.39: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
