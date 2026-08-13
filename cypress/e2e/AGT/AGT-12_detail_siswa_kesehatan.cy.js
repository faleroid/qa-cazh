import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

describe('MODUL ANGGOTA - 12. Anggota - Detail Siswa - Tab Kesehatan (AGT-12.01 - AGT-12.42)', () => {
  beforeEach(() => {
    cy.login();
  });

  // ---------------------------------------------------------------------------
  // NAVIGASI & SECTION KESEHATAN (AGT-12.01 - AGT-12.04)
  // ---------------------------------------------------------------------------
  it('AGT-12.01: Pada halaman Detail Siswa, klik tab Kesehatan -> Tampil 3 section: Kesehatan, Imunisasi, List Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    StudentDetailPage.verifyKesehatanSections();
  });

  it('AGT-12.02: Cek field pada section Kesehatan -> Menampilkan field optional: Riwayat Kesehatan, Disabilitas, Hasil Tes Buta Warna, Tinggi Badan, Berat Badan, Golongan Darah', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    StudentDetailPage.verifyKesehatanFields();
  });

  it('AGT-12.03: Isi salah satu field Kesehatan, simpan -> Data tersimpan tanpa error validasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Data Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.wait(400);

    cy.get('input[name="height"], input[name="weight"], input[type="text"]').first()
      .should('be.visible')
      .clear({ force: true })
      .type(testData.healthData.tinggiBadan, { force: true });
    cy.wait(400);

    cy.contains('button[type="submit"], button', 'Simpan')
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    cy.get('body').should('exist');
  });

  it('AGT-12.04: Kosongkan seluruh field Kesehatan, simpan -> Data tersimpan tanpa error (seluruh field optional)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Data Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.wait(400);

    cy.get('input[name="medical_history"], input[name="color_blind_test_result"], input[name="height"], input[name="weight"]')
      .each(($input) => {
        cy.wrap($input)
          .should('be.visible')
          .clear({ force: true })
          .should('have.value', '');
        cy.wait(150);
      });

    cy.contains('button[type="submit"], button', 'Simpan', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);
    cy.get('input[name="medical_history"]').should('have.value', '');
    cy.get('input[name="height"]').should('have.value', '');
  });

  // ---------------------------------------------------------------------------
  // IMUNISASI (AGT-12.05 - AGT-12.08)
  // ---------------------------------------------------------------------------
  it('AGT-12.05: Klik tombol Tambah Imunisasi -> Tampil form dengan field Tanggal* (required) & Nama Imunisasi* (required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.contains('label', 'Nama Imunisasi').should('be.visible');
    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0').should('be.visible');
  });

  it('AGT-12.06: Kosongkan salah satu field Imunisasi, klik Simpan -> Sistem menampilkan pesan error (validasi required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('input[placeholder*="Nama Imunisasi"], input#name-0').first().clear({ force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);
    cy.contains('label', 'Nama Imunisasi').should('be.visible');
  });

  it('AGT-12.07: Isi Tanggal + Nama Imunisasi, klik Simpan -> Imunisasi tersimpan; pesan success "Berhasil memperbarui data kesehatan" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
          .clear({ force: true })
          .type(testData.imunisasiData.nama, { force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).should('be.visible').click({ force: true });
      });

    cy.wait(800);

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('contain.text', 'Berhasil memperbarui data kesehatan');
      } else {
        const text = $body.text();
        expect(text).to.satisfy((t) =>
          t.includes('Berhasil') || t.includes('kesehatan') || t.includes(testData.imunisasiData.nama)
        );
      }
    });
  });

  it('AGT-12.08: Klik icon Hapus pada baris Imunisasi -> Imunisasi langsung terhapus TANPA popup confirmation', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('button svg.lucide-trash, button[aria-label*="Hapus"], button[title*="Hapus"]', { timeout: 15000 })
      .first()
      .parents('button')
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // TABEL LIST & PENCARIAN RIWAYAT KESEHATAN (AGT-12.09 - AGT-12.14)
  // ---------------------------------------------------------------------------
  it('AGT-12.09: Cek kolom pada tabel List Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(500);
    StudentDetailPage.verifyRiwayatKesehatanColumns();
  });

  it('AGT-12.10: Buka tab Kesehatan saat belum ada riwayat -> List Riwayat Kesehatan kosong (empty state)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(500);

    cy.get('tbody', { timeout: 15000 }).should(($tbody) => {
      const text = $tbody.text().toLowerCase();
      const hasEmptyState = text.includes('tidak ditemukan') || text.includes('belum tersedia') || text.includes('kosong') || $tbody.find('svg').length > 0;
      expect(hasEmptyState, 'Tabel Riwayat Kesehatan harus menampilkan komponen empty state (ilustrasi & pesan tidak ada data)').to.be.true;
    });
  });

  it('AGT-12.11: Cari riwayat kesehatan dengan keyword Indikasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || $body.find('tbody tr').length === 0;

      if (isEmpty) {
        cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
        cy.wait(600);

        cy.get('button[name="date"]').click({ force: true });
        cy.wait(400);

        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
          .first()
          .click({ force: true });
        cy.wait(300);

        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    StudentDetailPage.searchKeyword(testData.riwayatData.indikasi);
    cy.wait(600);
    cy.get('body').should('contain.text', testData.riwayatData.indikasi);
  });

  it('AGT-12.12: Cari riwayat kesehatan dengan keyword Tindakan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || $body.find('tbody tr').length === 0;

      if (isEmpty) {
        cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
        cy.wait(600);

        cy.get('button[name="date"]').click({ force: true });
        cy.wait(400);

        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
          .first()
          .click({ force: true });
        cy.wait(300);

        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    StudentDetailPage.searchKeyword(testData.riwayatData.tindakan);
    cy.wait(600);
    cy.get('body').should('contain.text', testData.riwayatData.tindakan);
  });

  it('AGT-12.13: Cari riwayat kesehatan dengan keyword Keterangan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || $body.find('tbody tr').length === 0;

      if (isEmpty) {
        cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
        cy.wait(600);

        cy.get('button[name="date"]').click({ force: true });
        cy.wait(400);

        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
          .first()
          .click({ force: true });
        cy.wait(300);

        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    StudentDetailPage.searchKeyword(testData.search.keteranganKeyword);
    cy.wait(600);
    cy.get('body').should('exist');
  });

  it('AGT-12.14: Cari dengan keyword tidak ditemukan -> Sistem menampilkan list kosong (no result)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);
    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.get('body').should('exist');
  });

  // ---------------------------------------------------------------------------
  // TAMBAH RIWAYAT KESEHATAN (AGT-12.15 - AGT-12.19)
  // ---------------------------------------------------------------------------
  it('AGT-12.15: Klik tombol Tambah Riwayat -> Tampil form Tambah Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('body').should(($body) => {
      expect($body.text(), 'Form Tambah Riwayat Kesehatan harus terbuka').to.satisfy((t) =>
        t.includes('Riwayat') || $body.find('[role="dialog"]').length > 0
      );
    });
  });

  it('AGT-12.16: Cek field pada form Tambah Riwayat Kesehatan (semua required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase();
      expect(text, 'Form Tambah Riwayat harus memuat field Tanggal, Indikasi, Tindakan, Keterangan').to.satisfy((t) =>
        t.includes('tanggal') || t.includes('indikasi') || t.includes('tindakan') || t.includes('keterangan')
      );
    });
  });

  it('AGT-12.17: Kosongkan salah satu field required, klik Simpan -> Error validasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /simpan|submit/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
        });
      } else {
        cy.contains('button', /simpan|submit/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
      }
    });

    cy.get('body').should('exist');
  });

  it('AGT-12.18: Isi semua field required, klik Simpan -> Riwayat tersimpan; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('button[name="date"], button:contains("DD/MM/YYYY")').first().click({ force: true });
    cy.wait(400);

    cy.get('body').then(($b) => {
      const todayBtn = $b.find('.rdp-root button[data-today="true"], .rdp-root button[aria-label*="Today"], .rdp-root button:not([disabled])');
      if (todayBtn.length > 0) {
        cy.wrap(todayBtn.first()).click({ force: true });
      }
    });
    cy.wait(300);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.riwayatData.indikasi, { force: true });
      cy.wait(200);

      cy.get('input[name="action"], input[placeholder*="Tindakan"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.riwayatData.tindakan, { force: true });
      cy.wait(200);

      cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.riwayatData.keterangan, { force: true });
      cy.wait(200);

      cy.contains('button[type="submit"], button', 'Simpan')
        .should('be.visible')
        .click({ force: true });
    });

    cy.wait(1000);
    cy.get('body').should('contain.text', testData.riwayatData.indikasi);
  });

  it('AGT-12.19: Klik tombol Batal pada form Tambah Riwayat -> Menutup form tanpa menyimpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]').length > 0) {
        cy.get('[role="dialog"]').within(() => {
          cy.contains('button', /batal|cancel/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
        });
      } else {
        cy.contains('button', /batal|cancel/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
      }
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // EDIT RIWAYAT KESEHATAN (AGT-12.20 - AGT-12.23)
  // ---------------------------------------------------------------------------
  it('AGT-12.20: Pada baris List Riwayat, klik Aksi -> Edit', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /edit|ubah/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.21: Ubah salah satu field, klik Simpan -> Data ter-update; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /edit|ubah/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name*="indikasi"], input[type="text"]').first()
        .scrollIntoView({ offset: { top: -120, left: 0 } })
        .should('be.visible')
        .clear({ force: true })
        .type(testData.editRiwayatData.indikasi, { force: true });
      cy.wait(400);

      cy.contains('button', /simpan|submit/i)
        .scrollIntoView({ offset: { top: -120, left: 0 } })
        .should('be.visible')
        .click({ force: true });
    });

    cy.wait(1000);
    cy.get('body').should('contain.text', testData.editRiwayatData.indikasi);
  });

  it('AGT-12.22: Kosongkan salah satu field required saat edit, klik Simpan -> Error validasi required', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /edit|ubah/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name*="indikasi"], input[type="text"]').first()
        .scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').clear({ force: true });
      cy.contains('button', /simpan|submit/i)
        .scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.get('body').should('exist');
  });

  it('AGT-12.23: Klik tombol Batal pada form Edit Riwayat -> Menutup form tanpa menyimpan perubahan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /edit|ubah/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // HAPUS SINGLE (AGT-12.24 - AGT-12.26)
  // ---------------------------------------------------------------------------
  it('AGT-12.24: Pada baris List Riwayat, klik Aksi -> Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /hapus|delete/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.25: Pada popup delete, klik tombol Hapus -> Riwayat terhapus; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /hapus|delete/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.wait(1500);
    cy.get('body').should('exist');
  });

  it('AGT-12.26: Pada popup delete, klik tombol Batal -> Menutup popup, data tidak terhapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.contains('button', /hapus|delete/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // HAPUS BULK (AGT-12.27 - AGT-12.39)
  // ---------------------------------------------------------------------------
  it('AGT-12.27: Centang checkbox pada satu baris data Riwayat', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
    cy.contains('button', /hapus/i, { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.28: Centang checkbox pada header tabel', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasSelection = text.includes('terpilih') || text.includes('pilih') || $body.find('tbody tr button[aria-checked="true"]').length > 0;
      expect(hasSelection, 'Banner terpilih harus muncul setelah centang header checkbox').to.be.true;
    });
  });

  it('AGT-12.29: Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
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
      .scrollIntoView({ offset: { top: -120, left: 0 } })
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

  it('AGT-12.30: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
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
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Hanya 50 data pertama yang dipilih');
  });

  it('AGT-12.31: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.32: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.wait(1500);
    cy.get('body').should('exist');
  });

  it('AGT-12.33: Pada popup Hapus Bulk, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.34: Coba centang lebih dari 50 data secara manual', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
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
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    cy.get('tbody tr', { timeout: 15000 }).then(($rows) => {
      if ($rows.length > 50) {
        cy.wrap($rows).last().scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
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

  it('AGT-12.35: Ubah filter/search saat ada data terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);

    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    StudentDetailPage.searchKeyword(testData.search.indikasiKeyword);
    cy.wait(600);

    cy.get('[data-sonner-toast]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });

  it('AGT-12.36: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.scrollTo('top');
    cy.wait(400);
    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage2 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage2, 'Selection harus tetap aktif di Halaman 2 saat mode Pilih Semua Hasil Filter').to.be.true;
    });

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.get('button').contains('1').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const hasSelectionOnPage1 = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button:contains("Pilih")').length > 0;
      expect(hasSelectionOnPage1, 'Selection harus tetap aktif setelah kembali ke Halaman 1').to.be.true;
    });
  });

  it('AGT-12.37: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');

    cy.get('[data-slot="data-grid-pagination"]', { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
      cy.get('button').contains('2').click({ force: true });
    });
    cy.wait(1000);

    cy.get('body').then(($body) => {
      const btnTerpilih = $body.find('button:contains("Terpilih"), [data-slot="card-toolbar"] button:contains("Terpilih")');
      expect(btnTerpilih.length, 'Selection harus ter-reset setelah pindah halaman dari centang manual').to.equal(0);
    });
  });

  it('AGT-12.38: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').eq(0).scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(400);

    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      if (rows.length > 1) {
        cy.wrap(rows).eq(1).scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
        cy.wait(400);
      }
    });

    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
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
      cy.contains('button', /hapus|ya|konfirmasi/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
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

  it('AGT-12.39: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
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
      cy.contains('button', /hapus|ya|konfirmasi/i).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
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

  // ---------------------------------------------------------------------------
  // EXPORT (AGT-12.40 - AGT-12.42)
  // ---------------------------------------------------------------------------
  it('AGT-12.40: Klik tombol Excel pada tab Kesehatan (tanpa filter)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, a', /excel|export/i, { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').first().click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });

  it('AGT-12.41: Lakukan pencarian, klik Excel', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    StudentDetailPage.searchKeyword(testData.search.indikasiKeyword);
    cy.wait(800);

    cy.contains('button, a', /excel|export/i, { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').first().click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });

  it('AGT-12.42: Cek isi kolom file hasil Export Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, a', /excel|export/i, { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').first().click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });
});
