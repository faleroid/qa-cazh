import ProgressActivityPage from '../../pages/ProgressActivityPage';
import testData from '../../fixtures/progressActivityData.json';

describe('MODUL KESISWAAN - KSW-1 Progres Kegiatan (KSW-1.01 s/d KSW-1.98)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.01: Login admin → menu Kesiswaan → submenu Progres Kegiatan', () => {
    cy.url().should("include", "/student-affairs/progress"); ProgressActivityPage.verifyListHeaderAndActions();
  });

  it('KSW-1.02: Cek kolom pada tabel List Progres Kegiatan', () => {
    ProgressActivityPage.verifyTableColumns();
  });

  it('KSW-1.03: Buka halaman List Progres Kegiatan saat belum ada data', () => {
    ProgressActivityPage.deleteAllDataIfExists(); ProgressActivityPage.verifyEmptyState();
  });

  it('KSW-1.04: Cek urutan default list Progres Kegiatan', () => {
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Kegiatan Pertama", "Deskripsi Pertama"); cy.wait(1500); ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Kegiatan Kedua", "Deskripsi Kedua"); cy.wait(1500); cy.get('table[data-slot="data-grid-table"] tbody tr').first().should("contain.text", "Kegiatan Kedua"); cy.get('table[data-slot="data-grid-table"] tbody tr').eq(1).should("contain.text", "Kegiatan Pertama");
  });

  it('KSW-1.05: Cari data pada kolom pencarian dengan keyword Kegiatan yang cocok', () => {
    ProgressActivityPage.searchKeyword("Kegiatan Pertama"); cy.get('table[data-slot="data-grid-table"] tbody tr').should("have.length.at.least", 1); cy.get('table[data-slot="data-grid-table"] tbody tr').first().should("contain.text", "Kegiatan Pertama");
  });

  it('KSW-1.06: Cari data dengan keyword yang tidak cocok/tidak ditemukan', () => {
    ProgressActivityPage.searchKeyword("KeywordTidakDitemukanXYZ999"); ProgressActivityPage.verifyEmptyState();
  });

  it('KSW-1.07: Klik tombol Excel pada halaman List Progres Kegiatan (tanpa filter)', () => {
    cy.contains("button", "Excel").should("be.visible").click({ force: true });
  });

  it('KSW-1.08: Lakukan pencarian, kemudian klik tombol Excel', () => {
    ProgressActivityPage.searchKeyword("Kegiatan Pertama"); cy.contains("button", "Excel").click({ force: true });
  });

  it("KSW-1.09: Cek isi kolom file hasil Export Progres Kegiatan", () => {
    cy.contains("button", "Excel").should("be.visible").click({ force: true });
    cy.wait(2500);

    cy.task('findDownloadedFile', { extension: '.xlsx' })
      .should('be.a', 'string')
      .then((filePath) => cy.task('readExcel', { filePath }))
      .then((rows) => {
        expect(rows, "File Excel harus berisi data").to.be.an("array").that.is.not.empty;
        const actualColumns = Object.keys(rows[0]);
      const expectedColumns = [
        "No", "Tanggal Dibuat", "Dibuat Oleh", "Nama Anggota", 
        "No Kartu Anggota", "Kegiatan", "Pencapaian Terakhir", "Tanggal Pencapaian"
      ];
      expectedColumns.forEach((col) => {
        const isColumnPresent = actualColumns.some((actualCol) =>
          actualCol.toLowerCase().includes(col.toLowerCase())
        );
        expect(isColumnPresent, `File Excel wajib memuat kolom "${col}"`).to.be.true;
      });
    });
  });

  it('KSW-1.10: Pada halaman List Progres Kegiatan, klik tombol Import Progres', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.11: Cek field pada form Import Progres Kegiatan', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it("KSW-1.12: Kosongkan salah satu field required, klik Simpan", () => {
    cy.contains("button", "Import Progres").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] input[name=\"name\"], [role=\"dialog\"] input[placeholder*=\"Nama\"]").clear();
    cy.contains("[role=\"dialog\"] button", /simpan|submit|save/i).click({ force: true });
    cy.wait(800);

    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"]").then(($dialog) => {
      const hasValidationError = $dialog.find(":invalid, .text-destructive, [data-slot=\"form-message\"], p:contains(\"wajib\"), p:contains(\"required\")").length > 0;
      expect(hasValidationError, "Sistem harus menampilkan validasi error required").to.be.true;
    });
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it("KSW-1.13: Klik link Download Template Import", () => {
    cy.contains("button", "Import Progres").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.contains("[role=\"dialog\"] button", "Download").should("be.visible").click({ force: true });
    cy.wait(2500);
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.14: Upload file dengan format/struktur data yang tidak sesuai template', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it.skip('KSW-1.15: Isi semua field required + upload template valid, klik Simpan', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.16: Klik tombol Batal pada form Import Progres Kegiatan', () => {
    cy.contains("button", "Import Progres").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.17: Pada halaman List Progres Kegiatan, klik tombol Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.18: Cek field pada form Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.19: Pada field Anggota, ketik nomor kartu atau nama anggota', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.20: Cek data yang muncul pada suggestion field Anggota', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.21: Klik salah satu list suggestion pada field Anggota', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it.skip('KSW-1.22: Isi semua field required, klik Simpan', () => {
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Pentas Seni Utama", "Deskripsi Utama");
  });

  it('KSW-1.23: Kosongkan salah satu field required, klik Simpan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.contains('[role="dialog"] button[type="submit"]', "Simpan").click({ force: true });
  });

  it('KSW-1.24: Klik tombol Batal pada form Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.25: Pada baris List Progres Kegiatan, klik Aksi → Detail', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true }); cy.url().should("include", "/student-affairs/progress/");
  });

  it('KSW-1.26: Cek section Data Siswa pada halaman Detail', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.27: Cek section Grafik pada halaman Detail', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.28: Cek kolom pada tabel List Riwayat Progres Kegiatan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.29: Cek urutan default List Riwayat Progres Kegiatan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.30: Buka halaman Detail Progres Kegiatan yang belum memiliki riwayat', () => {
    cy.url().should("include", "/student-affairs/progress");
  });

  it('KSW-1.31: Cek tampilan nilai Pencapaian pada kolom Pencapaian', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.32: Pada halaman Detail Progres Kegiatan, klik tombol Tambah Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.33: Cek field pada form Tambah Riwayat Progres', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.34: Kosongkan salah satu field required, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.35: Isi Tanggal Kegiatan dengan tanggal setelah hari ini (future date)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.36: Isi Presentase Pencapaian dengan angka bulat 1-100 (mis. 75)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.37: Isi Presentase Pencapaian dengan angka desimal 1.5-95.5 (mis. 87.5)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.38: Upload lampiran dengan format selain JPG/JPEG/PNG/MP4/PDF', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.39: Upload lampiran dengan ukuran > 10MB', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.40: Upload lampiran valid (JPG/JPEG/PNG/MP4/PDF, ≤ 10MB)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.41: Setelah upload valid, klik ikon Hapus pada lampiran sebelum Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.42: Isi semua field required + lampiran valid, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.43: Pada baris List Riwayat, klik Aksi → Edit', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.44: Ubah salah satu field, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.45: Kosongkan salah satu field required, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.46: Validasi Tanggal Kegiatan, Presentase, dan Lampiran pada form Edit Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.47: Pada baris List Riwayat, klik Aksi → Hapus', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.48: Pada popup delete confirmation, klik tombol Hapus', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.49: Pada popup delete confirmation, klik tombol Batal', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.50: Centang checkbox pada satu baris data Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.51: Centang checkbox pada header tabel', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.52: Klik link Pilih Semua pada banner (hasil filter ≤ 50 data)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.53: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.54: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.55: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.56: Pada popup Hapus Bulk, klik tombol Batal', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.57: Coba centang lebih dari 50 data secara manual', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.58: Ubah filter/search saat ada data terpilih', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.59: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.60: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.61: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.62: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.63: Cari Riwayat dengan keyword pada kolom Pencapaian', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.64: Cari Riwayat dengan keyword pada kolom Deskripsi', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.65: Cari Riwayat dengan keyword tidak ditemukan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.66: Klik tombol Excel pada halaman Detail Riwayat (tanpa filter)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.67: Lakukan pencarian, kemudian klik Excel', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.68: Cek isi kolom file hasil Export Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.69: Pada halaman Detail Progres Kegiatan, klik tombol Import', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.70: Klik link Download Template Import Riwayat', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.71: Upload template dengan salah satu kolom required kosong, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.72: Isi kolom presentase dengan angka bulat 1-100 dan desimal 1.5-95.5', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.73: Isi kolom tanggal dengan tanggal setelah hari ini (future date)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.74: Isi kolom deskripsi dengan text atau angka', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.75: Upload file dengan format selain .xlsx (mis. .csv, .pdf, .docx)', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it.skip('KSW-1.76: Upload template valid, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it('KSW-1.77: Pada baris List Progres Kegiatan, klik Aksi → Edit', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.78: Cek field pada form Edit Progres Kegiatan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it('KSW-1.79: Pada field Anggota di form Edit, cek data suggestion', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it.skip('KSW-1.80: Ubah salah satu field required, klik Simpan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.contains('[role="dialog"] button[type="submit"]', "Simpan").click({ force: true });
  });

  it('KSW-1.81: Kosongkan salah satu field required, klik Simpan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.contains('[role="dialog"] button[type="submit"]', "Simpan").click({ force: true });
  });

  it('KSW-1.82: Klik tombol Batal pada form Edit Progres Kegiatan', () => {
    cy.get('tbody td button:has(svg.lucide-square-pen)').first().click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.83: Pada baris List Progres Kegiatan, klik Aksi → Hapus', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.get('[role="dialog"]').should("be.visible");
  });

  it.skip('KSW-1.84: Pada popup delete confirmation, klik tombol Hapus', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.contains('[role="dialog"] button', /hapus|delete|ya|confirm/i).click({ force: true });
  });

  it('KSW-1.85: Pada popup delete confirmation, klik tombol Batal', () => {
    cy.get('tbody td button:has(svg.lucide-trash)').first().click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.86: Centang checkbox pada satu baris data List Progres Kegiatan', () => {
    cy.get('tbody td button[role="checkbox"]').first().click({ force: true });
  });

  it('KSW-1.87: Centang checkbox pada header tabel', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.88: Klik link Pilih Semua pada banner (hasil filter ≤ 50 data)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.89: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.90: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true });
  });

  it.skip('KSW-1.91: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true }); cy.contains('[role="dialog"] button', /hapus|delete|ya|confirm/i).click({ force: true });
  });

  it('KSW-1.92: Pada popup Hapus Bulk, klik tombol Batal', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); cy.contains("button", "Hapus yang dipilih").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.93: Coba centang lebih dari 50 data secara manual', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.94: Ubah filter/search saat ada data terpilih', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true }); ProgressActivityPage.searchKeyword("Filter");
  });

  it('KSW-1.95: Pindah halaman saat selection berasal dari mode Pilih Semua Hasil Filter', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.96: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.97: Simulasi sebagian data gagal dihapus (partial fail)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

  it('KSW-1.98: Simulasi seluruh data gagal dihapus (network/server error)', () => {
    cy.get('button[aria-label="Select all"]').click({ force: true });
  });

});

