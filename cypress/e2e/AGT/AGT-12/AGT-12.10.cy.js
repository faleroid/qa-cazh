import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.10 - Buka tab Kesehatan saat belum ada riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.10: Buka tab Kesehatan saat belum ada riwayat -> List Riwayat Kesehatan kosong (empty state)', () => {
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
          // Jika mengandung indikator empty-state, abaikan
          if (/(tidak ada|tidak ditemukan|belum|kosong)/.test(txt)) return false;
          const tds = row.querySelectorAll('td');
          if (!tds || tds.length === 0) return false;
          // Gabungkan teks sel untuk memastikan bukan hanya dash/placeholder
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
});
