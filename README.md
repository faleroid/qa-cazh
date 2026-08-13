<<<<<<< HEAD
# QA Cazh Automation Testing

Framework: **Cypress**.

## Prerequisites

Before getting started, make sure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Yarn](https://yarnpkg.com/) (or npm pre-installed with Node.js)
*   [Git](https://git-scm.com/)

---

## Installation

Follow the steps below to set up the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/faleroid/qa-cazh.git
    cd qa-cazh
    ```

2.  **Install Dependencies**
    You can use `yarn` (recommended as there is a `yarn.lock` file) or `npm`:
    ```bash
    # Using Yarn
    yarn install

    # Or using NPM
    npm install
    ```

---

## Running Cypress

Once the installation is complete, you can run Cypress using one of the following methods:

### 1. Run Cypress Test Runner (Interactive Mode)
This opens the Cypress graphical user interface (GUI) to select and view the test execution visually.
```bash
# Using Yarn
yarn cypress open

# Or using NPM
npx cypress open
```

### 2. Run Cypress in Background (Headless Mode)
This runs all the tests directly in the terminal (suitable for CI/CD environments).
```bash
# Using Yarn
yarn cypress run

# Or using NPM
npx cypress run
```

---

## Project Directory Structure
*   `cypress/e2e/`: Contains the automated test files (`.cy.js`).
*   `cypress/fixtures/`: Contains static test data (such as login credentials or mock payloads).
*   `cypress/support/`: Helper configuration files (custom commands and global setups).
*   `cypress.config.js`: The main Cypress configuration file.
=======
# CAZH v3 - Cypress UAT Test Automation Framework

Framework Otomatisasi User Acceptance Testing (UAT) untuk aplikasi web **School Management System CAZH v3** (URL: [https://v3.cazh.id](https://v3.cazh.id)) menggunakan **Cypress** dengan arsitektur **Page Object Model (POM)**.

---

## ðŸš€ Tech Stack & Arsitektur

* **Testing Framework**: Cypress (v15+)
* **Language & Runtime**: JavaScript / Node.js
* **Design Pattern**: Page Object Model (POM) Strictly Enforced
* **UI Component Support**: Radix UI / shadcn UI (Dialog Modals, Combobox Selects, Accordion Menus, Switch Toggles, React Aria DateFields, Sonner Toasts)
* **Test Data**: Cypress Fixtures (`JSON` files) â€” *Tidak ada hardcoded data pada file spec*
* **Authentication**: `cy.session()` custom command untuk efisiensi login

---

## ðŸ§ª Modul Pengujian (Test Suites)

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

## ðŸ› ï¸ Persyaratan & Instalasi

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

## ðŸƒ Menjalankan Pengujian

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
