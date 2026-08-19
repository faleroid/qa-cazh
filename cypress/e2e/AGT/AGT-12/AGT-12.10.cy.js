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

          // LANGKAH TAMBAHAN: Set pagination/per-page ke 100 jika kontrol tersedia, agar bulk delete menghapus semua baris di satu halaman
          cy.get('body').then(($body) => {
            // Cari <select> yang mempunyai option '100'
            const selects = $body.find('select').filter((i, el) => {
              return Array.from(el.options || []).some(o => /100/.test(o.innerText));
            });

            if (selects.length > 0) {
              cy.wrap(selects.first()).then(($sel) => {
                // Pilih opsi yang mengandung '100' (nilai atau teks)
                const option = Array.from($sel[0].options).find(o => /100/.test(o.innerText));
                if (option) {
                  cy.wrap($sel).select(option.value || option.text);
                  cy.log('[AGT-12.10] Mengatur pagination per-page ke 100 via <select>');
                }
              });
              cy.wait(800);
            } else {
              // Jika tidak ada select, coba cari tombol/dropdown yang mengatur per-page (text like 'per halaman' or 'per page')
              const perBtn = $body.find('button').filter((i, el) => /per halaman|per page|rows per page|baris/i.test((el.innerText || '').toLowerCase()));
              if (perBtn.length > 0) {
                cy.wrap(perBtn.first()).scrollIntoView({ offset: { top: -120, left: 0 } });
                cy.wait(150);
                cy.wrap(perBtn.first()).click({ force: true });
                cy.wait(200);
                // Cari opsi yang menampilkan '100'
                const opt = $body.find('button').filter((i, el) => /(^|\s)100(\s|$)/.test((el.innerText || '').toLowerCase()));
                if (opt.length > 0) {
                  cy.wrap(opt.first()).click({ force: true });
                  cy.log('[AGT-12.10] Mengatur pagination per-page ke 100 via dropdown/button');
                  cy.wait(800);
                }
              }
            }
          }).then(() => {
            // A. Centang Checkbox Header di Card 3 (menggunakan selector persis AGT-12.32)
            cy.get('[data-slot="card"]')
              .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
              .parents('[data-slot="card"]')
              .first()
              .as('kesehatanCard');

            // Scroll ke header checkbox lalu click dengan re-query untuk menghindari detached element
            cy.get('@kesehatanCard').find('thead th button[role="checkbox"], button[aria-label="Select all"], thead th [data-slot="checkbox"]').first().scrollIntoView({ offset: { top: -120, left: 0 } });
            cy.wait(200);
            cy.get('@kesehatanCard').find('thead th button[role="checkbox"], button[aria-label="Select all"], thead th [data-slot="checkbox"]').first().click({ force: true });

            cy.wait(1000);

            // B. Coba klik tombol bulk 'Hapus yang dipilih' atau tombol 'Hapus' pada banner / floating action bar jika ada
            cy.get('body').then(($body) => {
              // Cari tombol khusus 'Hapus yang dipilih' terlebih dahulu
              const bulkBtn = $body.find('button').filter((i, el) => /hapus yang dipilih/i.test((el.innerText || '').toLowerCase()));
              if (bulkBtn.length) {
                cy.contains('button', /hapus yang dipilih/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } });
                cy.wait(200);
                cy.contains('button', /hapus yang dipilih/i, { timeout: 10000 }).should('be.visible').click({ force: true });
              } else {
                // fallback: cari tombol 'Hapus' generik
                const btn = $body.find('button').filter((i, el) => /hapus/i.test((el.innerText || '').toLowerCase()));
                if (btn.length) {
                  // Use cy.contains to re-query and avoid detached elements
                  cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } });
                  cy.wait(200);
                  cy.contains('button', /hapus/i, { timeout: 10000 }).should('be.visible').click({ force: true });
                } else {
                  cy.log('[AGT-12.10] Tombol bulk Hapus tidak ditemukan — melewati langkah bulk delete.');
                }
              }

              cy.wait(600);

              // C. Jika muncul modal konfirmasi Hapus Bulk, klik tombol konfirmasi
              cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
                .should('be.visible')
                .within(() => {
                  cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
                });

              cy.wait(2000);
            });
          });

          // D. Periksa kembali apakah masih ada baris data riil; jika ada, lakukan fallback per-baris
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
                  const snippet = ($row.text() || '').trim().replace(/\s+/g, ' ').split(' ').slice(0, 12).join(' ');

                  // Re-query live DOM row within kesehatanCard to avoid detached-subject issues
                  cy.get('@kesehatanCard').contains('tbody tr', snippet, { timeout: 10000 }).then(($realRow) => {
                    const delBtn = $realRow.find('button svg.lucide-trash').closest('button');
                    const altBtn = $realRow.find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]');

                    if (delBtn && delBtn.length) {
                      cy.wrap($realRow).find('button svg.lucide-trash').closest('button').scrollIntoView({ offset: { top: -120, left: 0 } });
                      cy.wait(200);
                      cy.wrap($realRow).find('button svg.lucide-trash').closest('button').click({ force: true });
                    } else if (altBtn && altBtn.length) {
                      cy.wrap($realRow).find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]')
                        .first()
                        .scrollIntoView({ offset: { top: -120, left: 0 } });
                      cy.wait(200);
                      cy.wrap($realRow).find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]').first().click({ force: true });
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
    // Implementasi retry: jika masih ada data, ulangi per-row delete hingga kosong atau sampai maxAttempts habis.
    const maxAttempts = 3;

    function checkAndClean(attemptsLeft) {
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

          if (dataRows.length === 0) {
            cy.log('[AGT-12.10] Verifikasi: tabel sudah kosong (empty state)');
            return;
          }

          if (attemptsLeft <= 0) {
            // Gagal setelah percobaan berulang - laporkan jumlah baris yang tersisa
            expect(dataRows.length, `Tabel Riwayat Kesehatan harus dalam keadaan kosong (empty state) — tersisa setelah percobaan`).to.equal(0);
            return;
          }

          cy.log(`[AGT-12.10] Masih terdapat ${dataRows.length} baris. Mencoba bulk delete + hapus per-baris sebagai fallback. (Percobaan tersisa: ${attemptsLeft})`);

          // LANGKAH 1: Coba bulk delete lagi (centang header -> klik hapus banner -> konfirmasi)
          cy.get('[data-slot="card"]')
            .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
            .parents('[data-slot="card"]')
            .first()
            .as('kesehatanCardRetry');

          // Centang header checkbox
          cy.get('@kesehatanCardRetry').find('thead th button[role="checkbox"], button[aria-label="Select all"], thead th [data-slot="checkbox"]').first().scrollIntoView({ offset: { top: -120, left: 0 } });
          cy.wait(200);
          cy.get('@kesehatanCardRetry').find('thead th button[role="checkbox"], button[aria-label="Select all"], thead th [data-slot="checkbox"]').first().click({ force: true });

          cy.wait(800);

          // Klik tombol "Pilih semua" di banner jika ada
          cy.get('body').then(($body) => {
            const btnPilihSemua = $body.find('button:contains("Pilih semua")');
            if (btnPilihSemua.length > 0) {
              cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } });
              cy.wait(150);
              cy.wrap(btnPilihSemua.first()).click({ force: true });
              cy.wait(800);
            }

            const btn = $body.find('button').filter((i, el) => /hapus/i.test((el.innerText || '').toLowerCase()));
            if (btn.length) {
              cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } });
              cy.wait(200);
              cy.contains('button', /hapus/i, { timeout: 10000 }).should('be.visible').click({ force: true });

              cy.wait(600);

              // C. Jika muncul modal konfirmasi Hapus Bulk, klik tombol konfirmasi
              cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
                .should('be.visible')
                .within(() => {
                  cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
                });

              cy.wait(1000);
            } else {
              cy.log('[AGT-12.10] Tombol bulk Hapus tidak ditemukan pada retry — melewati langkah bulk delete.');
            }
          }).then(() => {
            // Setelah mencoba bulk delete, lakukan hapus per-baris (fallback)
            cy.wrap(dataRows).each((row) => {
              const $row = Cypress.$(row);
              const snippet = ($row.text() || '').trim().replace(/\s+/g, ' ').split(' ').slice(0, 12).join(' ');

              // Re-query the row within the live DOM using a text snippet to avoid detached-element issues
              cy.get('@kesehatanCardRetry').contains('tbody tr', snippet, { timeout: 10000 }).then(($realRow) => {
                // Prefer exact delete icon button inside the found row
                const delBtn = $realRow.find('button svg.lucide-trash').closest('button');
                const altBtn = $realRow.find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]');

                if (delBtn && delBtn.length) {
                  cy.wrap($realRow).find('button svg.lucide-trash').closest('button').scrollIntoView({ offset: { top: -120, left: 0 } });
                  cy.wait(150);
                  cy.wrap($realRow).find('button svg.lucide-trash').closest('button').click({ force: true });
                } else if (altBtn && altBtn.length) {
                  cy.wrap($realRow).find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]').first().scrollIntoView({ offset: { top: -120, left: 0 } });
                  cy.wait(150);
                  cy.wrap($realRow).find('button[class*="text-destructive"], button[aria-label*="hapus"], button[title*="Hapus"]')
                    .first()
                    .click({ force: true });
                } else {
                  cy.log('Tidak menemukan tombol hapus di baris saat retry — abaikan.');
                }

                cy.wait(400);

                // Konfirmasi jika dialog muncul
                cy.get('body').then(($body) => {
                  const dialogs = $body.find('[role="dialog"], [data-slot="dialog-content"]');
                  if (dialogs.length > 0) {
                    cy.get('[role="dialog"], [data-slot="dialog-content"]').within(() => {
                      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
                    });
                    cy.wait(400);
                  }
                });
              });
            }).then(() => {
              // Setelah satu putaran hapus per-baris, tunggu lalu re-check (rekursif)
              cy.wait(1500);
              checkAndClean(attemptsLeft - 1);
            });
          });
        });
    }

    // Mulai proses verifikasi + pembersihan
    checkAndClean(maxAttempts);
  });
});
