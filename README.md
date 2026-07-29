# CAZH v3 - Cypress UAT Test Automation Framework

Framework Otomatisasi User Acceptance Testing (UAT) untuk aplikasi web **School Management System CAZH v3** (URL: [https://v3.cazh.id](https://v3.cazh.id)) menggunakan **Cypress** dengan arsitektur **Page Object Model (POM)**.

---

## 🚀 Tech Stack & Arsitektur

* **Testing Framework**: Cypress (v15+)
* **Language & Runtime**: JavaScript / Node.js
* **Design Pattern**: Page Object Model (POM) Strictly Enforced
* **UI Component Support**: Radix UI / shadcn UI (Dialog Modals, Combobox Selects, Accordion Menus, Switch Toggles, React Aria DateFields, Sonner Toasts)
* **Test Data**: Cypress Fixtures (`JSON` files) — *Tidak ada hardcoded data pada file spec*
* **Authentication**: `cy.session()` custom command untuk efisiensi login

---

## 📁 Struktur Direktori Project

```text
qa-cazh/
├── cypress/
│   ├── e2e/
│   │   ├── PGT-16/                          # Test case modular PGT-16.1 s/d PGT-16.22
│   │   ├── PGT-16_legalitas_bukti_bayar_pom.cy.js  # Full Combined Suite PGT-16
│   │   ├── PGT-17/                          # Test case modular PGT-17.1 s/d PGT-17.42
│   │   ├── PGT-17_kategori_inventaris.cy.js # Full Combined Suite PGT-17
│   │   ├── PGT-18/                          # Test case modular PGT-18.1 s/d PGT-18.57
�│   │   ├── PGT-19/                          # Test case modular PGT-19.1 s/d PGT-19.17
│   │   ├── PGT-19_waktu_perizinan.cy.js     # Full Combined Suite PGT-19
│   │   ├── PGT-20/                          # Test case modular PGT-20.1 s/d PGT-20.49
│   │   └── PGT-20_kategori_pengumuman.cy.js # Full Combined Suite PGT-20
│   ├── fixtures/                            # Data uji JSON & File media upload
│   │   ├── legalityData.json
│   │   ├── inventoryCategoryData.json
│   │   ├── violationTypeData.json
│   │   ├── permissionTimeData.json
│   │   ├── announcementCategoryData.json
│   │   ├── signature.png / .jpg / .jpeg / large_signature.png
│   │   └── document.pdf
│   ├── pages/                               # Page Object Model Classes
│   │   ├── LegalityPage.js
│   │   ├── InventoryCategoryPage.js
│   │   ├── ViolationTypePage.js
│   │   ├── PermissionTimePage.js
│   │   └── AnnouncementCategoryPage.js
│   └── support/                             # Custom Commands & Config
│       ├── commands.js                      # Custom command cy.login()
│       └── e2e.js
├── cypress.config.js                        # Konfigurasi Cypress (baseUrl, timeouts, viewport)
├── package.json
└── README.md
```

---

## 🧪 Modul Pengujian (Test Suites)

### 1. PGT-16: Legalitas Bukti Bayar (Modal Dialog UI)
Modul pengaturan legalitas dan tanda tangan digital pada bukti pembayaran/invoice instansi.
* **Coverage (22 Test Cases)**:
  * Pembukaan modal dialog legalitas via sidebar navigation Radix UI.
  * Seleksi dropdown Instansi & pemuatan data konfigurasi.
  * Toggling switch aktif/non-aktif & conditional rendering sub-field (Pengesahan, Jabatan, Nama Terang).
  * Validasi error pada field wajib diisi (*required fields validation*).
  * Upload file tanda tangan digital (PNG, JPG, JPEG < 2MB) & validasi batas ukuran file (> 2MB) serta tipe file tak terdukung (PDF) via Sonner Toast notifications.
  * Verifikasi End-to-End tampilnya data legalitas pada halaman Bukti Pembayaran Invoice.

### 2. PGT-17: Kategori Inventaris (CRUD & Data Table)
Modul pengelolaan data kategori inventaris barang instansi.
* **Coverage (42 Test Cases)**:
  * Form Tambah & Edit Kategori Inventaris.
  * Pencarian data (*Search*), Filter per-Instansi, dan Reset Filter.
  * Pengurutan kolom (*Sorting Ascending/Descending*) pada tabel.
  * Seleksi jumlah baris per halaman (*Pagination Page Size*).
  * Hapus data (*Delete confirmation modal & close handlers*).
  * Pengujian UI Empty State (*Kondisi 0 Data*).

### 3. PGT-18: Tipe Pelanggaran Kesiswaan (CRUD & Form Validations)
Modul pengaturan tipe pelanggaran kesiswaan (Pengaturan - Kesiswaan - Tipe Pelanggaran).
* **Coverage (57 Test Cases)**:
  * Form Tambah & Edit Tipe Pelanggaran (Instansi, Nama, Min Poin, Max Poin, Status).
  * Validasi Angka Negatif, Min > Max, Min = Max, Max > 999, Overlap Range Poin, Duplikat Nama, dan Truncation Warning Limit 100 Karakter.
  * Toggling Status Aktif vs Tidak Aktif & integrasi ketersediaan opsi pada Fitur Buat Pelanggaran.
  * Pencarian (*Search*), Filter Instansi, Filter Status, dan Kombinasi Filter + Search.
  * Pagination Page Size & Hapus Data dengan Konfirmasi Modal / Escape Key.

### 4. PGT-19: Waktu Perizinan Kesiswaan (Form Configuration & Multi-Instansi)
Modul pengaturan batas waktu maksimal pengajuan perizinan kesiswaan (Pengaturan - Kesiswaan - Waktu Perizinan).
* **Coverage (17 Test Cases)**:
  * Pembukaan dialog modal **Pengaturan Perizinan** dari menu sidebar navigasi (`Perizinan`).
  * Initial State modal dialog dengan placeholder `"Pilih Instansi"`.
  * Pembukaan dropdown Instansi & pemuatan data konfigurasi waktu perizinan per-instansi (`Sekolah Digital Indonesia`, `Academy QA Engineer`, `Academy Cazh`, dsb.).
  * Toggling switch `Batas Waktu Maksimal Pengajuan Perizinan` (ON vs OFF state).
  * Conditional rendering komponen input jam React Aria (`[data-slot="datefield"]`) saat toggle ON vs tersembunyi saat toggle OFF.
  * Verifikasi dinamika Helper Text & Informasi Box saat toggle ON vs OFF.
  * Validasi pengetikan jam format 24-Jam (`00:00 - 23:59`) & penolakan/auto-capping angka tidak valid (misal `25:00`).
  * Penyimpanan konfigurasi (*Save & Toast Notification*) & verifikasi persistent state data.
  * Independensi data antar multi-instansi (Perubahan pada Instansi A tidak mengubah Instansi B).

### 5. PGT-20: Kategori Pengumuman Administrasi (Form Navigation & Usage Integration)
Modul pengelolaan kategori pengumuman administrasi (Pengaturan - Administrasi - Kategori Pengumuman).
* **Coverage (49 Test Cases)**:
  * Form Tambah & Edit Kategori Pengumuman (Page Title, Form Prefill, Navigation Back button).
  * Validasi Nama Kategori: Field Kosong, Limit Minimum (<2 karakter), Limit Maksimum (>100 karakter), Whitespace Only, Karakter Khusus Dilarang (@#$%) vs Karakter Khusus Diizinkan (- _ & .), dan Alfanumerik + Spasi.
  * Penolakan Duplikat Nama Kategori (Uniqueness check pada Kategori Aktif maupun Nonaktif).
  * Handling Server Error 500 & Form State Preservation saat submit gagal.
  * Toggling Status Aktif vs Nonaktif & Badge Status pada Tabel Data.
  * Integrasi Ketersediaan Dropdown Opsi Kategori pada Fitur Tambah/Edit Pengumuman (Hanya kategori Aktif yang tampil).
  * Pencarian (*Search Partial Match*), Filter Status (Aktif / Nonaktif), Pagination Page Size (10, 25, 50), dan Default Sorting (Terbaru paling atas).
  * Soft Delete Kategori: Konfirmasi Modal, Tombol Batal / Key Escape, Penolakan Hapus jika Kategori masih digunakan pengumuman aktif, dan Penghapusan Kategori dari Dropdown Opsi Pengumuman.

---

## 🛠️ Persyaratan & Instalasi

### Prasyarat
* **Node.js**: v16.x atau versi lebih baru
* **npm**: v8.x atau versi lebih baru

### Langkah Instalasi
1. Clone atau buka direktori proyek ini:
   ```bash
   cd qa-cazh
   ```
2. Install semua dependencies:
   ```bash
   npm install
   ```

---

## 🏃 Menjalankan Pengujian

### 1. Menjalankan via Cypress Interactive Runner (GUI)
Buka Cypress Test Runner berbasis antarmuka grafis:
```bash
npx cypress open
```
Pilih **E2E Testing** -> Pilih Browser (Chrome/Electron/Edge) -> Klik file test spec yang ingin dijalankan.

---

## 2. Menjalankan via Command Line (CLI / Headless Mode)

* **Menjalankan Seluruh Spec File**:
  ```bash
  npx cypress run
  ```

* **Menjalankan Single Test Suite Gabungan (Full Regression)**:
  ```bash
  # Run Full Suite PGT-16
  npx cypress run --spec "cypress/e2e/PGT-16_legalitas_bukti_bayar_pom.cy.js"

  # Run Full Suite PGT-17
  npx cypress run --spec "cypress/e2e/PGT-17_kategori_inventaris.cy.js"

  # Run Full Suite PGT-18
  npx cypress run --spec "cypress/e2e/PGT-18_tipe_pelanggaran.cy.js"

  # Run Full Suite PGT-19
  npx cypress run --spec "cypress/e2e/PGT-19_waktu_perizinan.cy.js"

  # Run Full Suite PGT-20
  npx cypress run --spec "cypress/e2e/PGT-20_kategori_pengumuman.cy.js"
  ```

* **Menjalankan Single Test Case Spesifik (Modular Debugging)**:
  ```bash
  # Contoh: Run hanya PGT-16.1
  npx cypress run --spec "cypress/e2e/PGT-16/PGT-16.1.cy.js"

  # Contoh: Run hanya PGT-19.1
  npx cypress run --spec "cypress/e2e/PGT-19/PGT-19.1.cy.js"

  # Contoh: Run hanya PGT-20.1
  npx cypress run --spec "cypress/e2e/PGT-20/PGT-20.1.cy.js"
  ```

* **Menjalankan Single Test Case Spesifik (Modular Debugging)**:
  ```bash
  # Contoh: Run hanya PGT-16.1
  npx cypress run --spec "cypress/e2e/PGT-16/PGT-16.1.cy.js"

  # Contoh: Run hanya PGT-19.1
  npx cypress run --spec "cypress/e2e/PGT-19/PGT-19.1.cy.js"
  ```

---

## 💡 Best Practices & Standard Penulisan Script

1. **Page Object Model (POM)**:
   * **Element Selectors**: Semua query DOM (`cy.get()`, `cy.contains()`) ditempatkan dalam objek `elements` pada Class Page (`cypress/pages/`).
   * **Business Logic & Actions**: Fungsi navigasi, pengisian form, dan verifikasi dibuat dalam metode Class Page.
2. **Penanganan Radix UI / shadcn UI**:
   * Menggunakan `{ force: true }` pada tombol action jika terlindungi animasi/state collapsed Radix UI.
   * Seleksi dropdown portal (`[role="option"]`, `[data-slot="select-item"]`) yang di-render di luar container dialog.
   * Pencocokan teks exact menggunakan regex `cy.contains(...)` untuk menghindari benturan nama menu serupa (misal: `"Tagihan F"` vs `"Jenis Tagihan F"`).
   * Penanganan elemen asinkron / Sonner Toast dengan kueri dinamis `cy.contains(...).should('exist')` yang kebal terhadap *detached DOM element*.
3. **Pembersihan Data Test & Isolasi Test**:
   * Setiap skenario uji mandiri membuat atau membersihkan datanya sendiri secara otomatis untuk mencegah ketergantungan antar test case.
