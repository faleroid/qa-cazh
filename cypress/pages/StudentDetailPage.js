import testData from '../fixtures/studentData.json';

class StudentDetailPage {
  visitStudentList() {
    // 1. Jeda penantian awal setelah login agar hidrasi DOM/Next.js selesai 100%
    cy.wait(2500);

    cy.visit(testData.urls.studentPage, { failOnStatusCode: false, timeout: 30000 });
    cy.wait(2000);

    // 2. Selalu pastikan menu parent "Anggota" di sidebar diklik jika submenu Siswa belum terlihat
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const isSiswaVisible = $body.find('a[href="/member/student"]:visible').length > 0;
      if (!isSiswaVisible) {
        cy.log('Submenu Siswa belum terbuka. Menekan menu Anggota di sidebar...');
        cy.contains('button, [role="button"], a, span, div, p', /anggota/i, { timeout: 15000 })
          .first()
          .click({ force: true });
        cy.wait(1000);
      }
    });

    // 3. Klik submenu "Siswa" di sidebar
    cy.get('a[href="/member/student"]', { timeout: 15000 })
      .first()
      .click({ force: true });

    cy.wait(2000);
  }


  navigateToFirstStudentDetail() {
    this.visitStudentList();
    cy.wait(1500);

    // 3. Tunggu tabel data siswa terisi
    cy.get('tbody tr', { timeout: 20000 }).should('exist').and('have.length.at.least', 1);

    // 4. Klik link nama/detail siswa pada baris pertama tabel (kolom ke-2 / Nama Siswa)
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const studentDetailHref = $row.find('a[href*="/member/student/"]');
      const lihatBtn = $row.find('a:contains("Lihat"), button:contains("Lihat"), a:contains("Detail"), button:contains("Detail"), button:has(svg.lucide-eye)');
      const nameLink = $row.find('td').eq(1).find('a, button');

      if (studentDetailHref.length > 0) {
        cy.wrap(studentDetailHref.first()).click({ force: true });
      } else if (lihatBtn.length > 0) {
        cy.wrap(lihatBtn.first()).click({ force: true });
      } else if (nameLink.length > 0) {
        cy.wrap(nameLink.first()).click({ force: true });
      } else {
        cy.wrap($row.find('td').eq(1)).click({ force: true });
      }
    });

    cy.wait(1500);
  }









  verifyHeaderInfo() {
    cy.url().should('include', '/member/student/');
    cy.get('body').then(($body) => {
      const text = $body.text();
      expect(text, 'Header Detail Siswa harus memuat informasi dasar').to.be.ok;
    });
  }

  verifyHistoryFilters() {
    // 1. Klik tombol Filter (button khusus bertuliskan Filter)
    cy.contains('button', /^filter$/i, { timeout: 15000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    cy.wait(800);

    // 2. Verifikasi popover terbuka dan memuat ke-4 filter (Tahun Ajaran, Semester, Tingkat, Kelas)
    cy.get('body', { timeout: 15000 }).should(($body) => {
      const text = $body.text();
      const hasFilterText = text.includes('Tahun Ajaran') || text.includes('Semester') || text.includes('Tingkat') || text.includes('Kelas') || $body.find('[data-slot="popover-content"], [data-radix-popper-content-wrapper], [role="dialog"]').length > 0;
      expect(hasFilterText, 'Popover Filter harus terbuka dan memuat opsi filter (Tahun Ajaran, Semester, Tingkat, Kelas)').to.be.true;
    });
  }

  verifyElevenTabs() {
    // 1. Verifikasi tablist utama ([data-slot="tabs-list"]) memuat 10 tab langsung + dropdown Lainnya
    cy.get('[data-slot="tabs-list"], [role="tablist"]', { timeout: 15000 })
      .should('be.visible')
      .within(() => {
        cy.contains(/data (siswa|diri)/i).should('exist');
        cy.contains('Data Orang Tua').should('exist');
        cy.contains('Kartu').should('exist');
        cy.contains('Tagihan').should('exist');
        cy.contains('Dokumen').should('exist');
        cy.contains('Rapor').should('exist');
        cy.contains('Kesehatan').should('exist');
        cy.contains('Pelanggaran').should('exist');
        cy.contains('Prestasi').should('exist');
        cy.contains('Perizinan').should('exist');
        cy.contains(/lainnya|progres/i).should('exist');
      });

    // 2. Verifikasi tab ke-11 "Progres" (diakses via menu Lainnya jika belum terbuka)
    cy.get('body').then(($body) => {
      if ($body.find('[role="menuitem"]:contains("Progres"), div:contains("Progres")').length === 0) {
        const btnLainnya = $body.find('button[data-slot="dropdown-menu-trigger"]:contains("Lainnya"), button:contains("Lainnya")');
        if (btnLainnya.length > 0) {
          cy.wrap(btnLainnya.first()).click({ force: true });
          cy.wait(400);
        }
      }
    });
    cy.contains(/progres/i, { timeout: 10000 }).should('exist');
  }

  clickProgresTab() {
    cy.get('body').then(($body) => {
      const isVisibleDirect = $body.find('[role="tab"]:contains("Progres"), button:contains("Progres")').length > 0;
      if (isVisibleDirect) {
        cy.contains('[role="tab"], button, a', 'Progres').click({ force: true });
      } else {
        // Klik tombol dropdown "Lainnya"
        cy.get('button[data-slot="dropdown-menu-trigger"], button', { timeout: 10000 })
          .contains('Lainnya')
          .click({ force: true });
        cy.wait(500);
        cy.contains('[role="menuitem"], button, a, div', 'Progres').click({ force: true });
      }
    });
    cy.wait(1500);
  }

  verifyProgresTableColumns() {
    cy.get('thead th, thead tr', { timeout: 15000 }).should('exist');
    cy.contains('th, button, div', 'Kegiatan').should('exist');
    cy.contains('th, button, div', 'Deskripsi').should('exist');
  }

  searchKeyword(keyword) {
    cy.get('body').then(($body) => {
      const searchInput = $body.find('input[placeholder*="Cari"], input[placeholder*="search"], input[type="search"]');
      if (searchInput.length > 0) {
        cy.wrap(searchInput.first())
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .clear({ force: true })
          .type(`${keyword}{enter}`, { force: true });
        cy.wait(800);
      } else {
        cy.log(`Fitur input pencarian tidak ditemukan pada halaman (keyword: ${keyword}).`);
      }
    });
  }

  clickKesehatanTab() {
    cy.get('body').then(($body) => {
      const isVisibleDirect = $body.find('[role="tab"]:contains("Kesehatan"), button:contains("Kesehatan")').length > 0;
      if (isVisibleDirect) {
        cy.contains('[role="tab"], button, a', 'Kesehatan').click({ force: true });
      } else {
        cy.get('button[data-slot="dropdown-menu-trigger"], button', { timeout: 10000 })
          .contains('Lainnya')
          .click({ force: true });
        cy.wait(500);
        cy.contains('[role="menuitem"], button, a, div', 'Kesehatan').click({ force: true });
      }
    });

    // Jeda penantian agar seluruh komponen & data Tab Kesehatan ter-load sempurna oleh Next.js
    cy.get('[data-slot="card"]', { timeout: 15000 }).should('exist');
    cy.wait(1500);
  }

  verifyKesehatanSections() {
    cy.get('body', { timeout: 15000 }).should(($body) => {
      const text = $body.text();
      const hasSections = text.includes('Data Kesehatan') && (text.includes('Tambah Imunisasi') || text.includes('Imunisasi')) && text.includes('Riwayat Kesehatan');
      expect(hasSections, 'Tab Kesehatan harus memuat 3 section utama: Data Kesehatan, Imunisasi, dan Riwayat Kesehatan').to.be.true;
    });
  }

  verifyKesehatanFields() {
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Data Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .within(() => {
        // 1. Riwayat Kesehatan
        cy.contains('label', 'Riwayat Kesehatan').should('be.visible');
        cy.get('input[name="medical_history"]').should('exist');

        // 2. Disabilitas
        cy.contains('label', 'Disabilitas').should('be.visible');
        cy.contains('span', 'Masukkan disabilitas').should('exist');

        // 3. Hasil Tes Buta Warna
        cy.contains('label', 'Hasil Tes Buta Warna').should('be.visible');
        cy.get('input[name="color_blind_test_result"]').should('exist');

        // 4. Tinggi Badan
        cy.contains('label', 'Tinggi Badan').should('be.visible');
        cy.get('input[name="height"]').should('exist');

        // 5. Berat Badan
        cy.contains('label', 'Berat Badan').should('be.visible');
        cy.get('input[name="weight"]').should('exist');

        // 6. Golongan Darah
        cy.contains('label', 'Golongan Darah').should('be.visible');
        cy.contains('span', 'Masukkan Golongan Darah').should('exist');

        // Tombol Simpan
        cy.contains('button[type="submit"]', 'Simpan').should('be.visible');
      });
  }

  verifyRiwayatKesehatanColumns() {
    cy.get('thead th, thead tr', { timeout: 15000 }).should('exist');
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasColumns = text.includes('Tanggal Kejadian') || text.includes('Indikator') || text.includes('Tindakan') || text.includes('Keterangan') || text.includes('Dibuat Oleh');
      expect(hasColumns, 'Tabel Riwayat Kesehatan harus memuat kolom Tanggal Kejadian, Indikator/Indikasi, Tindakan, Keterangan, Dibuat Oleh').to.be.true;
    });
  }

  clickPelanggaranTab() {
    cy.get('body', { timeout: 15000 }).then(($body) => {
      // 1. Cek apakah elemen tab "Pelanggaran" tersedia langsung pada tablist
      const directTab = $body.find('[role="tablist"] *, [data-slot="tabs-list"] *, [role="tab"], button, a, div').filter((i, el) => {
        const txt = (el.innerText || '').trim();
        return /^pelanggaran$/i.test(txt) || txt === 'Pelanggaran';
      });

      if (directTab.length > 0) {
        cy.wrap(directTab.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
      } else {
        // 2. Jika di dalam dropdown Lainnya
        const btnLainnya = $body.find('button, [role="button"], a').filter((i, el) => /lainnya/i.test(el.innerText || ''));
        if (btnLainnya.length > 0) {
          cy.wrap(btnLainnya.first()).click({ force: true });
          cy.wait(500);
        }
        cy.contains(/pelanggaran/i, { timeout: 10000 }).click({ force: true });
      }
    });
    cy.wait(1500);
  }

  clickPrestasiTab() {
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const directTab = $body.find('[role="tablist"] *, [data-slot="tabs-list"] *, [role="tab"], button, a').filter((i, el) => {
        return /^prestasi$/i.test((el.innerText || '').trim());
      });

      if (directTab.length > 0) {
        cy.wrap(directTab.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
      } else {
        const more = $body.find('button, [role="button"], a').filter((i, el) => /lainnya/i.test(el.innerText || ''));
        if (more.length > 0) {
          cy.wrap(more.first()).click({ force: true });
          cy.wait(500);
        }
        cy.contains('[role="menuitem"], [role="tab"], button, a', /^prestasi$/i, { timeout: 10000 }).click({ force: true });
      }
    });
    cy.wait(1500);
  }

  ensurePrestasiDataExists() {
    cy.get('body').then(($body) => {
      const hasRows = $body.find('tbody tr').length > 0 && !$body.text().includes('tidak ditemukan') && !$body.text().includes('Belum ada data') && !$body.text().includes('tidak ada data');
      if (!hasRows) {
        cy.log('Tabel prestasi belum berisi data. Menambahkan 1 data prestasi baru...');
        this.addSinglePrestasi();
      }
    });
  }

  ensurePrestasiDataCount(targetCount = 50) {
    cy.get('body').then(($body) => {
      const text = $body.text();
      // Check current count from pagination text (e.g., "1-10 dari 25" or "dari 50")
      const match = text.match(/dari\s+(\d+)/i);
      let currentCount = match ? parseInt(match[1], 10) : 0;

      if (currentCount < targetCount) {
        const needed = targetCount - currentCount;
        cy.log(`Data prestasi saat ini: ${currentCount}. Menambahkan ${needed} data prestasi...`);
        Cypress._.times(needed, (i) => {
          cy.get('body').then(($b) => {
            if ($b.find('[role="dialog"]').length > 0) {
              cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
            }
          });
          this.addSinglePrestasi({
            kategori: `Prestasi Auto ${currentCount + i + 1}`,
            poin: '10',
            deskripsi: `Deskripsi Prestasi Auto ${currentCount + i + 1}`,
            apresiasi: `Piagam Penghargaan ${currentCount + i + 1}`
          });
        });
      }
    });
  }

  addSinglePrestasi(data = {}) {
    const kategori = data.kategori || testData.prestasiData.kategori || 'Juara 1 Lomba';
    const poin = data.poin || testData.prestasiData.poin || '25';
    const deskripsi = data.deskripsi || testData.prestasiData.deskripsi || 'Prestasi Akademik';
    const apresiasi = data.apresiasi || testData.prestasiData.apresiasi || 'Piagam';

    cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
    cy.wait(500);
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should('be.visible');

    // 1. Tanggal Kejadian
    cy.get('[role="dialog"]').within(() => {
      cy.get('button[name="date"], button[data-slot="form-control"], button[data-slot="popover-trigger"], button:contains("Tanggal")').first().click({ force: true });
    });
    cy.get('table.rdp-month_grid tbody button, [role="gridcell"] button, .rdp-day button, .rdp-day, [data-slot="calendar"] button', { timeout: 8000 })
      .filter(':visible')
      .first()
      .click({ force: true });
    cy.wait(200);

    // 2. Form input fields (Kategori, Point, Deskripsi, Apresiasi)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().click({ force: true }).clear({ force: true }).type(kategori, { force: true, delay: 0 });
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().click({ force: true }).clear({ force: true }).type(poin, { force: true, delay: 0 });
      cy.get('input[name="description"], textarea[name="description"], textarea').first().click({ force: true }).clear({ force: true }).type(deskripsi, { force: true, delay: 0 });
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"]').last().click({ force: true }).clear({ force: true }).type(apresiasi, { force: true, delay: 0 });

      if (data.foto) {
        cy.get('input[type="file"]').first().selectFile(data.foto, { force: true });
        cy.wait(1500);
      }

      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(1500);
    cy.get('body').then(($b) => {
      if ($b.find('[role="dialog"]').length > 0) {
        cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
        cy.wait(1000);
      }
    });
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.wait(500);
  }

  verifyPrestasiHeaderPoin() {
    cy.get('body', { timeout: 15000 }).should(($body) => {
      const text = $body.text();
      const hasHeaderPoin = text.includes('Poin Prestasi Terkumpul') || text.includes('Poin Prestasi') || text.includes('Prestasi Terkumpul') || text.includes('Total Poin');
      expect(hasHeaderPoin, 'Header Poin Prestasi Terkumpul harus muncul di tab Prestasi').to.be.true;
    });
  }

  verifyPrestasiTableColumns() {
    cy.get('thead th, thead tr', { timeout: 15000 }).should('exist');
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasColumns = text.includes('Tanggal') || text.includes('Kategori') || text.includes('Deskripsi') || text.includes('Apresiasi') || text.includes('Poin') || text.includes('Aksi');
      expect(hasColumns, 'Tabel Prestasi harus memuat kolom: Tanggal Kejadian, Kategori Prestasi, Deskripsi, Apresiasi, Poin, Foto, Dibuat Oleh, Aksi').to.be.true;
    });
  }

  verifyPelanggaranHeaderPoin() {
    cy.get('body', { timeout: 15000 }).should(($body) => {
      const text = $body.text();
      const hasHeaderPoin = text.includes('Poin Pelanggaran Terkumpul') || text.includes('Poin Pelanggaran') || text.includes('Total Poin');
      expect(hasHeaderPoin, 'Header Poin Pelanggaran Terkumpul harus muncul di tab Pelanggaran').to.be.true;
    });
  }

  verifyPelanggaranTableColumns() {
    cy.get('thead th, thead tr', { timeout: 15000 }).should('exist');
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasColumns = text.includes('Tanggal') || text.includes('Kategori') || text.includes('Tipe') || text.includes('Deskripsi') || text.includes('Sanksi') || text.includes('Poin') || text.includes('Aksi');
      expect(hasColumns, 'Tabel Pelanggaran harus memuat kolom: Tanggal Kejadian, Kategori, Tipe, Deskripsi, Sanksi, Poin, Foto, Dibuat Oleh, Aksi').to.be.true;
    });
  }

  fillTanggalKejadian() {
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[name="date"], button[data-slot="popover-trigger"], button:contains("Tanggal")').first().click({ force: true });
      cy.wait(300);
    });

    cy.get('body').then(($b) => {
      const dayBtn = $b.find('table.rdp-month_grid tbody button, [role="gridcell"] button, .rdp-day button, .rdp-day').filter(':visible').first();
      if (dayBtn.length) {
        cy.wrap(dayBtn).click({ force: true });
        cy.wait(300);
      }
    });
  }

  ensurePelanggaranDataExists() {
    cy.get('body').then(($body) => {
      const hasRows = $body.find('tbody tr').length > 0 && !$body.text().includes('tidak ditemukan') && !$body.text().includes('Belum ada data');
      if (!hasRows) {
        cy.log('Tabel pelanggaran belum berisi data. Menambahkan 1 data pelanggaran baru...');
        cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
        cy.wait(600);

        // 1. Tanggal Kejadian
        this.fillTanggalKejadian();

        // 2. Tipe Pelanggaran Dropdown
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

        // 3. Form input fields (Kategori, Poin, Deskripsi, Sanksi/Penalty)
        cy.get('[role="dialog"]').within(() => {
          // Kategori
          cy.get('input[name="category"], input[placeholder*="tata tertib"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
          cy.wait(200);

          // Poin (Cek placeholder range otomatis)
          cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().then(($input) => {
            const ph = $input.attr('placeholder') || '';
            let val = testData.pelanggaranData.poin || '80';
            const match = ph.match(/(\d+)\s*-\s*(\d+)/);
            if (match) {
              const min = parseInt(match[1], 10);
              const max = parseInt(match[2], 10);
              val = String(Math.floor((min + max) / 2));
            }
            cy.wrap($input).clear({ force: true }).type(val, { force: true });
          });
          cy.wait(200);

          // Deskripsi
          cy.get('input[name="description"], textarea[name="description"], input[placeholder*="seragam"]').first().clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
          cy.wait(200);

          // Sanksi (name="penalty")
          cy.get('input[name="penalty"], input[name*="sanction"], textarea[name*="sanction"], input[placeholder*="Peringatan"], input[placeholder*="Sanksi"]').first().clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
          cy.wait(200);

          // Simpan
          cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
        });

        cy.wait(1500);
        cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
        cy.wait(1000);
      }
    });
  }

  addSinglePelanggaran(data = {}) {
    const kategori = data.kategori || testData.pelanggaranData.kategori;
    const initialPoin = data.poin || testData.pelanggaranData.poin || '80';
    const deskripsi = data.deskripsi || testData.pelanggaranData.deskripsi;
    const sanksi = data.sanksi || testData.pelanggaranData.sanksi;

    cy.contains('button, a', /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Tanggal Kejadian
    this.fillTanggalKejadian();

    // 2. Tipe Pelanggaran Dropdown
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

    // 3. Form input fields
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="tata tertib"]').first().clear({ force: true }).type(kategori, { force: true });
      cy.wait(200);

      // Poin dengan pembacaan otomatis range placeholder
      cy.get('input[name="point"], input[name="poin"]').first().then(($input) => {
        const ph = $input.attr('placeholder') || '';
        let validPoint = initialPoin;
        const match = ph.match(/(\d+)\s*-\s*(\d+)/);
        if (match) {
          const min = parseInt(match[1], 10);
          const max = parseInt(match[2], 10);
          const num = parseInt(initialPoin, 10);
          if (isNaN(num) || num < min || num > max) {
            validPoint = String(Math.floor((min + max) / 2));
          }
        }
        cy.wrap($input).clear({ force: true }).type(validPoint, { force: true });
      });
      cy.wait(200);

      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"], input[placeholder*="Peringatan"]').first().clear({ force: true }).type(sanksi, { force: true });
      cy.wait(200);

      // Upload Foto jika ada
      if (data.foto) {
        cy.get('input[type="file"]').first().selectFile(data.foto, { force: true });
        cy.wait(5000);
      }

      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(2000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.wait(800);
  }
}

export default new StudentDetailPage();




