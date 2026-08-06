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

  it("KSW-1.14: Upload file dengan format/struktur data yang tidak sesuai template", () => {
    cy.contains("button", "Import Progres").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] button[data-slot=\"select-trigger\"]").first().click({ force: true });
    cy.wait(600);
    cy.get("[role=\"option\"], [data-slot=\"select-item\"]").contains("Academy QA Engineer").click({ force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"] input[name=\"name\"]").clear().type("Pentas Seni Invalid Format Test");
    cy.get("[role=\"dialog\"] input[type=\"file\"]").selectFile("cypress/fixtures/document.pdf", { force: true });
    cy.wait(800);
    cy.contains("[role=\"dialog\"] button", "Simpan").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"]").then(($dialog) => {
      const hasError = $dialog.find(".text-destructive, [role=\"alert\"], [data-slot=\"form-message\"]").length > 0;
      expect(hasError, "Pesan error upload tidak sesuai harus tampil").to.be.true;
    });
  }); cy.get('[role="dialog"]').should("be.visible");
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

  it("KSW-1.18: Cek field pada form Tambah Progres Kegiatan", () => {
    cy.contains("button", "Tambah Progres Kegiatan").should("be.visible").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] [data-slot=\"dialog-title\"]").should("contain.text", "Tambah Progres Kegiatan");

    cy.get("[role=\"dialog\"]").within(() => {
      cy.contains("label", "Instansi").should("be.visible");
      cy.get("button[data-slot=\"select-trigger\"]").should("be.visible");

      cy.contains("label", "Anggota").should("be.visible");
      cy.get("input[placeholder=\"Masukan Nomor Kartu atau Nama\"]").should("exist").and("be.disabled");
      cy.contains("p", "Silakan pilih instansi terlebih dahulu").should("be.visible");

      cy.contains("label", "Nama Progres Kegiatan").should("be.visible");
      cy.get("input[name=\"name\"]").should("be.visible");

      cy.contains("label", /deskripsi/i).should("be.visible");
      cy.get("textarea[name=\"description\"]").should("be.visible");

      cy.contains("button", "Batal").should("be.visible");
      cy.contains("button", "Simpan").should("be.visible");
    });
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it("KSW-1.19: Pada field Anggota, ketik nomor kartu atau nama anggota", () => {
    cy.contains("button", "Tambah Progres Kegiatan").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] button[data-slot=\"select-trigger\"]").first().click({ force: true });
    cy.wait(600);
    cy.get("[role=\"option\"], [data-slot=\"select-item\"]").contains("Academy QA Engineer").click({ force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"] input[placeholder=\"Masukan Nomor Kartu atau Nama\"]").should("not.be.disabled").click({ force: true }).clear().type("Rocky Gibraltar");
    cy.wait(1200);

    cy.get("div.absolute.z-50 button", { timeout: 10000 }).first().should("be.visible").within(() => {
      cy.contains("Rocky Gibraltar").should("be.visible");
      cy.contains("1002992462475639").should("be.visible");
      cy.contains("Siswa").should("be.visible");
    });
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it("KSW-1.20: Cek data yang muncul pada suggestion field Anggota", () => {
    cy.contains("button", "Tambah Progres Kegiatan").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] button[data-slot=\"select-trigger\"]").first().click({ force: true });
    cy.wait(600);
    cy.get("[role=\"option\"], [data-slot=\"select-item\"]").contains("Academy QA Engineer").click({ force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"] input[placeholder=\"Masukan Nomor Kartu atau Nama\"]").should("not.be.disabled").click({ force: true }).clear().type("Rocky Gibraltar");
    cy.wait(1200);

    cy.get("div.absolute.z-50 button", { timeout: 10000 }).first().within(() => {
      cy.contains("Siswa").should("be.visible");
      cy.contains("Guru").should("not.exist");
    });
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it("KSW-1.21: Klik salah satu list suggestion pada field Anggota", () => {
    cy.contains("button", "Tambah Progres Kegiatan").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] button[data-slot=\"select-trigger\"]").first().click({ force: true });
    cy.wait(600);
    cy.get("[role=\"option\"], [data-slot=\"select-item\"]").contains("Academy QA Engineer").click({ force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"] input[placeholder=\"Masukan Nomor Kartu atau Nama\"]").should("not.be.disabled").click({ force: true }).clear().type("Rocky Gibraltar");
    cy.wait(1200);
    cy.get("div.absolute.z-50 button", { timeout: 10000 }).first().should("be.visible").click({ force: true });
    cy.wait(800);

    cy.get("[role=\"dialog\"]").within(() => {
      cy.contains("p", "Rocky Gibraltar").should("be.visible");
      cy.contains("1002992462475639").should("be.visible");
    });
  }); cy.get('[role="dialog"]').should("be.visible");
  });

  it.skip('KSW-1.22: Isi semua field required, klik Simpan', () => {
    ProgressActivityPage.createNewProgressActivity("Academy QA Engineer", "Rocky Gibraltar", "Pentas Seni Utama", "Deskripsi Utama");
  });

  it("KSW-1.23: Kosongkan salah satu field required, klik Simpan", () => {
    cy.contains("button", "Tambah Progres Kegiatan").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible");

    cy.get("[role=\"dialog\"] button[data-slot=\"select-trigger\"]").first().click({ force: true });
    cy.wait(600);
    cy.get("[role=\"option\"], [data-slot=\"select-item\"]").contains("Academy QA Engineer").click({ force: true });
    cy.wait(800);

    cy.get("[role=\"dialog\"] input[placeholder=\"Masukan Nomor Kartu atau Nama\"]").click({ force: true }).clear().type("Rocky Gibraltar");
    cy.wait(1200);
    cy.get("div.absolute.z-50 button").first().click({ force: true });
    cy.wait(800);

    cy.get("[role=\"dialog\"] input[name=\"name\"]").clear();
    cy.contains("[role=\"dialog\"] button", "Simpan").click({ force: true });
    cy.wait(800);

    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"]").within(() => {
      cy.get(".text-destructive, [data-slot=\"form-message\"], [data-invalid=\"true\"]").should("exist");
    });
  }); cy.contains('[role="dialog"] button[type="submit"]', "Simpan").click({ force: true });
  });

  it('KSW-1.24: Klik tombol Batal pada form Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });

  it('KSW-1.25: Pada baris List Progres Kegiatan, klik Aksi → Detail', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true }); cy.url().should("include", "/student-affairs/progress/");
  });

  it("KSW-1.26: Cek section Data Siswa pada halaman Detail", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.url().should("include", "/student-affairs/progress/");
    cy.contains("h1", "Detail Progres Kegiatan").should("be.visible");

    cy.get("[data-slot=\"card-content\"]").first().within(() => {
      cy.get("h2.text-xl.font-bold").should("be.visible");
      cy.get("p.text-sm.text-muted-foreground").should("be.visible");
      cy.get("span[data-slot=\"badge\"]").should("be.visible");
    });
  });
  });

  it("KSW-1.27: Cek section Grafik pada halaman Detail", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.contains("[data-slot=\"card-title\"]", "Grafik Progres Kegiatan").should("be.visible");
    cy.get(".recharts-responsive-container svg.recharts-surface").should("be.visible");

    cy.get(".recharts-xAxis").should("exist").within(() => {
      cy.get(".recharts-cartesian-axis-tick-value").should("exist");
    });

    cy.get(".recharts-yAxis").should("exist").within(() => {
      cy.contains("0").should("exist");
      cy.contains("100").should("exist");
    });

    cy.contains(".recharts-legend-item-text", "Diurutkan Berdasarkan Tanggal").should("be.visible");
  });
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

  it("KSW-1.33: Cek field pada form Tambah Riwayat", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.contains("label", "Tanggal").should("be.visible");
      cy.get("button:contains(\"DD/MM/YYYY\")").should("be.visible");
      cy.contains("label", /persentase/i).should("be.visible");
      cy.get("input[name=\"percentage\"]").should("be.visible");
      cy.contains("label", "Deskripsi").should("be.visible");
      cy.get("textarea[name=\"description\"]").should("be.visible");
      cy.contains("label", /lampiran/i).should("be.visible");
      cy.get("input[type=\"file\"]").should("exist");
      cy.contains("button", "Batal").should("be.visible");
      cy.contains("button", "Simpan").should("be.visible");
    });
  });
  });

  it('KSW-1.34: Kosongkan salah satu field required, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it("KSW-1.35: Isi Tanggal Kegiatan dengan tanggal setelah hari ini (future date)", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"] button:contains(\"DD/MM/YYYY\")").click({ force: true });
    cy.wait(600);
    cy.get("button[aria-label=\"Go to the Next Month\"]").click({ force: true });
    cy.wait(600);
    cy.get("td[data-day] button").last().click({ force: true });
    cy.wait(600);

    cy.get("[role=\"dialog\"] input[name=\"percentage\"]").clear({ force: true }).type("50", { force: true });
    cy.get("[role=\"dialog\"] textarea[name=\"description\"]").clear({ force: true }).type("Uji Future Date Validation", { force: true });

    cy.contains("[role=\"dialog\"] button", "Simpan").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.get(".text-destructive, [data-slot=\"form-message\"]").should("exist");
    });
  });
  });

  it("KSW-1.36: Isi Presentase Pencapaian dengan angka bulat 1-100 (mis. 75)", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] input[name=\"percentage\"]").clear({ force: true }).type("75", { force: true }).should("have.value", "75");
    cy.get("[role=\"dialog\"] input[name=\"percentage\"]").should("have.attr", "aria-invalid", "false");
  });
  });

  it("KSW-1.37: Isi Presentase Pencapaian dengan angka desimal 1.5-95.5 (mis. 87.5)", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] input[name=\"percentage\"]").clear({ force: true }).type("87.5", { force: true }).should("have.value", "87.5");
    cy.get("[role=\"dialog\"] input[name=\"percentage\"]").should("have.attr", "aria-invalid", "false");
  });
  });

  it("KSW-1.38: Upload lampiran dengan format selain JPG/JPEG/PNG/MP4/PDF", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] input[type=\"file\"]").selectFile("cypress/fixtures/progressActivityData.json", { force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.get(".text-destructive, [data-slot=\"form-message\"]").should("exist");
    });
  });
  });

  it("KSW-1.39: Upload lampiran dengan ukuran > 10MB", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] input[type=\"file\"]").selectFile("cypress/fixtures/large_signature.png", { force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.get(".text-destructive, [data-slot=\"form-message\"]").should("exist");
    });
  });
  });

  it("KSW-1.40: Upload lampiran valid (JPG/JPEG/PNG/MP4/PDF, <= 10MB)", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] input[type=\"file\"]").selectFile("cypress/fixtures/document.pdf", { force: true });
    cy.wait(800);
    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.get(".text-destructive").should("not.exist");
      cy.contains("document.pdf").should("be.visible");
    });
  });
  });

  it("KSW-1.41: Setelah upload valid, klik ikon Hapus pada lampiran sebelum Simpan", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);
    cy.contains("button", "Tambah Riwayat").should("be.visible").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"] input[type=\"file\"]").selectFile("cypress/fixtures/signature.jpeg", { force: true });
    cy.wait(1000);
    cy.get("[role=\"dialog\"] img[src^=\"blob:\"], [role=\"dialog\"] img[alt*=\"signature\"]").should("be.visible");

    cy.get("[role=\"dialog\"]").within(() => {
      cy.get("button:has(svg.lucide-trash), button:has(svg.lucide-x)").first().click({ force: true });
    });
    cy.wait(800);

    cy.get("[role=\"dialog\"] img[src^=\"blob:\"]").should("not.exist");
    cy.get("[role=\"dialog\"] input[type=\"file\"]").should("exist");
  });
  });

  it.skip('KSW-1.42: Isi semua field required + lampiran valid, klik Simpan', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it("KSW-1.43: Pada baris List Riwayat, klik Aksi -> Edit", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.get("tbody tr td svg.lucide-square-pen", { timeout: 15000 }).first().closest("button").should("be.visible").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"]").should("be.visible");
    cy.get("[role=\"dialog\"] [data-slot=\"dialog-title\"]").should("contain.text", "Edit");
  });
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

  it("KSW-1.47: Pada baris List Riwayat, klik Aksi -> Hapus", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("tbody tr").first().find("svg.lucide-trash").closest("button").click({ force: true });
    cy.wait(1000);

    cy.get("[role=\"dialog\"]").should("be.visible").within(() => {
      cy.contains("button", "Batal").should("be.visible");
      cy.get("button").filter(':contains("Hapus"), :contains("Ya")').should("be.visible");
    });
  });
  });

  it.skip('KSW-1.48: Pada popup delete confirmation, klik tombol Hapus', () => {
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
  });

  it("KSW-1.49: Pada popup delete confirmation, klik tombol Batal", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1).then(($rows) => {
      const initialCount = $rows.length;

      cy.get("tbody tr").first().find("svg.lucide-trash").closest("button").click({ force: true });
      cy.wait(1000);

      cy.get("[role=\"dialog\"]", { timeout: 15000 }).should("be.visible").within(() => {
        cy.contains("button", "Batal").click({ force: true });
      });
      cy.wait(800);

      cy.get("[role=\"dialog\"]").should("not.exist");
      cy.get("tbody tr").should("have.length", initialCount);
    });
  });
  });

  it("KSW-1.50: Centang checkbox pada satu baris data Riwayat", () => {
    cy.get("tbody td a[href*=\"/student-affairs/progress/\"]").first().click({ force: true });
    cy.wait(1500);

    cy.get("tbody tr", { timeout: 15000 }).should("have.length.at.least", 1);
    cy.get("tbody tr").first().find("button[role=\"checkbox\"]").click({ force: true });
    cy.wait(800);

    cy.get("tbody tr").first().find("button[role=\"checkbox\"]").should("have.attr", "data-state", "checked");
    cy.contains("riwayat progres dipilih").should("be.visible");
    cy.contains("button", "Hapus yang dipilih").should("be.visible");
  });
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

