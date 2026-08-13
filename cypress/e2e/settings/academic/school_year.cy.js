describe('The School Year Page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop')) {
                return false;
            }
        });

        cy.login();
        cy.visit('setting/academic/school-year');
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it('PGT-1.1 - Klik tombol \'+ Tambah\' di halaman list Tahun Ajaran', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('form').should("be.visible");
        cy.get('input[data-slot="form-control"]').should('have.length', 2);

        cy.contains('label', /School Year|Tahun Ajaran/i);
        cy.contains('label', /Start Date|Tanggal Mulai/i);
        cy.contains('label', /End Date|Tanggal Akhir/i);

        cy.get('button[data-slot="form-control"]').should('have.length', 2);
    });

    it('PGT-1.2 - Verifikasi field yang ada di form Tambah', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[value="2027"]').should('have.attr', 'readonly');
        cy.contains('button', /Start Date|Tanggal Mulai/i).should('be.visible');
        cy.contains('button', /End Date|Tanggal Akhir/i).should('be.disabled');
        cy.contains('button', /Cancel|Batal/i).should("be.visible");
        cy.contains('button', /Save|Simpan/i).should("be.visible");
    });

    it('PGT-1.3 - Verifikasi form TIDAK punya field Instansi & Status', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.contains('label', /Instansi|Institution/i).should('not.exist');
        cy.contains('label', /Status/i).should('not.exist');
    });

    // PGT-1.4 - Input tahun awal '2025' -> cek tahun akhir
    // Expected: Tahun akhir auto-terisi '2026' (+1 dari tahun awal), readonly tidak bisa di-edit manual
    it('PGT-1.4 - Input tahun awal \'2025\' -> cek tahun akhir', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2026');
        cy.get('input[data-slot="form-control"]').last().should('have.value', '2027');
    });

    // PGT-1.5 - Ubah tahun awal dari 2025 ke 2030 -> cek tahun akhir
    // Expected: Tahun akhir auto-update jadi '2031' mengikuti tahun awal baru
    it('PGT-1.5 - Ubah tahun awal dari 2025 ke 2030 -> cek tahun akhir', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2030');
        cy.get('input[data-slot="form-control"]').last().should('have.value', '2031');
    });

    it('PGT-1.6 - Input tanggal mulai \'01/07/2025\' -> cek tanggal selesai', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('button[aria-label*="July 17"]')
            .should('not.contain.text', 'Tanggal Mulai')
            .and('not.contain.text', 'DD/MM/YYYY');

        cy.contains('label', /End Date|Tanggal Akhir/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .should('include.text', '16/07/2027');
    });

    it('PGT-1.7 - Isi form dengan data valid -> klik Simpan', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2046');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2046').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains(/berhasil ditambahkan/i, { timeout: 10000 }).should('be.visible');

        cy.get('form').should('not.exist');

        cy.contains('2046').should('be.visible');

        cy.contains('tr', /17 Juli 2046|July 17th, 2046/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Juli 2046|July 17th, 2046/i).should('not.exist')

        cy.contains('tr', /17 Januari 2047|July 17th, 2047/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Januari 2047|July 17th, 2047/i).should('not.exist')
    });

    it('PGT-1.8 - Setelah save, cek struktur data di list', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2046');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2046').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains(/berhasil ditambahkan/i, { timeout: 10000 }).should('be.visible');

        cy.get('form').should('not.exist');

        cy.contains('2046').should('be.visible');

        cy.contains('tr', /17 Juli 2046|July 17th, 2046/i).should('be.visible');
        cy.contains('tr', /17 Januari 2047|January 17th, 2047/i).should('be.visible');

        cy.contains('tr', /17 Juli 2046|July 17th, 2046/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Juli 2046|July 17th, 2046/i).should('not.exist')

        cy.contains('tr', /17 Januari 2047|July 17th, 2047/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Januari 2047|July 17th, 2047/i).should('not.exist')
    });

    it('PGT-1.9 - Tambah TA dengan tanggal yang cover hari ini', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2026');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2026').click();

        cy.contains('button[role="combobox"]', /Juli|July/i).click();
        cy.get('[role="option"]').contains(/Januari|January/i).click();
        cy.get('button[aria-label*="January 1st"]').click();

        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
    });

    it('PGT-1.10 - Tambah TA dengan tanggal future (belum ke-jangkau today)', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2050');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2050').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.get('form').should('not.exist');

        cy.contains('tr', /17 Juli 2050|July 17th, 2050/i).should('be.visible');
        cy.contains('tr', /17 Januari 2051|January  17th, 2051/i).should('be.visible');
        cy.contains('tr', /inactive|tidak aktif/i).should('be.visible');

        cy.contains('tr', /17 Juli 2050|July 17th, 2050/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Juli 2050|July 17th, 2050/i).should('not.exist')

        cy.contains('tr', /17 Januari 2051|January 17th, 2051/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /17 Januari 2051|January 17th, 2051/i).should('not.exist')
    });

    it('PGT-1.11 - Kosongkan Tahun Awal -> klik Simpan', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('{backspace}'.repeat(4));

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.contains(/Tahun Ajaran wajib diisi|School year is required/i).should('be.visible');
        cy.contains(/Tanggal mulai wajib diisi|Start date is required/i).should('be.visible');
    });

    it('PGT-1.12 - Isi Tahun Awal tapi tanpa pilih Tanggal Mulai -> klik Simpan', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2006');
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.contains(/Tanggal mulai wajib diisi|Start date is required/i).should('be.visible');
    });

    it('PGT-1.13 - Tambah TA dengan tanggal yang overlap TA existing', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();

        cy.get('input[data-slot="form-control"]').first().type('2026');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2026').click();

        cy.contains('button[role="combobox"]', /Juli|July/i).click();
        cy.get('[role="option"]').contains(/Januari|January/i).click();
        cy.get('button[aria-label*="January 1st"]').click();

        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains(/Tahun ajaran dengan tahun dan semester yang sama sudah ada/i).should('exist');
    });

    it('PGT-1.14 - Isi sebagian form -> klik btn Batal', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2055');
        cy.contains('button', /Cancel|Batal/i).click();

        cy.get('form').should('not.exist');

        cy.contains('2055').should('not.exist');
    });

    it('PGT-1.15 - Isi sebagian form -> klik icon X di pojok modal', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2056');
        cy.get('button.absolute.end-5.top-5').click();

        cy.get('form').should('not.exist');

        cy.contains('2056').should('not.exist');
    });

    it('PGT-1.16 - Isi sebagian form -> tekan tombol Esc di keyboard', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2056');
        cy.get('form').type('{esc}');

        cy.get('form').should('not.exist');

        cy.contains('2056').should('not.exist');
    });

    it('PGT-1.17 - Ketik huruf/karakter non-angka (\'abc\') di field Tahun Awal', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('{backspace}'.repeat(4));
        cy.get('input[data-slot="form-control"]').first().type('abc');
        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.get('input[data-slot="form-control"]').first().should('have.value', '');
    });

    it('PGT-1.18 - Tambah TA dengan tanggal future (belum ke-jangkau today)', () => {
        const year1 = 2041;
        const year2 = 2042;
        const date1 = 'Tuesday, January 1st, 2041'
        const date2 = 'Wednesday, January 1st, 2042'

        // add school year 1
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type(year1);
        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains(year1).click();
        cy.contains('button[role="combobox"]', /Juli|July/i).click();
        cy.get('[role="option"]').contains(/Januari|January/i).click();
        cy.get(`button[aria-label="${date1}"]`).click();
        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.contains(/berhasil ditambahkan/i, { timeout: 10000 }).should('be.visible');
        cy.get('form').should('not.exist');

        // add 2
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type(year2);
        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains(year2).click();
        cy.contains('button[role="combobox"]', /Juli|July/i).click();
        cy.get('[role="option"]').contains(/Januari|January/i).click();
        cy.get(`button[aria-label="${date2}"]`).click();
        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.contains(/berhasil ditambahkan/i, { timeout: 10000 }).should('be.visible');
        cy.get('form').should('not.exist');

        cy.contains('tr', /1 Januari 2041|January 1st, 2041/i).should('be.visible')
        cy.contains('tr', /1 Juli 2041|July 1st, 2041/i).should('be.visible')

        cy.contains('tr', /1 Juli 2042|July 1st, 2042/i).should('be.visible')
        cy.contains('tr', /1 Januari 2042|January 1st, 2042/i).should('be.visible')

        cy.contains('tr', /1 Januari 2041|January 1st, 2041/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /1 Januari 2041|January 1st, 2041/i).should('not.exist')

        cy.contains('tr', /1 Juli 2041|July 1st, 2041/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /1 Juli 2041|July 1st, 2041/i).should('not.exist')

        cy.contains('tr', /1 Juli 2042|July 1st, 2042/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /1 Juli 2042|July 1st, 2042/i).should('not.exist')

        cy.contains('tr', /1 Januari 2042|July 1st, 2042/i).find('.lucide-trash').click();
        cy.contains('button', /Hapus|Delete/i).click();
        cy.contains('tr', /2 Juli 2041|July 1st, 2042/i).should('not.exist')
    });

    it('PGT-1.19 - Verify the column headers are displayed correctly', () => {
        cy.contains('th', /Tahun Ajaran|School Year/i).should('be.visible');
        cy.contains('th', /Semester/i).should('be.visible');
        cy.contains('th', /Tanggal Mulai|Start Date/i).should('be.visible');
        cy.contains('th', /Tanggal Akhir|End Date/i).should('be.visible');
        cy.contains('th', /Status/i).should('be.visible');
    })

    it('PGT-1.20 Verify default sorting list Tahun Ajaran secara descending (TA terbaru / tahun paling besar di atas)', () => {
        cy.get('table tbody tr').should('have.length.gt', 0).then(($rows) => {
            const years = $rows.toArray().map(tr => {
                const firstColText = tr.querySelector('td:nth-child(1)')?.innerText.trim() || '';
                const match = firstColText.match(/\d{4}/);
                return match ? parseInt(match[0], 10) : 0;
            });

            cy.log('Extracted School Years:', JSON.stringify(years));

            const sortedYears = [...years].sort((a, b) => b - a);
            expect(years).to.deep.equal(sortedYears);
        });
    });

    it('PGT-1.21 - Format tanggal Bahasa Indonesia (Bulan nama kata)', () => {
        const namaBulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        function formatDateID(dateInput) {
            const d = new Date(dateInput);
            const day = d.getDate();
            const month = namaBulan[d.getMonth()];
            const year = d.getFullYear();

            return `${day} ${month} ${year}`;
        }
        const sampleDate = "2026-01-01";
        const formattedDate = formatDateID(sampleDate);
        expect(formattedDate).to.equal('1 Januari 2026');
    });

    it('PGT-1.22 Verify badge status Inactive memuat class warna yang sesuai', () => {
        cy.contains(/^(Aktif|Active)$/i)
            .closest('[data-slot="badge"]')
            .should('have.class', 'bg-[var(--color-success-accent,var(--color-green-500))]/5');

        cy.contains(/^(Tidak Aktif|Inactive)$/i)
            .closest('[data-slot="badge"]')
            .should('have.class', 'bg-[var(--color-gray-500)]/5');
    });

    it('PGT-1.23 - harus hanya menampilkan data tahun 2026', () => {
        cy.get('input[placeholder="Cari"]').clear().type('2026');

        cy.contains('tbody tr', '2025').should('not.exist');
        cy.contains('tbody tr', '2026').should('not.exist');
        cy.contains('tbody tr', '2027').should('not.exist');
        cy.contains('tbody tr', '2028').should('not.exist');
        cy.contains('tbody tr', '2029').should('not.exist');

        cy.get('tbody').should('contain.text', '2026');
    });

    it('PGT-1.24 - harus memfilter berdasarkan semester ganjil', () => {
        cy.get('input[placeholder="Cari"]').clear().type('Ganjil');
        cy.contains('tbody tr', /genap/i).should('not.exist');
        cy.get('tbody').contains(/ganjil/i).should('be.visible');
    });


    it('PGT-1.25 - harus hanya menampilkan data tahun 202', () => {
        cy.get('input[placeholder="Cari"]').clear().type('202');

        cy.contains('tbody tr', '201').should('not.exist');
        cy.contains('tbody tr', '203').should('not.exist');
        cy.contains('tbody tr', '204').should('not.exist');
        cy.contains('tbody tr', '205').should('not.exist');

        cy.get('tbody').should('contain.text', '202');
    });

    it('PGT-1.26 - harus hanya menampilkan data tahun 202', () => {
        cy.get('input[placeholder="Cari"]').clear().type('Gibran ganteng');

        cy.contains('h3', /Data Tahun Ajaran tidak ditemukan|School Year data not found/i).should('be.visible');
        cy.get('tbody').find('tr').should('have.length', 1);
    });

    it('PGT-1.27 - harus hanya menampilkan data tahun 202', () => {
        cy.get('input[placeholder="Cari"]').clear().type('Gibran ganteng');
        cy.get('input[placeholder="Cari"]').clear();

        cy.get('tbody').find('tr').should('have.length.gt', 1);
    });

    it('PGT-1.28 - harus dapat mengurutkan Tahun Ajaran', () => {
        cy.get('.lucide-chevrons-up-down').first().click();

        cy.contains('.grow', /Ascending|Menaik/i).should('be.visible');
        cy.contains('.grow', /Descending|Menurun/i).should('be.visible');
    })

    it('PGT-1.29 - Pilih sort Asc di header Tahun Ajaran, list sort ascending TA paling lama di atas', () => {
        cy.get('.lucide-chevrons-up-down').first().click();

        cy.wait(3000);

        cy.get('table tbody tr').should('have.length.gt', 0).should(($rows) => {
            const years = $rows.toArray().map(tr => {
                const firstColText = tr.querySelector('td:nth-child(1)')?.innerText.trim() || '';
                const match = firstColText.match(/\d{4}/);
                return match ? parseInt(match[0], 10) : 0;
            });

            const sortedYears = [...years].sort((a, b) => a - b);
            expect(years).to.deep.equal(sortedYears);
        });
    })

    it('PGT-1.30 - Pilih sort Desc di header Tahun Ajaran, list sort descending TA paling baru di atas', () => {
        cy.get('.lucide-chevrons-up-down').first().click();
        cy.contains('.grow', /Descending|Menurun/i).click({ force: true });

        cy.wait(1000);

        cy.get('table tbody tr').should('have.length.gt', 0).should(($rows) => {
            const years = $rows.toArray().map(tr => {
                const firstColText = tr.querySelector('td:nth-child(1)')?.innerText.trim() || '';
                const match = firstColText.match(/\d{4}/);
                return match ? parseInt(match[0], 10) : 0;
            });

            const sortedYears = [...years].sort((a, b) => b - a);
            expect(years).to.deep.equal(sortedYears);
        });
    })

    it('PGT-1.31 - Pagination container visible dengan per-page selector dan counter "X - Y Dari Z"', () => {
        cy.contains('div', /1 - \d+ (of|dari) \d+/i).should('be.visible');
        cy.get('div[data-slot="data-grid-pagination"]').should('be.visible');
    })

    it('PGT-1.32 - List update, maksimal 10 row per halaman', () => {
        cy.contains('button', '10').should('be.visible');
    })

    it('PGT-1.33 - Counter update ke range halaman berikutnya, data yang tampil berbeda', () => {
        cy.get('div[data-slot="data-grid-pagination"]')
            .contains('button', '10').click();
        cy.get('[role="option"]').contains('5').click();

        cy.wait(500);

        cy.contains('div', /\d+ - \d+ (of|dari) \d+/i).invoke('text').then((counterBefore) => {
            cy.get('table tbody tr').then(($rows) => {
                const firstPageData = $rows.toArray().map(tr => tr.querySelector('td:nth-child(1)')?.innerText.trim());

                cy.get('div[data-slot="data-grid-pagination"]')
                    .find('button').eq(-2).click();

                cy.contains('div', /\d+ - \d+ (of|dari) \d+/i).invoke('text').should((counterAfter) => {
                    expect(counterAfter.trim()).to.not.equal(counterBefore.trim());
                });

                cy.get('table tbody tr').should(($newRows) => {
                    const secondPageData = $newRows.toArray().map(tr => tr.querySelector('td:nth-child(1)')?.innerText.trim());
                    expect(secondPageData).to.not.deep.equal(firstPageData);
                });
            });
        });
    })

    it('PGT-1.34 - Modal Tambah TA terbuka', () => {
        cy.contains('button', /Tambah Tahun Ajaran/i).click()
        cy.get('form').should('be.visible');
    })

    it('PGT-1.35 - Modal Edit Tahun Ajaran terbuka dengan data row ter-prefill', () => {
        cy.get('.lucide-square-pen').first().click({ force: true });
        cy.get('[role="dialog"]').should('be.visible');

        cy.get('[role="dialog"]').find('input').first().invoke('val').should('match', /^\d{4}$/);

        cy.get('[role="dialog"]').find('input').first().invoke('val').then((startYear) => {
            const expectedEndYear = String(parseInt(startYear) + 1);
            cy.get('[role="dialog"]').find('input').eq(1).should('have.value', expectedEndYear);
        });
    });

    it('PGT-1.36 - Tahun Awal & Tahun Akhir readonly, Semester disabled, Tanggal Akhir disabled, Tanggal Mulai + Status editable', () => {
        cy.get('.lucide-square-pen').first().click()
        cy.get('form').should('be.visible');
        cy.get('input[data-slot="form-control"]').eq(0).should('have.attr', 'readonly');
        cy.get('input[data-slot="form-control"]').eq(1).should('have.attr', 'readonly');
        cy.contains('button', /Ganjil|Genap/i).should('be.disabled');
        cy.contains('button', /Status/i).should('be.enabled');
    })

    it('PGT-1.37 - Cek pre-filled values di modal Edit', () => {
        cy.get('table tbody tr').first().within(() => {
            cy.get('td').eq(0).invoke('text').as('rowSchoolYear');
            cy.get('td').eq(1).invoke('text').as('rowSemester');
            cy.get('td').eq(2).invoke('text').as('rowStartDate');
            cy.get('td').eq(3).invoke('text').as('rowEndDate');
            cy.get('td').eq(4).invoke('text').as('rowStatus');
        });
        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');
        cy.get('@rowSchoolYear').then((schoolYear) => {
            const years = schoolYear.trim().match(/(\d{4})\/(\d{4})/);
            if (years) {
                cy.get('input[data-slot="form-control"]').eq(0).should('have.value', years[1]);
                cy.get('input[data-slot="form-control"]').eq(1).should('have.value', years[2]);
            }
        });
        cy.get('@rowSemester').then((semester) => {
            cy.contains('button', new RegExp(semester.trim(), 'i')).should('be.visible');
        });
        cy.contains('label', /Tanggal Mulai|Start Date/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .should('not.contain.text', 'DD/MM/YYYY')
            .and('not.contain.text', 'Tanggal Mulai')
            .and('not.contain.text', 'Start Date');
        cy.contains('label', /Tanggal Akhir|End Date/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .should('not.contain.text', 'DD/MM/YYYY')
            .and('not.contain.text', 'Tanggal Akhir')
            .and('not.contain.text', 'End Date');
    })

    it('PGT-1.38 - Ubah Tanggal Mulai di modal Edit → cek Tanggal Akhir auto-update', () => {
        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.contains('label', /Tanggal Akhir|End Date/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .invoke('text')
            .then((text) => text.trim())
            .as('endDateBefore');

        cy.contains('label', /Tanggal Mulai|Start Date/i)
            .closest('[data-slot="form-item"]')
            .find('.lucide-calendar-days')
            .click({ force: true });

        cy.get('[role="dialog"], [data-radix-popper-content-wrapper]').should('be.visible');

        cy.get('[role="gridcell"] button').contains(/^15$/).first().click();

        cy.get('form').click({ force: true });

        cy.get('@endDateBefore').then((endDateBefore) => {
            cy.contains('label', /Tanggal Akhir|End Date/i)
                .closest('[data-slot="form-item"]')
                .find('button')
                .invoke('text')
                .should((endDateAfter) => {
                    expect(endDateAfter.trim()).to.not.equal('DD/MM/YYYY');
                    expect(endDateAfter.trim()).to.not.equal(endDateBefore);
                });
        });
    })

    it('PGT-1.39 - Ubah tanggal valid → klik Simpan → toast berhasil diperbarui', () => {
        cy.intercept('PUT', '**/school-years/**').as('updateSchoolYear');
        cy.intercept('PATCH', '**/school-years/**').as('patchSchoolYear');

        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.get('form').find('.lucide-calendar-days').first().click({ force: true });
        cy.get('[role="gridcell"] button').contains(/^15$/).first().click();

        cy.get('form').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
    })

    it('PGT-1.40 - Ubah Status semester ke Aktif → klik Simpan → badge berubah jadi hijau', () => {
        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.get('form').contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click();

        cy.get('[role="option"]').contains(/Aktif|Active/i).click();

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.get('form').should('not.exist');
    })

    it('PGT-1.41 - Aktifkan 1 semester → cek semester aktif lainnya otomatis jadi Tidak Aktif', () => {
        cy.get('table tbody tr').then(($rows) => {
            const activeRowsBefore = [];
            $rows.each((i, row) => {
                const text = row.innerText;
                if (/\bActive\b|\bAktif\b/i.test(text) && !/Inactive|Tidak Aktif/i.test(text)) {
                    activeRowsBefore.push(i);
                }
            });
            cy.wrap(activeRowsBefore).as('activeRowsBefore');
        });

        cy.contains('table tbody tr', /Inactive|Tidak Aktif/i)
            .find('.lucide-square-pen').click();
        cy.get('form').should('be.visible');
        cy.get('form').contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click({ force: true });
        cy.get('[role="option"]').contains(/^\s*(Aktif|Active)\s*$/i).should('be.visible').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.get('form').should('not.exist');

        cy.get('table tbody tr').then(($rows) => {
            let activeCount = 0;
            $rows.each((i, row) => {
                const text = row.innerText;
                if (/\bActive\b|\bAktif\b/i.test(text) && !/Inactive|Tidak Aktif/i.test(text)) {
                    activeCount++;
                }
            });
            expect(activeCount).to.be.at.most(1);
        });
    })

    it('PGT-1.42 - Kosongkan Tanggal Mulai → klik Simpan → validation error muncul', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('form').should('be.visible');
        cy.contains('label', /Tanggal Mulai|Start Date/i)
            .closest('[data-slot="form-item"]')
            .find('.lucide-calendar-days')
            .click({ force: true });
        cy.get('td[aria-selected="true"] button, button[aria-selected="true"], button[data-selected="true"]')
            .first().click({ force: true });
        cy.get('form').click({ force: true });
        cy.contains(/Save|Simpan/i).click({ force: true });
        cy.contains(/Tanggal mulai wajib diisi|Start date is required/i).should('be.visible');
        cy.get('form').should('be.visible');
    })

    it('PGT-1.43 - Ubah tanggal ke periode yang overlap TA lain → klik Simpan → error overlap', () => {
        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.contains('label', /Tanggal Mulai|Start Date/i)
            .closest('[data-slot="form-item"]')
            .find('.lucide-calendar-days')
            .click({ force: true });

        const monthRegex = /Januari|January|Februari|February|Maret|March|April|Mei|May|Juni|June|Juli|July|Agustus|August|September|Oktober|October|November|Desember|December/i;
        cy.contains('button[role="combobox"]', monthRegex).click();

        cy.get('[role="option"]').contains(/Januari|January/i).click();

        cy.get('[role="gridcell"] button').contains(/^1$/).first().click();
        cy.get('form').click({ force: true });

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains(/periode tanggal tumpang tindih|overlap|sudah ada/i).should('exist');
        cy.get('form').should('be.visible');
    })

    it('PGT-1.44 - Ubah data → klik Batal → modal tertutup, perubahan tidak tersimpan', () => {
        cy.get('table tbody tr').first().find('td').eq(4).invoke('text')
            .should('match', /Aktif|Active/i)
            .then((text) => cy.wrap(text.trim()).as('statusBefore'));

        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click();
        cy.get('[role="option"]').first().click();

        cy.contains('button', /Cancel|Batal/i).click();

        cy.get('form').should('not.exist');

        cy.get('@statusBefore').then((statusBefore) => {
            cy.get('table tbody tr').first().find('td').eq(4).invoke('text').should((statusAfter) => {
                expect(statusAfter.trim()).to.equal(statusBefore);
            });
        });
    })

    it('PGT-1.45 - Ubah data → klik icon X di pojok modal → modal tertutup, perubahan tidak tersimpan', () => {
        cy.get('table tbody tr').first().find('td').eq(4).invoke('text')
            .should('match', /Aktif|Active/i)
            .then((text) => cy.wrap(text.trim()).as('statusBefore'));

        cy.get('.lucide-square-pen').first().click();
        cy.get('form').should('be.visible');

        cy.get('form').contains('button[role="combobox"]', /Aktif|Active|Tidak Aktif|Inactive/i).click({ force: true });
        cy.get('[role="option"]').first().click();

        cy.get('[role="dialog"]').find('button[aria-label="Close"], button:has(.lucide-x), .lucide-x').first().click({ force: true });
        cy.get('form').should('not.exist');

        cy.get('@statusBefore').then((statusBefore) => {
            cy.get('table tbody tr').first().find('td').eq(4).invoke('text').should((statusAfter) => {
                expect(statusAfter.trim()).to.equal(statusBefore);
            });
        });
    })

    it('PGT-1.46 - Ubah data → tekan Esc di keyboard', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('td').eq(4).invoke('text')
            .should('match', /Aktif|Active/i)
            .then((text) => cy.wrap(text.trim()).as('statusBefore'));

        cy.get('.lucide-square-pen').first().click({ force: true });
        cy.get('form').should('be.visible');

        cy.get('form').contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click();
        cy.get('[role="option"]').first().click();

        cy.get('form').type('{esc}');

        cy.get('form').should('not.exist');

        cy.get('@statusBefore').then((statusBefore) => {
            cy.get('table tbody tr').first().find('td').eq(4).invoke('text').should((statusAfter) => {
                expect(statusAfter.trim()).to.equal(statusBefore);
            });
        });
    })

    it('PGT-1.47 - Klik Simpan tanpa ubah apapun', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('.lucide-square-pen').first().click({ force: true });
        cy.get('form').should('be.visible');

        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.get('form').should('not.exist');
    })

    it('PGT-1.48 - Klik trash icon di row TA', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('.lucide-trash').first().click({ force: true });

        cy.get('[role="dialog"]').should('be.visible');
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).should('be.visible');
        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).should('be.visible');

        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).click();
    })

    it('PGT-1.49 - Klik trash di row Tidak Aktif → klik Hapus di dialog', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2045');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2045').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });
        cy.get('form').should('not.exist');

        cy.get('table tbody tr').should('have.length.gt', 0);

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();

        cy.wait(1000)

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();

        cy.contains(/berhasil dihapus/i, { timeout: 10000 }).should('be.visible');
    })

    it('PGT-1.50 - Hapus 1 row (misal Genap) → cek row sibling (Ganjil) TETAP ada di list', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2045');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2045').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(3000);

        cy.contains('table tbody tr', '2045/2046').should('exist');

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1500);

        cy.contains('table tbody tr', '2045/2046').should('not.exist');
    })

    it('PGT-1.51 - TA hilang total dari list, tidak ada trace lagi', () => {
        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type('2045');

        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains('2045').click();
        cy.get('button[aria-label*="July 17"]').click();

        cy.get('form').click({ force: true });
        cy.get('button[type="submit"]').contains(/Save|Simpan/i).click({ force: true });

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.wait(3000);

        cy.contains('table tbody tr', '2045/2046').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.get('[role="dialog"]').should('not.exist');

        cy.contains('table tbody tr', '2045/2046').should('not.exist');
    })

    it('PGT-1.52 - Hapus row TA berstatus AKTIF ditolak sistem', () => {
        cy.contains('table tbody tr td', /^Aktif$|^Active$/i).closest('tr').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.get('.toaster, [role="alert"], [data-sonner-toast]').contains(/tidak|gagal|error|cannot/i, { timeout: 10000 }).should('be.visible');
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(3000);
        cy.contains('table tbody tr td', /^Aktif$|^Active$/i).should('exist');
    });

    it('PGT-1.53 - Non-aktifkan TA aktif dengan mengaktifkan TA lain, lalu hapus', () => {
        const dummyYear = '2045';
        const dummyYearText = '2045/2046';

        cy.contains('table tbody tr td', /^Aktif$|^Active$/i).closest('tr')
            .find('td').eq(0).invoke('text').as('originalActiveYear');

        cy.contains('button', /Add School Year|Tambah Tahun Ajaran/i).click();
        cy.get('input[data-slot="form-control"]').first().type(dummyYear);
        cy.get(".lucide-calendar-days").first().click({ force: true });
        cy.contains('button[role="combobox"]', /\d{4}/).click();
        cy.get('[role="option"]').contains(dummyYear).click();
        cy.get('button[aria-label*="July 17"]').click();
        cy.get('form').click({ force: true });
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.contains('table tbody tr', dummyYearText).first().within(() => {
            cy.get('.lucide-square-pen, [aria-label*="Edit"], [aria-label*="Ubah"]').first().click({ force: true });
        });
        cy.get('form').should('be.visible');
        cy.get('form').contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click();

        cy.get('[role="option"]').contains(/^\s*(Aktif|Active)\s*$/i).should('be.visible').click({ force: true });

        cy.intercept('PUT', '**/school-years/**').as('updateDummy');
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait('@updateDummy', { timeout: 10000 }).then(() => {
            cy.get('form').should('not.exist');
            cy.wait(2000);
        });

        cy.get('table tbody tr').not(`:contains("${dummyYearText}")`).first().within(() => {
            cy.get('.lucide-square-pen, [aria-label*="Edit"], [aria-label*="Ubah"]').first().click({ force: true });
        });
        cy.get('form').should('be.visible');
        cy.get('form').contains('label', /Status/i)
            .closest('[data-slot="form-item"]')
            .find('button')
            .click();
        cy.get('[role="option"]').contains(/^\s*(Aktif|Active)\s*$/i).should('be.visible').click({ force: true });

        cy.intercept('PUT', '**/school-years/**').as('updateOriginal');
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait('@updateOriginal', { timeout: 10000 }).then(() => {
            cy.get('form').should('not.exist');
            cy.wait(2000);
        });

        cy.contains('table tbody tr', dummyYearText).first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();

        cy.wait(3000);

        cy.contains('table tbody tr', dummyYearText).first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.get('[role="dialog"]').should('not.exist');

        cy.contains('table tbody tr', dummyYearText).should('not.exist');
    });

    it('PGT-1.54 - Batal hapus TA dengan klik tombol Batal', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('td').eq(0).invoke('text').as('yearText');
        cy.get('table tbody tr').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });
        cy.get('[role="dialog"]').should('be.visible');
        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).click();
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('@yearText').then((year) => {
            cy.contains('table tbody tr', year.trim()).should('exist');
        });
    });

    it('PGT-1.55 - Batal hapus TA dengan menekan tombol Esc', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('td').eq(0).invoke('text').as('yearText');
        cy.get('table tbody tr').first().within(() => {
            cy.get('.lucide-trash').click({ force: true });
        });

        cy.get('[role="dialog"]').should('be.visible');
        cy.get('body').type('{esc}');
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('@yearText').then((year) => {
            cy.contains('table tbody tr', year.trim()).should('exist');
        });
    });
});