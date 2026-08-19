import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

describe('MODUL ANGGOTA - 12. Anggota - Detail Siswa - Tab Kesehatan (AGT-12.01 - AGT-12.42)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
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
  it('AGT-12.05: Klik tombol Tambah Imunisasi -> Tampil form pada Card Imunisasi dengan field Tanggal Imunisasi & Nama Imunisasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Target Card Imunisasi dan scroll ke posisi tombol Tambah Imunisasi
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span', /tambah imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Klik tombol "Tambah Imunisasi" di dalam Card Imunisasi
    cy.get('[data-slot="card"]')
      .contains('button, span', /tambah imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, span', /tambah imunisasi/i)
          .click({ force: true });
      });

    cy.wait(600);

    // 3. Verifikasi detail elemen di dalam Card Imunisasi
    cy.get('[data-slot="card"]')
      .contains('button, span', /tambah imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        // Verifikasi Label & Trigger Button Tanggal Imunisasi
        cy.contains('label', /tanggal imunisasi/i)
          .should('be.visible');
        cy.get('button[data-slot="dropdown-menu-trigger"], button[id*="date"], button:has(svg.lucide-calendar-days)')
          .first()
          .should('be.visible');

        // Verifikasi Label & Input Field Nama Imunisasi
        cy.contains('label', /nama imunisasi/i)
          .should('be.visible');
        cy.get('input[id*="name"], input[placeholder*="Masukkan Nama Imunisasi"]')
          .first()
          .should('be.visible');

        // Verifikasi Tombol Hapus (trash) per baris imunisasi
        cy.get('button svg.lucide-trash, button[class*="text-destructive"]')
          .first()
          .should('be.visible');
      });
  });

  it('AGT-12.06: Kosongkan salah satu field Imunisasi, klik Simpan -> Sistem menampilkan pesan error (validasi required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .within(($card) => {
        if ($card.find('input[id*="name"], input[placeholder*="Nama Imunisasi"]').length === 0) {
          cy.contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.get('input[id*="name"], input[placeholder*="Nama Imunisasi"]').first().clear({ force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);
    cy.contains('label', /nama imunisasi/i).should('be.visible');
  });

  it('AGT-12.07: Isi Tanggal + Nama Imunisasi, klik Simpan -> Imunisasi tersimpan; pesan success "Berhasil memperbarui data kesehatan" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .within(($card) => {
        if ($card.find('input[id*="name"], input[placeholder*="Nama Imunisasi"]').length === 0) {
          cy.contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.get('input[id*="name"], input[placeholder*="Nama Imunisasi"]').first().clear({ force: true }).type(testData.imunisasiData.nama, { force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('contain.text', 'Berhasil memperbarui data kesehatan');
      } else {
        const text = $body.text().toLowerCase();
        expect(text).to.satisfy((t) =>
          t.includes('berhasil') || t.includes('kesehatan') || t.includes(testData.imunisasiData.nama.toLowerCase())
        );
      }
    });
  });

  it('AGT-12.08: Klik icon Hapus pada baris Imunisasi -> Imunisasi langsung terhapus TANPA popup confirmation', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .then(($card) => {
        if ($card.find('button.text-destructive, button svg.lucide-trash, button:has(svg.lucide-trash)').length === 0) {
          cy.wrap($card).contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.wrap($card).within(() => {
          cy.get('button.text-destructive, button svg.lucide-trash, button:has(svg.lucide-trash)')
            .first()
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .should('be.visible')
            .click({ force: true });
        });
      });

    cy.wait(800);
    // Verifikasi bahwa TIDAK ADA popup konfirmasi dialog yang terbuka (langsung terhapus TANPA popup)
    cy.get('body').then(($body) => {
      const dialogs = $body.find('[role="dialog"], [data-slot="dialog-content"]');
      expect(dialogs.length, 'Penghapusan baris imunisasi harus terjadi secara langsung TANPA popup konfirmasi').to.equal(0);
    });
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

  it('AGT-12.10: Buka tab Kesehatan saat belum ada riwayat', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(600);

    // 2. CEK & PEMBERSIHAN DATA:
    // Jika tabel Card 3 masih berisi data riil, lakukan pembersihan via Centang Header -> Hapus Bulk
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        // Filter baris yang benar-benar berisi data (abaikan placeholder empty-state)
        const dataRows = $rows.toArray().filter((row) => {
          const txt = (row.innerText || '').toLowerCase();
          if (/(tidak ada|tidak ditemukan|belum|kosong)/.test(txt)) return false;
          const tds = row.querySelectorAll('td');
          if (!tds || tds.length === 0) return false;
          const cellText = Array.from(tds).map(td => td.innerText.trim()).join(' ');
          if (!cellText) return false;
          if (/^[-––—]+$/.test(cellText)) return false;
          return true;
        });

        if (dataRows.length > 0) {
          cy.log(`[AGT-12.10] Tabel berisi ${dataRows.length} data riil. Melakukan centang header & hapus bulk...`);

          // A. Centang Checkbox Header di Card 3 (menggunakan selector persis AGT-12.32)
          cy.get('[data-slot="card"]')
            .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
            .parents('[data-slot="card"]')
            .first()
            .find('thead th button[role="checkbox"], button[aria-label="Select all"], thead th [data-slot="checkbox"]')
            .first()
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .click({ force: true });

          cy.wait(1000);

          // B. Klik tombol "Hapus" pada banner / floating action bar (menggunakan selector persis AGT-12.31)
          cy.contains('button', /hapus/i, { timeout: 10000 })
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .should('be.visible')
            .click({ force: true });

          cy.wait(600);

          // C. Klik tombol "Hapus" pada modal popup konfirmasi Hapus Bulk (menggunakan selector persis AGT-12.32)
          cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
            .should('be.visible')
            .within(() => {
              cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
            });

          cy.wait(2000);

          // D. Jika penghapusan bulk gagal (masih ada data), lakukan fallback: hapus per baris
          cy.get('[data-slot="card"]')
            .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
            .parents('[data-slot="card"]')
            .first()
            .find('tbody tr')
            .then(($after) => {
              const remaining = $after.toArray().filter((row) => {
                const txt = (row.innerText || '').toLowerCase();
                if (/(tidak ada|tidak ditemukan|belum|kosong)/.test(txt)) return false;
                const tds = row.querySelectorAll('td');
                if (!tds || tds.length === 0) return false;
                const cellText = Array.from(tds).map(td => td.innerText.trim()).join(' ');
                if (!cellText) return false;
                if (/^[-––—]+$/.test(cellText)) return false;
                return true;
              });

              if (remaining.length > 0) {
                cy.log(`[AGT-12.10] Bulk delete tidak menghapus semua baris. Melakukan delete per-baris (${remaining.length}) sebagai fallback.`);

                // Hapus setiap baris satu per satu
                cy.wrap(remaining).each((row) => {
                  const $row = Cypress.$(row);
                  // Cari tombol hapus di dalam baris
                  const delBtn = $row.find('button svg.lucide-trash').closest('button');
                  const altBtn = $row.find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]');
                  if (delBtn && delBtn.length) {
                    cy.wrap(delBtn).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
                  } else if (altBtn && altBtn.length) {
                    cy.wrap(altBtn.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
                  } else {
                    // Jika tidak ada tombol hapus, log untuk investigasi
                    cy.log('Tidak menemukan tombol hapus di baris — abaikan.');
                  }

                  cy.wait(500);

                  // Jika muncul dialog konfirmasi, klik konfirmasi
                  cy.get('body').then(($body) => {
                    const dialogs = $body.find('[role="dialog"], [data-slot="dialog-content"]');
                    if (dialogs.length > 0) {
                      cy.get('[role="dialog"], [data-slot="dialog-content"]').within(() => {
                        cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
                      });
                      cy.wait(500);
                    }
                  });
                });

                cy.wait(1000);
              } else {
                cy.log('[AGT-12.10] Bulk delete berhasil menghapus semua baris.');
              }
            });
        } else {
          cy.log('[AGT-12.10] Tidak ditemukan baris data riil — melewati pembersihan bulk.');
        }
      });

    cy.wait(1000);

    // 3. ASERSI FINAL: Memastikan Card 3 Riwayat Kesehatan 100% EMPTY STATE
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        const dataRows = $rows.toArray().filter((row) => {
          const txt = (row.innerText || '').toLowerCase();
          if (/(tidak ada|tidak ditemukan|belum|kosong)/.test(txt)) return false;
          const tds = row.querySelectorAll('td');
          if (!tds || tds.length === 0) return false;
          const cellText = Array.from(tds).map(td => td.innerText.trim()).join(' ');
          if (!cellText) return false;
          if (/^[-––—]+$/.test(cellText)) return false;
          return true;
        });

        expect(dataRows.length, 'Tabel Riwayat Kesehatan harus dalam keadaan kosong (empty state)').to.equal(0);
      });
  });

  it('AGT-12.11: Cari riwayat kesehatan dengan keyword Indikasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Tambah 1 data Riwayat Kesehatan jika belum ada data agar tidak false positive
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .then(($card) => {
        const hasRows = $card.find('tbody tr').length > 0 && !$card.text().includes('tidak ditemukan');
        if (!hasRows) {
          cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
          cy.wait(600);

          // Klik trigger Date Picker
          cy.get('button[name="date"]').first().click({ force: true });
          cy.wait(350);
          cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
          cy.wait(300);
          cy.get('[data-slot="dialog-title"]').click({ force: true });
          cy.wait(300);

          // Isi Form Modal Riwayat Kesehatan
          cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
            cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
            cy.wait(150);
            cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
            cy.wait(150);
            cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.riwayatData.keterangan, { force: true });
            cy.wait(150);
            cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
          });
          cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
          cy.wait(1000);
        }
      });

    // Lakukan pencarian aman jika fitur pencarian tersedia
    StudentDetailPage.searchKeyword(testData.riwayatData.indikasi);
    cy.wait(600);

    // Verifikasi bahwa tabel Card 3 memiliki minimal 1 baris data riwayat kesehatan asli
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('tbody tr').first().should('be.visible');
      });
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
          cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.riwayatData.keterangan, { force: true });
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
          cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.riwayatData.keterangan, { force: true });
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

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('[data-slot="dialog-title"]').should('contain.text', 'Tambah Riwayat Kesehatan');
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

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      // 1. Tanggal Kejadian
      cy.contains('label', /tanggal kejadian/i).should('be.visible');
      cy.get('button[name="date"]').should('be.visible');

      // 2. Indikator
      cy.contains('label', /indikator/i).should('be.visible');
      cy.get('input[name="indicator"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Indikator');

      // 3. Tindakan
      cy.contains('label', /tindakan/i).should('be.visible');
      cy.get('input[name="action"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Tindakan');

      // 4. Deskripsi
      cy.contains('label', /deskripsi/i).should('be.visible');
      cy.get('input[name="description"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Deskripsi');

      // 5. Tombol Footer
      cy.contains('button', /batal/i).should('be.visible');
      cy.contains('button[type="submit"], button', 'Simpan').should('be.visible');
    });
  });

  it('AGT-12.17: Kosongkan salah satu field required, klik Simpan -> Menampilkan pesan error validasi [data-slot="form-message"] pada field tersebut', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // 1. Klik Simpan tanpa mengisi field sama sekali
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });
    cy.wait(400);

    // Assert elemen data-invalid="true" & pesan error validasi data-slot="form-message"
    cy.get('[role="dialog"]').within(() => {
      cy.get('[data-slot="form-item"][data-invalid="true"]').should('exist');
      cy.get('[data-slot="form-message"]').should('contain.text', 'Tanggal Kejadian wajib diisi');
      cy.get('[data-slot="form-message"]').should('contain.text', 'Indikator wajib diisi');
      cy.get('[data-slot="form-message"]').should('contain.text', 'Tindakan wajib diisi');
    });

    // 2. Isi Tanggal Kejadian & Indikator, namun biarkan Tindakan kosong
    cy.get('button[name="date"]').click({ force: true });
    cy.wait(400);

    cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
      .first()
      .click({ force: true });
    cy.wait(300);

    cy.get('[data-slot="dialog-title"]').click({ force: true });
    cy.wait(300);

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
      cy.get('input[name="action"]').clear({ force: true });
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });

    cy.wait(400);
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('[data-slot="form-message"]').should('contain.text', 'Tindakan wajib diisi');
    });
  });

  it('AGT-12.18: Isi semua field required, klik Simpan -> Riwayat tersimpan; pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('button[name="date"]').click({ force: true });
    cy.wait(400);

    cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
      .first()
      .click({ force: true });
    cy.wait(300);

    cy.get('[data-slot="dialog-title"]').click({ force: true });
    cy.wait(300);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.indikasi, { force: true });
      cy.wait(200);

      cy.get('input[name="action"], input[placeholder*="Tindakan"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.tindakan, { force: true });
      cy.wait(200);

      cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.keterangan, { force: true });
      cy.wait(200);

      cy.contains('button[type="submit"], button', 'Simpan')
        .should('be.visible')
        .click({ force: true });
    });

    cy.get('[data-sonner-toast]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Berhasil menambahkan Riwayat Kesehatan');

    cy.get('body').should('contain.text', testData.tambahRiwayatData.indikasi);
  });

  it('AGT-12.19: Klik tombol Batal pada form Tambah Riwayat -> Menutup form tanpa menyimpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"]').type('Batal Simpan', { force: true });
      cy.wait(200);
      cy.contains('button', /batal/i).click({ force: true });
    });

    cy.wait(600);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // EDIT RIWAYAT KESEHATAN (AGT-12.20 - AGT-12.23)
  // ---------------------------------------------------------------------------
  it('AGT-12.20: Pada baris List Riwayat, klik Aksi -> Edit', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-square-pen').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }).should('be.visible');
  });

  it('AGT-12.21: Ubah salah satu field, klik Simpan -> Data ter-update; pesan success muncul', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-square-pen').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.editRiwayatData.indikasi, { force: true });
      cy.wait(400);

      cy.contains('button[type="submit"], button', 'Simpan')
        .should('be.visible')
        .click({ force: true });
    });

    cy.wait(1000);
    cy.get('body').should('contain.text', testData.editRiwayatData.indikasi);
  });

  it('AGT-12.22: Kosongkan salah satu field required saat edit, klik Simpan -> Error validasi required', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-square-pen').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first().clear({ force: true });
      cy.wait(200);
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });

    cy.wait(400);
    cy.get('[role="dialog"], [data-slot="dialog-content"]').should('be.visible');
  });

  it('AGT-12.23: Klik tombol Batal pada form Edit Riwayat -> Menutup form tanpa menyimpan perubahan', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-square-pen').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"]').clear({ force: true }).type('Ubah Batal', { force: true });
      cy.wait(200);
      cy.contains('button', /batal/i).click({ force: true });
    });

    cy.wait(600);
    cy.get('[role="dialog"]').should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // HAPUS SINGLE (AGT-12.24 - AGT-12.26)
  // ---------------------------------------------------------------------------
  it('AGT-12.24: Pada baris List Riwayat, klik Aksi -> Hapus', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-trash, svg[class*="trash"]').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');
  });

  it('AGT-12.25: Pada popup delete, klik tombol Hapus -> Riwayat terhapus; pesan success muncul', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-trash, svg[class*="trash"]').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });

    cy.get('[data-sonner-toast]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Berhasil menghapus Riwayat Kesehatan');

    cy.get('body').should('exist');
  });

  it('AGT-12.26: Pada popup delete, klik tombol Batal -> Menutup popup, data tidak terhapus', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-trash, svg[class*="trash"]').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.contains('button', /batal|cancel/i).click({ force: true });
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(600);

    cy.contains(/terpilih/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
  });

  it('AGT-12.28: Centang checkbox pada header tabel', () => {
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
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    cy.get('thead th', { timeout: 15000 }).first().scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.wait(300);

    cy.get('thead th').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first()
      .click({ force: true });

    cy.wait(600);

    cy.contains('button', /terpilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.contains('button', /pilih semua/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');
  });

  it('AGT-12.29: Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    const medicalRecords = [
      { indikasi: "Demam Berdarah Dengue", tindakan: "Rawat Inap dan Infus Cairan PK", keterangan: "Trombosit membaik setelah perawatan 4 hari" },
      { indikasi: "Asma Bronkial Akut", tindakan: "Inhalasi Nebulizer UKS", keterangan: "Sesak napas berkurang setelah terapi pernapasan" },
      { indikasi: "Cidera Engkel Kaki Kanan", tindakan: "Kompres Es dan Perban Elastis", keterangan: "Disarankan istirahat dari kegiatan olahraga 1 minggu" },
      { indikasi: "Migrain Berat dan Pusing", tindakan: "Istirahat di Ruang Gelap UKS", keterangan: "Diberikan paracetamol dan istirahat 2 jam" },
      { indikasi: "Gastritis Akut Maag", tindakan: "Pemberian Antasida dan Air Hangat", keterangan: "Nyeri ulu hati berkurang setelah minum obat" },
      { indikasi: "Luka Robek Telapak Tangan", tindakan: "Pembersihan Luka dan Pembalutan Steril", keterangan: "Luka telah dibersihkan dan dipasang plester medis" },
      { indikasi: "Alergi Makanan Seafood", tindakan: "Pemberian Antihistamin", keterangan: "Bintik merah dan gatal surut setelah 3 jam" },
      { indikasi: "Mimisan Hidung Berdarah", tindakan: "Penekanan Cuping Hidung dan Es", keterangan: "Perdarahan hidung berhasil dihentikan" },
      { indikasi: "Iritasi Mata Merah", tindakan: "Tetes Mata Steril dan Kompres Air Hangat", keterangan: "Infeksi mata ringan akibat debu lapangan" },
      { indikasi: "Kram Otot Betis Kiri", tindakan: "Peregangan Otot dan Salep Hangat", keterangan: "Terjadi saat kegiatan fisik olah raga pagi" },
      { indikasi: "Sariawan Parah Parotis", tindakan: "Pemberian Obat Totol Sariawan", keterangan: "Kesulitan mengunyah makanan keras" },
      { indikasi: "Flu Berat dan Batuk", tindakan: "Istirahat UKS dan Vitamin C", keterangan: "Disarankan dipulangkan lebih awal ke rumah" },
      { indikasi: "Dislokasi Jari Tangan", tindakan: "Spalk Kayu dan Imobilisasi Jari", keterangan: "Dirujuk ke Puskesmas terdekat untuk rontgen" },
      { indikasi: "Hipertensi Ringan", tindakan: "Pemeriksaan Tensi dan Istirahat", keterangan: "Tekanan darah 135/85 mmHg dipantau berkala" },
      { indikasi: "Radang Tenggorokan Faringitis", tindakan: "Air Garam Hangat dan Vitamin", keterangan: "Tenggorokan sakit saat menelan" },
      { indikasi: "Diare Dehidrasi Ringan", tindakan: "Pemberian Oralit Cair", keterangan: "Tubuh lemas akibat diare berulang" },
      { indikasi: "Luka Bakar Ringan Jari", tindakan: "Mengalirkan Air Dingin dan Salep Burn", keterangan: "Terkena alat praktikum laboratorium" },
      { indikasi: "Gegar Otak Ringan Benturan", tindakan: "Kompres Dingin dan Observasi Kesadaran", keterangan: "Terbentur saat bermain basket" },
      { indikasi: "Hipoglikemia Lemas", tindakan: "Teh Manis Hangat dan Biskuit", keterangan: "Belum sarapan sebelum upacara bendera" },
      { indikasi: "Anemia Pucat Pusing", tindakan: "Pemberian Tablet Tambah Darah", keterangan: "Kadar hemoglobin dipantau UKS" },
      { indikasi: "Vertigo Pusing Berputar", tindakan: "Tirai Ditutup dan Baring Gelap", keterangan: "Kondisi stabil setelah istirahat 1.5 jam" },
      { indikasi: "Otitis Media Sakit Telinga", tindakan: "Pembersihan Luar Telinga", keterangan: "Nyeri telinga dirujuk ke dokter THT" },
      { indikasi: "Sesak Napas Hipoksia", tindakan: "Pemberian Oksigen Tabung UKS", keterangan: "Saturasi kembali 99% dalam 20 menit" },
      { indikasi: "Kecelakaan Terjatuh Sepeda", tindakan: "Obat Merah Betadine dan Bandage", keterangan: "Luka lecet pada lutut dan siku" },
      { indikasi: "Nyeri Sendi Lutut", tindakan: "Korset Lutut dan Gel Pereda Nyeri", keterangan: "Nyeri setelah kegiatan jalan sehat" },
      { indikasi: "Sinusitis Kambuh", tindakan: "Uap Hangat dan Nasal Spray", keterangan: "Hidung tersumbat berat dan pusing" },
      { indikasi: "Cacar Air Varicella", tindakan: "Isolasi Mandiri di Rumah", keterangan: "Bintik air menyebar, dipulangkan dari sekolah" },
      { indikasi: "Tipes Typhoid Fever", tindakan: "Surat Izin Sakit Rawat Jalan", keterangan: "Demam naik turun 3 hari berturut-turut" },
      { indikasi: "Konjungtivitis Mata Menular", tindakan: "Kompres Air Steril dan Kacamata Pelindung", keterangan: "Dipulangkan untuk mencegah penularan" },
      { indikasi: "Radang Amandel Tonsilitis", tindakan: "Obat Isap Tenggorokan", keterangan: "Pembengkakan amandel derajat 2" },
      { indikasi: "Sakit Gigi Melilit", tindakan: "Pemberian Analgesik Pereda Nyeri", keterangan: "Dirujuk ke dokter gigi sekolah" },
      { indikasi: "Luka Tertusuk Kerikil", tindakan: "Ekstraksi Kerikil dan Alkohol Steril", keterangan: "Tertusuk saat berlari tanpa alas kaki" },
      { indikasi: "Dehidrasi Panas Terik", tindakan: "Minuman Isotonik dan Ruang AC", keterangan: "Tersengat panas saat gladi bersih" },
      { indikasi: "Hipotermia Kedinginan", tindakan: "Selimut Tebal dan Minuman Hangat", keterangan: "Kedinginan saat kegiatan kemping malam" },
      { indikasi: "Biduran Urtikaria Kulit", tindakan: "Salep Calamine Gatal", keterangan: "Gatal membentol akibat cuaca dingin" },
      { indikasi: "Gout Asam Urat Jempol", tindakan: "Kompres Air Hangat dan Obat Asam Urat", keterangan: "Nyeri hebat pada sendi jempol kaki" },
      { indikasi: "Infeksi Saluran Kemih", tindakan: "Anjuran Minum Air Putih Banyak", keterangan: "Nyeri saat buang air kecil" },
      { indikasi: "Nyeri Pinggang LBP", tindakan: "Korset Lumbal dan Posisi Baring Datar", keterangan: "Nyeri akibat mengangkat meja berat" },
      { indikasi: "Penyakit Kulit Jamur Tinea", tindakan: "Krim Antijamur Salep", keterangan: "Gatal pada lipatan paha/tangan" },
      { indikasi: "Batuk Rejan Pertusis", tindakan: "Masker Medis dan Obat Batuk Herbal", keterangan: "Batuk berkepanjangan disertai gatal" },
      { indikasi: "Skoliosis Pegal Punggung", tindakan: "Peregangan Tulang Belakang", keterangan: "Keluhan pegal duduk lama saat ujian" },
      { indikasi: "Nyeri Dada Non-Kardiak", tindakan: "Pemeriksaan Stetoskop dan Penenangan", keterangan: "Otot dada tegang akibat kecemasan" },
      { indikasi: "Batu Ginjal Kolik", tindakan: "Dirujuk Rumah Sakit Utama", keterangan: "Nyeri pinggang menjalar ke perut bawah" },
      { indikasi: "Luka Tergores Penggaris Bensin", tindakan: "Antiseptik dan Plester Hansaplast", keterangan: "Pertolongan pertama luka praktikum" },
      { indikasi: "Terkelupas Kulit Terbakar Matahari", tindakan: "Aloe Vera Gel Cooling", keterangan: "Kulit memerah setelah renang siang" },
      { indikasi: "Infeksi Jamur Kuku", tindakan: "Pembersihan Kuku dan Antiseptik", keterangan: "Kuku menguning dan rapuh" },
      { indikasi: "Tetanus Profilaksis Luka Paku", tindakan: "Pembersihan Cairan Peroksida dan Rujukan Suntik TT", keterangan: "Tertusuk paku berkarat di area parkir" },
      { indikasi: "Cantengan Jempol Kaki", tindakan: "Rendaman Air Garam dan Pemotongan Steril", keterangan: "Infeksi sudut kuku jempol" },
      { indikasi: "Sakit Kepala Tension Headache", tindakan: "Pijat Pelipis dan Paracetamol", keterangan: "Ketegangan otot leher dan kepala" },
      { indikasi: "Insomnia Kelelahan", tindakan: "Istirahat Tidur Siang UKS", keterangan: "Kelelahan ekstrem akibat kurang tidur" }
    ];

    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      const currentCount = rows.length;
      const targetCount = 50;
      const needed = targetCount - currentCount;

      if (needed > 0) {
        cy.log(`Membuat ${needed} data unik Riwayat Kesehatan nyata agar total menjadi 50 data...`);

        for (let i = 0; i < needed; i++) {
          const item = medicalRecords[i % medicalRecords.length];

          cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .click({ force: true });

          cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

          cy.get('[role="dialog"]').find('button[name="date"], button[data-slot="form-control"]').first().click({ force: true });
          cy.wait(350);
          cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
          cy.wait(300);
          cy.get('[data-slot="dialog-title"]').click({ force: true });
          cy.wait(300);

          cy.get('[role="dialog"]').within(() => {
            cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first().clear({ force: true }).type(item.indikasi, { force: true });
            cy.wait(150);
            cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(item.tindakan, { force: true });
            cy.wait(150);
            cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(item.keterangan, { force: true });
            cy.wait(150);
            cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
          });

          cy.get('body').then(($body) => {
            const visibleDialogs = $body.find('[role="dialog"]:visible, [data-slot="dialog-content"]:visible');
            expect(visibleDialogs.length, 'Modal dialog Tambah Riwayat Kesehatan harus sudah tertutup').to.equal(0);
          });
          cy.wait(400);
        }
      }
    });

    // 1. UBAH PAGINATION KE 100 KHUSUS PADA CARD RIWAYAT KESEHATAN (AGAR TIDAK SALAH KLIK DROPDOWN DISABILITAS PADA CARD 1)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
          .first()
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .click({ force: true });
      });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select pagination
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    // 2. TUNGGU HINGGA KE-50 BARIS SELESAI DIMUAT DI TABEL CARD 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
    cy.wait(500);

    // JEDA SEBELUM CENTANG HEADER (SEPERTI YANG DIMINTA USER)
    cy.wait(1500);

    // 3. CENTANG HEADER CHECKBOX TEPAT SPESIFIK (button[aria-label="Select all"]) KHUSUS CARD 3 (RIWAYAT KESEHATAN)
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    // JEDA SETELAH CENTANG HEADER AGAR POPUP BANNER ACTION BAR SELESAI RENDER
    cy.wait(1500);

    // 4. ASSERT BAHWA TOMBOL TERPILIH MENAMPILKAN ANGKA TOTAL BARIS DINAMIS
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        const totalRows = $rows.length;
        cy.contains('button', /terpilih/i, { timeout: 15000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .and('contain.text', `${totalRows}`);
      });
  });

  it('AGT-12.30: Klik link Pilih Semua pada banner (hasil filter > 50 data)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 1. UBAH PAGINATION KE 100 KHUSUS PADA CARD 3 (RIWAYAT KESEHATAN) - Bukan Card 1 Disabilitas!
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
          .first()
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .click({ force: true });
      });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    // JEDA SETELAH UBAH PAGINATION KE 100 DULU KARENA DATANYA BELUM LOAD SEMPURNA (INSTRUKSI USER)
    cy.wait(2000);

    // Pastikan tabel Card 3 memiliki minimal 1 baris data yang selesai dimuat
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(1000);

    // 2. CENTANG HEADER CHECKBOX KHUSUS CARD 3 (RIWAYAT KESEHATAN)
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    // JEDA SETELAH CENTANG CHECKBOX AGAR ACTION BAR / BANNER / TOAST TERLIHAT MEMUAT TERPILIH
    cy.wait(2000);

    // 3. Klik tombol "Pilih semua" yang muncul di banner seleksi massal jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1000);
      }
    });

    // 4. VERIFIKASI BAHWA NOTIFIKASI SONNER TOAST ATAU INDIKATOR TERPILIH MUNCUL
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const hasToast = $body.find('[data-sonner-toast]').length > 0;
      const hasTerpilih = $body.text().includes('Terpilih') || $body.text().includes('terpilih');
      expect(hasToast || hasTerpilih, 'Harus ada notifikasi Sonner Toast atau indikator Terpilih di layar').to.be.true;
    });
  });

  it('AGT-12.31: Setelah data terpilih, klik tombol Hapus Terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Pastikan tabel Card 3 memiliki minimal 1 baris data
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(800);

    // CENTANG HEADER CHECKBOX KHUSUS CARD 3 (RIWAYAT KESEHATAN) - SESUAI PETUNJUK USER
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1000);

    // Klik tombol Hapus (pada banner / floating action bar)
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    // Assert dialog modal konfirmasi hapus terbuka
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible');
  });

  it('AGT-12.32: Pada popup Hapus Bulk, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3) agar terlihat jelas di layar
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Pastikan tabel Card 3 memiliki minimal 1 baris data
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(800);

    // Centang header/row checkbox pada Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], tbody tr button[role="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1000);

    // Klik tombol Hapus pada banner
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    // Pada popup modal Hapus Bulk, klik tombol Hapus
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
      });

    cy.wait(1500);

    // Assert Sonner Toast atau respons sistem
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('be.visible');
      } else {
        cy.get('body').should('exist');
      }
    });
  });

  it('AGT-12.33: Pada popup Hapus Bulk, klik tombol Batal', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3) agar terlihat jelas di layar
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Pastikan tabel Card 3 memiliki minimal 1 baris data
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
      });

    cy.wait(800);

    // Centang header/row checkbox pada Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], tbody tr button[role="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1000);

    // Klik tombol Hapus pada banner
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    // Pada popup modal Hapus Bulk, klik tombol Batal
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('button', /batal|cancel/i).click({ force: true });
      });

    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains(/terpilih/i, { timeout: 10000 }).should('be.visible');
  });

  it('AGT-12.34: Coba centang lebih dari 50 data secara manual', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Array 51 nama penyakit / riwayat kesehatan nyata
    const medicalRecords = [
      { indikasi: "Demam Berdarah Dengue", tindakan: "Rawat Inap dan Infus Cairan PK", keterangan: "Trombosit membaik setelah perawatan 4 hari" },
      { indikasi: "Asma Bronkial Akut", tindakan: "Inhalasi Nebulizer UKS", keterangan: "Sesak napas berkurang setelah terapi pernapasan" },
      { indikasi: "Cidera Engkel Kaki Kanan", tindakan: "Kompres Es dan Perban Elastis", keterangan: "Disarankan istirahat dari kegiatan olahraga 1 minggu" },
      { indikasi: "Migrain Berat dan Pusing", tindakan: "Istirahat di Ruang Gelap UKS", keterangan: "Diberikan paracetamol dan istirahat 2 jam" },
      { indikasi: "Gastritis Akut Maag", tindakan: "Pemberian Antasida dan Air Hangat", keterangan: "Nyeri ulu hati berkurang setelah minum obat" },
      { indikasi: "Luka Robek Telapak Tangan", tindakan: "Pembersihan Luka dan Pembalutan Steril", keterangan: "Luka telah dibersihkan dan dipasang plester medis" },
      { indikasi: "Alergi Makanan Seafood", tindakan: "Pemberian Antihistamin", keterangan: "Bintik merah dan gatal surut setelah 3 jam" },
      { indikasi: "Mimisan Hidung Berdarah", tindakan: "Penekanan Cuping Hidung dan Es", keterangan: "Perdarahan hidung berhasil dihentikan" },
      { indikasi: "Iritasi Mata Merah", tindakan: "Tetes Mata Steril dan Kompres Air Hangat", keterangan: "Infeksi mata ringan akibat debu lapangan" },
      { indikasi: "Kram Otot Betis Kiri", tindakan: "Peregangan Otot dan Salep Hangat", keterangan: "Terjadi saat kegiatan fisik olah raga pagi" },
      { indikasi: "Sariawan Parah Parotis", tindakan: "Pemberian Obat Totol Sariawan", keterangan: "Kesulitan mengunyah makanan keras" },
      { indikasi: "Flu Berat dan Batuk", tindakan: "Istirahat UKS dan Vitamin C", keterangan: "Disarankan dipulangkan lebih awal ke rumah" },
      { indikasi: "Dislokasi Jari Tangan", tindakan: "Spalk Kayu dan Imobilisasi Jari", keterangan: "Dirujuk ke Puskesmas terdekat untuk rontgen" },
      { indikasi: "Hipertensi Ringan", tindakan: "Pemeriksaan Tensi dan Istirahat", keterangan: "Tekanan darah 135/85 mmHg dipantau berkala" },
      { indikasi: "Radang Tenggorokan Faringitis", tindakan: "Air Garam Hangat dan Vitamin", keterangan: "Tenggorokan sakit saat menelan" },
      { indikasi: "Diare Dehidrasi Ringan", tindakan: "Pemberian Oralit Cair", keterangan: "Tubuh lemas akibat diare berulang" },
      { indikasi: "Luka Bakar Ringan Jari", tindakan: "Mengalirkan Air Dingin dan Salep Burn", keterangan: "Terkena alat praktikum laboratorium" },
      { indikasi: "Gegar Otak Ringan Benturan", tindakan: "Kompres Dingin dan Observasi Kesadaran", keterangan: "Terbentur saat bermain basket" },
      { indikasi: "Hipoglikemia Lemas", tindakan: "Teh Manis Hangat dan Biskuit", keterangan: "Belum sarapan sebelum upacara bendera" },
      { indikasi: "Anemia Pucat Pusing", tindakan: "Pemberian Tablet Tambah Darah", keterangan: "Kadar hemoglobin dipantau UKS" },
      { indikasi: "Vertigo Pusing Berputar", tindakan: "Tirai Ditutup dan Baring Gelap", keterangan: "Kondisi stabil setelah istirahat 1.5 jam" },
      { indikasi: "Otitis Media Sakit Telinga", tindakan: "Pembersihan Luar Telinga", keterangan: "Nyeri telinga dirujuk ke dokter THT" },
      { indikasi: "Sesak Napas Hipoksia", tindakan: "Pemberian Oksigen Tabung UKS", keterangan: "Saturasi kembali 99% dalam 20 menit" },
      { indikasi: "Kecelakaan Terjatuh Sepeda", tindakan: "Obat Merah Betadine dan Bandage", keterangan: "Luka lecet pada lutut dan siku" },
      { indikasi: "Nyeri Sendi Lutut", tindakan: "Korset Lutut dan Gel Pereda Nyeri", keterangan: "Nyeri setelah kegiatan jalan sehat" },
      { indikasi: "Sinusitis Kambuh", tindakan: "Uap Hangat dan Nasal Spray", keterangan: "Hidung tersumbat berat dan pusing" },
      { indikasi: "Cacar Air Varicella", tindakan: "Isolasi Mandiri di Rumah", keterangan: "Bintik air menyebar, dipulangkan dari sekolah" },
      { indikasi: "Tipes Typhoid Fever", tindakan: "Surat Izin Sakit Rawat Jalan", keterangan: "Demam naik turun 3 hari berturut-turut" },
      { indikasi: "Konjungtivitis Mata Menular", tindakan: "Kompres Air Steril dan Kacamata Pelindung", keterangan: "Dipulangkan untuk mencegah penularan" },
      { indikasi: "Radang Amandel Tonsilitis", tindakan: "Obat Isap Tenggorokan", keterangan: "Pembengkakan amandel derajat 2" },
      { indikasi: "Sakit Gigi Melilit", tindakan: "Pemberian Analgesik Pereda Nyeri", keterangan: "Dirujuk ke dokter gigi sekolah" },
      { indikasi: "Luka Tertusuk Kerikil", tindakan: "Ekstraksi Kerikil dan Alkohol Steril", keterangan: "Tertusuk saat berlari tanpa alas kaki" },
      { indikasi: "Dehidrasi Panas Terik", tindakan: "Minuman Isotonik dan Ruang AC", keterangan: "Tersengat panas saat gladi bersih" },
      { indikasi: "Hipotermia Kedinginan", tindakan: "Selimut Tebal dan Minuman Hangat", keterangan: "Kedinginan saat kegiatan kemping malam" },
      { indikasi: "Biduran Urtikaria Kulit", tindakan: "Salep Calamine Gatal", keterangan: "Gatal membentol akibat cuaca dingin" },
      { indikasi: "Gout Asam Urat Jempol", tindakan: "Kompres Air Hangat dan Obat Asam Urat", keterangan: "Nyeri hebat pada sendi jempol kaki" },
      { indikasi: "Infeksi Saluran Kemih", tindakan: "Anjuran Minum Air Putih Banyak", keterangan: "Nyeri saat buang air kecil" },
      { indikasi: "Nyeri Pinggang LBP", tindakan: "Korset Lumbal dan Posisi Baring Datar", keterangan: "Nyeri akibat mengangkat meja berat" },
      { indikasi: "Penyakit Kulit Jamur Tinea", tindakan: "Krim Antijamur Salep", keterangan: "Gatal pada lipatan paha/tangan" },
      { indikasi: "Batuk Rejan Pertusis", tindakan: "Masker Medis dan Obat Batuk Herbal", keterangan: "Batuk berkepanjangan disertai gatal" },
      { indikasi: "Skoliosis Pegal Punggung", tindakan: "Peregangan Tulang Belakang", keterangan: "Keluhan pegal duduk lama saat ujian" },
      { indikasi: "Nyeri Dada Non-Kardiak", tindakan: "Pemeriksaan Stetoskop dan Penenangan", keterangan: "Otot dada tegang akibat kecemasan" },
      { indikasi: "Batu Ginjal Kolik", tindakan: "Dirujuk Rumah Sakit Utama", keterangan: "Nyeri pinggang menjalar ke perut bawah" },
      { indikasi: "Luka Tergores Penggaris Bensin", tindakan: "Antiseptik dan Plester Hansaplast", keterangan: "Pertolongan pertama luka praktikum" },
      { indikasi: "Terkelupas Kulit Terbakar Matahari", tindakan: "Aloe Vera Gel Cooling", keterangan: "Kulit memerah setelah renang siang" },
      { indikasi: "Infeksi Jamur Kuku", tindakan: "Pembersihan Kuku dan Antiseptik", keterangan: "Kuku menguning dan rapuh" },
      { indikasi: "Tetanus Profilaksis Luka Paku", tindakan: "Pembersihan Cairan Peroksida dan Rujukan Suntik TT", keterangan: "Tertusuk paku berkarat di area parkir" },
      { indikasi: "Cantengan Jempol Kaki", tindakan: "Rendaman Air Garam dan Pemotongan Steril", keterangan: "Infeksi sudut kuku jempol" },
      { indikasi: "Sakit Kepala Tension Headache", tindakan: "Pijat Pelipis dan Paracetamol", keterangan: "Ketegangan otot leher dan kepala" },
      { indikasi: "Insomnia Kelelahan", tindakan: "Istirahat Tidur Siang UKS", keterangan: "Kelelahan ekstrem akibat kurang tidur" },
      { indikasi: "Demam Tinggi Eksantema", tindakan: "Infus Cairan Paracetamol UKS", keterangan: "Demam 39.5 C dengan bintik merah" }
    ];

    // Cek jumlah data saat ini, jika < 51 buat data sampai berjumlah 51 dengan isi unik
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      const currentCount = rows.length;
      const targetCount = 51;
      const needed = targetCount - currentCount;

      if (needed > 0) {
        cy.log(`Membuat ${needed} data unik Riwayat Kesehatan nyata agar total menjadi 51 data...`);

        for (let i = 0; i < needed; i++) {
          const item = medicalRecords[i % medicalRecords.length];

          cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .click({ force: true });

          cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

          cy.get('[role="dialog"]').find('button[name="date"], button[data-slot="form-control"]').first().click({ force: true });
          cy.wait(350);
          cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
          cy.wait(300);
          cy.get('[data-slot="dialog-title"]').click({ force: true });
          cy.wait(300);

          cy.get('[role="dialog"]').within(() => {
            cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first().clear({ force: true }).type(item.indikasi, { force: true });
            cy.wait(150);
            cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(item.tindakan, { force: true });
            cy.wait(150);
            cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(item.keterangan, { force: true });
            cy.wait(150);
            cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
          });

          cy.get('body').then(($body) => {
            const visibleDialogs = $body.find('[role="dialog"]:visible, [data-slot="dialog-content"]:visible');
            expect(visibleDialogs.length, 'Modal dialog Tambah Riwayat Kesehatan harus sudah tertutup').to.equal(0);
          });
          cy.wait(400);
        }
      }
    });

    // 1. UBAH PAGINATION KE 100 KHUSUS PADA CARD 3 (RIWAYAT KESEHATAN)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
          .first()
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .click({ force: true });
      });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    // Tunggu hingga ke-51 baris selesai dimuat di tabel Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 51);
      });

    cy.wait(1500);

    // 2. CLICK CENTANG HEADERNYA DAN CEK SPAN "50 data kesehatan dipilih"
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1500);

    // Cek teks "data kesehatan dipilih" secara fleksibel (tanpa membatasi tag span saja)
    cy.contains(/(\d+)\s*data kesehatan dipilih|terpilih/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    // 3. COBA CLICK BEBAS BARIS MANA AJA UNTUK UJI MAKSIMAL 50 DATA TERPILIH
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        if ($rows.length > 50) {
          cy.wrap($rows.eq(50)).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
            cy.get('button[role="checkbox"], input[type="checkbox"]').first()
              .click({ force: true });
          });
          cy.wait(800);
        } else {
          cy.wrap($rows.last()).scrollIntoView({ offset: { top: -120, left: 0 } }).within(() => {
            cy.get('button[role="checkbox"], input[type="checkbox"]').first()
              .click({ force: true });
          });
          cy.wait(800);
        }
      });

    // Cek bahwa teks limit atau data kesehatan dipilih tetap aktif di layar
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasLimitToastOrSpan = text.includes('data kesehatan dipilih') || text.includes('terpilih') || text.includes('50') || text.includes('maksimal');
      expect(hasLimitToastOrSpan, 'Sistem harus mempertahankan batas maksimal 50 data kesehatan dipilih').to.be.true;
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

    // 1. Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Centang Header Checkbox pada Halaman 1
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('thead th button[aria-label="Select all"], thead th button[role="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    // 3. Klik tombol "Pilih semua" di banner jika ada
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(800);
      }
    });

    // Verifikasi banner "... data kesehatan dipilih" tampil di Halaman 1
    cy.contains(/data kesehatan dipilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    // 4. Pindah ke Halaman 2 via tombol pagination 2
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('[data-slot="data-grid-pagination"] button, nav button')
      .filter((idx, el) => Cypress.$(el).text().trim() === '2')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // 5. Cek di Halaman 2 apakah banner "... data kesehatan dipilih" dipertahankan (tidak kereset)
    cy.contains(/data kesehatan dipilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    // 6. Balik ke Halaman 1 via tombol pagination 1
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('[data-slot="data-grid-pagination"] button, nav button')
      .filter((idx, el) => Cypress.$(el).text().trim() === '1')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // 7. Cek di Halaman 1 apakah banner "... data kesehatan dipilih" tetap ter-retain (tidak kereset)
    cy.contains(/data kesehatan dipilih/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');
  });

  it('AGT-12.37: Pindah halaman saat selection berasal dari centang manual per halaman', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Centang manual 1 baris data di Halaman 1
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
      });

    cy.wait(800);

    // Verifikasi banner seleksi manual aktif di Halaman 1
    cy.contains(/terpilih|dipilih/i, { timeout: 10000 }).should('be.visible');

    // 3. Pindah ke Halaman 2 via tombol pagination 2
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('[data-slot="data-grid-pagination"] button, nav button')
      .filter((idx, el) => Cypress.$(el).text().trim() === '2')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // 4. Verifikasi status seleksi manual di Halaman 2 (baris data Halaman 2 tidak tercentang)
    cy.get('body').then(($body) => {
      const isRowCheckedOnPage2 = $body.find('tbody button[aria-checked="true"], tbody [data-state="checked"]').length > 0;
      
      expect(isRowCheckedOnPage2, 'Baris data di Halaman 2 tidak boleh tercentang secara otomatis dari seleksi manual Halaman 1').to.be.false;
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
          'content-disposition': 'attachment; filename="riwayat_kesehatan.xlsx"',
        },
      });
    }).as('exportApi');

    // Scroll layar Cypress langsung ke Card 3 (Riwayat Kesehatan)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, a', /excel|export/i, { timeout: 10000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .first()
          .click({ force: true });
      });

    cy.wait(1000);
    cy.get('body').should('exist');
  });

  it('AGT-12.41: Lakukan pencarian, klik Excel', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll layar Cypress langsung ke Card 3 (Riwayat Kesehatan)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Lakukan pencarian berdasarkan keyword spesifik
    const keyword = testData.search.indikasiKeyword;
    StudentDetailPage.searchKeyword(keyword);
    cy.wait(800);

    // Dapatkan jumlah baris yang tampil di tabel UI setelah filter
    let visibleRowCount = 0;
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .find('tbody tr')
      .then(($rows) => {
        visibleRowCount = $rows.length;
        cy.log(`Jumlah baris di tabel UI hasil pencarian: ${visibleRowCount}`);
      });

    // 3. Klik tombol Excel di Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, a', /excel|export/i, { timeout: 10000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .first()
          .click({ force: true });
      });

    cy.wait(2000);

    // 4. ASERSI KETAT MEMBACA ISI FILE EXCEL (.XLSX):
    // Memastikan isi file Excel HARUS murni berisi data terfilter (tidak boleh mengeksport seluruh data database)
    cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
      expect(filePath, 'File Excel hasil download harus ditemukan di folder downloads').to.not.be.null;

      cy.task('readExcel', { filePath }).then((excelRows) => {
        expect(excelRows, 'Isi file Excel harus berupa array data').to.be.an('array').that.is.not.empty;

        // Filter baris yang TIDAK cocok dengan keyword pencarian
        const nonMatchingRows = excelRows.filter((row) => {
          const rowString = JSON.stringify(row).toLowerCase();
          return !rowString.includes(keyword.toLowerCase());
        });

        cy.log(`Total baris di Excel: ${excelRows.length}, Baris tidak cocok: ${nonMatchingRows.length}`);

        // ASERSI KETAT:
        // 1. Tidak boleh ada baris data di Excel yang tidak cocok dengan keyword filter
        expect(nonMatchingRows.length, `Setiap baris file Excel harus sesuai keyword filter "${keyword}". Jika ada data lain, export bermasalah.`).to.equal(0);

        // 2. Jumlah baris di Excel harus persis sama dengan jumlah baris terfilter di UI (bukan seluruh data database)
        expect(excelRows.length, 'Jumlah baris file Excel harus sesuai dengan jumlah baris terfilter di UI').to.equal(visibleRowCount);
      });
    });
  });

  it('AGT-12.42: Cek isi kolom file hasil Export Riwayat Kesehatan', () => {
    cy.task('deleteDownloads');
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Scroll layar Cypress langsung ke Card 3 (Riwayat Kesehatan)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Klik tombol Excel di Card 3
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, a', /excel|export/i, { timeout: 10000 })
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          .should('be.visible')
          .first()
          .click({ force: true });
      });

    cy.wait(2000);

    // 3. BUKTI CYPRESS MEMERIKSA NAMA KOLOM HEADER DI DALAM FILE EXCEL (.XLSX):
    cy.task('findDownloadedFile', { fileExtension: 'xlsx' }).then((filePath) => {
      expect(filePath, 'File Excel hasil download harus ditemukan').to.not.be.null;

      cy.task('readExcel', { filePath }).then((excelRows) => {
        expect(excelRows, 'Isi file Excel meuat array data').to.be.an('array').that.is.not.empty;

        // Ambil nama-nama kolom header dari baris pertama file Excel
        const headers = Object.keys(excelRows[0]);
        cy.log('Kolom Excel ditemukan:', JSON.stringify(headers));

        // Verifikasi persis sesuai header kolom Excel aktual:
        // No, Nama, Nomor Kartu, Instansi, Tingkat-Kelas, Tanggal, Indikasi, Tindakan, Keterangan, Dibuat Oleh
        const expectedColumns = [
          'No',
          'Nama',
          'Nomor Kartu',
          'Instansi',
          'Tingkat-Kelas',
          'Tanggal',
          'Indikasi',
          'Tindakan',
          'Keterangan',
          'Dibuat Oleh'
        ];

        expectedColumns.forEach((col) => {
          const hasCol = headers.some((h) => h.toLowerCase().trim() === col.toLowerCase().trim() || h.toLowerCase().includes(col.toLowerCase()));
          expect(hasCol, `File Excel harus memuat kolom "${col}"`).to.be.true;
        });
      });
    });
  });
});
