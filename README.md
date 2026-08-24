# CAZH v3 — Cypress UAT Test Automation Framework

Framework Otomatisasi User Acceptance Testing (UAT) untuk aplikasi web **School Management System CAZH v3** (URL: [https://v3.cazh.id](https://v3.cazh.id)) menggunakan **Cypress (v15+)** dengan arsitektur **Page Object Model (POM)**.

---

## 🚀 Tech Stack & Arsitektur

* **Testing Framework**: Cypress (v15+)
* **Language & Runtime**: JavaScript / Node.js (UTF-8 Encoded)
* **Design Pattern**: Page Object Model (POM) Strictly Enforced
* **Excel Processing & Verification**: `xlsx` (SheetJS) via Cypress `cy.task("readExcel")`
* **Download Management**: Auto Clean-Up via Cypress `cy.task("deleteDownloads")`
* **UI Component Support**: Radix UI / shadcn UI (Dialog Modals, Combobox Selects, Accordion Menus, Switch Toggles, React Aria DateFields, Sonner Toasts)
* **Test Data**: Cypress Fixtures (`JSON` files) — *Tidak ada hardcoded data pada file spec*
* **Authentication**: Custom command `cy.login()` berbasis `cy.session()` dengan React State Hydration & Dynamic URL Assertion

---

## 📁 Struktur Direktori Project

```text
qa-cazh/
├── cypress/
│   ├── downloads/                           # Temporary folder downloaded excel files (Auto Clean-up)
│   ├── e2e/
│   │   ├── AGT/                             # Modul Anggota
│   │   │   ├── AGT-11/                      # Modular test cases AGT-11.1 s/d AGT-11.39
│   │   │   ├── AGT-11_detail_siswa_progres.cy.js # Full Combined Suite AGT-11 (Detail Siswa - Tab Progres)
│   │   │   ├── AGT-13/                      # Modular test cases AGT-13.1 s/d AGT-13.34
│   │   │   └── AGT-13_detail_siswa_pelanggaran.cy.js # Full Combined Suite AGT-13 (Detail Siswa - Tab Pelanggaran)
│   │   ├── DSH/                             # Modul Dashboard
│   │   │   ├── DSH-1/                       # Modular test cases DSH-1.01 s/d DSH-1.49
│   │   │   └── DSH-1_dashboard.cy.js        # Full Combined Suite DSH-1
│   │   ├── KSW/                             # Modul Kesiswaan
│   │   │   ├── KSW-1/                       # Modular test cases KSW-1.01 s/d KSW-1.98
│   │   │   └── KSW-1_progres_kegiatan.cy.js # Full Combined Suite KSW-1 (Progres Kegiatan)
│   │   └── PGT/                             # Modul Pengaturan
│   │       ├── PGT-16/                      # Modular test cases PGT-16.01 s/d PGT-16.22
│   │       ├── PGT-16_legalitas_bukti_bayar_pom.cy.js
│   │       ├── PGT-17/                      # Modular test cases PGT-17.01 s/d PGT-17.42
│   │       ├── PGT-17_kategori_inventaris.cy.js
│   │       ├── PGT-18/                      # Modular test cases PGT-18.01 s/d PGT-18.57
│   │       ├── PGT-18_tipe_pelanggaran.cy.js
│   │       ├── PGT-19/                      # Modular test cases PGT-19.01 s/d PGT-19.17
│   │       ├── PGT-19_waktu_perizinan.cy.js
│   │       ├── PGT-20/                      # Modular test cases PGT-20.01 s/d PGT-20.49
│   │       └── PGT-20_kategori_pengumuman.cy.js
│   ├── fixtures/                            # Data uji JSON & File media upload
│   │   ├── studentData.json
│   │   ├── progressActivityData.json
│   │   ├── legalityData.json
│   │   ├── inventoryCategoryData.json
│   │   ├── violationTypeData.json
│   │   ├── permissionTimeData.json
│   │   └── announcementCategoryData.json
│   ├── pages/                               # Page Object Model Classes
│   │   ├── StudentDetailPage.js
│   │   ├── ProgressActivityPage.js
│   │   ├── LegalityPage.js
│   │   ├── InventoryCategoryPage.js
│   │   ├── ViolationTypePage.js
│   │   ├── PermissionTimePage.js
│   │   └── AnnouncementCategoryPage.js
│   └── support/                             # Custom Commands & Config
│       ├── commands.js                      # Custom command cy.login()
│       └── e2e.js
├── cypress.config.js                        # Konfigurasi Cypress (tasks, baseUrl, timeouts, supportFile)
├── package.json
└── README.md
```

---

## 🧪 Modul Pengujian (Test Suites)

### 1. AGT-11: Anggota — Detail Siswa (Tab Progres)
* **URL Target**: `https://v3.cazh.id/member/student`
* **Jumlah Test Cases**: 39 Test Cases (`AGT-11.1` s/d `AGT-11.39`)
* **Fitur Utama**:
  * **Navigasi & Header**: Verifikasi informasi header (Foto, Tahun Ajaran, Tingkat, Kelas, Semester, Instansi, Total Tagihan, Total Transaksi).
  * **Filter History & 11 Tab**: Verifikasi dropdown filter dan 11 tab (*Data Diri, Data Orang Tua, Kartu, Tagihan, Dokumen, Rapor, Kesehatan, Pelanggaran, Prestasi, Perizinan, Progres*).
  * **Tabel & Search**: Verifikasi struktur kolom tabel Progres Kegiatan, pencarian keyword Kegiatan/Deskripsi, dan Empty State.
  * **Form Tambah & Edit Kegiatan**: Pengisian Nama Kegiatan (required) dan Deskripsi (optional), validasi required, dan pembatalan form.
  * **Single & Bulk Deletion**: Hapus per baris via icon Trash, confirmation modal Radix, dan batch deletion via checkbox selection.
  * **Export Excel**: Mengunduh file `.xlsx` dan membaca kolom data via `cy.task("readExcel")`.

### 2. AGT-13: Anggota — Detail Siswa (Tab Pelanggaran)
* **URL Target**: `https://v3.cazh.id/member/student`
* **Jumlah Test Cases**: 34 Test Cases (`AGT-13.1` s/d `AGT-13.34`)
* **Fitur Utama**:
  * **Navigasi & Header Poin**: Verifikasi tab Pelanggaran, header *Poin Pelanggaran Terkumpul*, dan kolom tabel (Tanggal, Kategori, Tipe, Deskripsi, Sanksi, Poin, Foto, Dibuat Oleh, Aksi).
  * **Pencarian & Empty State**: Pencarian berdasarkan Kategori, Deskripsi, Sanksi, Poin, serta verifikasi pesan ketika data tidak ditemukan.
  * **Form Tambah Pelanggaran**: Validasi field required (Tanggal, Kategori, Poin, Deskripsi, Sanksi), rentang poin dinamis sesuai Tipe (*Ringan, Sedang, Berat*), penolakan nilai poin negatif / > 100 / di luar range, dan upload foto (validasi ukuran > 512KB & format file).
  * **Form Edit Pelanggaran**: Buka modal edit data terisi, pembaruan otomatis label tipe saat nilai poin diubah, edit deskripsi/sanksi, dan pembatalan edit.
  * **Hapus Pelanggaran**: Popup confirmation delete Radix, aksi hapus single, dan verifikasi pengurangan poin terkumpul.
  * **Export Excel**: Mengunduh file `.xlsx` (tanpa filter maupun dengan hasil pencarian) serta verifikasi 13 kolom header (*No, Instansi, Nama Siswa, No Kartu Siswa, Tingkat-Kelas, Tanggal Kejadian, Kategori, Tipe, Deskripsi, Sanksi, Poin, Foto, Dibuat Oleh*).

### 3. KSW-1: Kesiswaan — Progres Kegiatan
* **URL Target**: `https://v3.cazh.id/student-affairs/progress`
* **Jumlah Test Cases**: 98 Test Cases (`KSW-1.01` s/d `KSW-1.98`)

### 4. DSH-1: Dashboard Navigation & Stats
* **URL Target**: `https://v3.cazh.id/dashboard`
* **Modular Spec Files**: `DSH-1.01.cy.js` s/d `DSH-1.49.cy.js`

### 5. PGT: Modul Pengaturan (Settings)
* **PGT-16**: Legalitas Bukti Bayar (`PGT-16.01.cy.js` s/d `PGT-16.22.cy.js`)
* **PGT-17**: Kategori Inventaris (`PGT-17.01.cy.js` s/d `PGT-17.42.cy.js`)
* **PGT-18**: Jenis Pelanggaran (`PGT-18.01.cy.js` s/d `PGT-18.57.cy.js`)
* **PGT-19**: Waktu Perizinan (`PGT-19.01.cy.js` s/d `PGT-19.17.cy.js`)
* **PGT-20**: Kategori Pengumuman (`PGT-20.01.cy.js` s/d `PGT-20.49.cy.js`)

---

## 🛠️ Panduan Menjalankan Pengujian

### 1. Install Dependencies & Cypress Binary
```bash
npm install
npx cypress install
```

### 2. Menjalankan Cypress Test Runner (Interactive Mode)
```bash
npx cypress open
```

### 3. Menjalankan Specific Test Suite (Headless Mode)
```bash
# Menjalankan seluruh test suite Modul Anggota - Detail Siswa (Tab Progres)
npx cypress run --spec "cypress/e2e/AGT/AGT-11_detail_siswa_progres.cy.js"

# Menjalankan seluruh test suite Modul Anggota - Detail Siswa (Tab Pelanggaran)
npx cypress run --spec "cypress/e2e/AGT/AGT-13_detail_siswa_pelanggaran.cy.js"

# Menjalankan single test case spesifik (misal: AGT-13.34)
npx cypress run --spec "cypress/e2e/AGT/AGT-13/AGT-13.34.cy.js"

# Menjalankan seluruh test suite Kesiswaan Progres Kegiatan
npx cypress run --spec "cypress/e2e/KSW/KSW-1_progres_kegiatan.cy.js"
```

