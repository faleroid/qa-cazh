describe('The School Year Page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop')) {
                return false;
            }
        });

        cy.login();
        cy.visit('setting/academic/major');
    });

    afterEach(() => {
        cy.wait(3000);
    });

    it('PGT-2.1 - Isi form Tambah Jurusan dengan data valid (pilih Instansi + isi Nama Jurusan) → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.get('form').should("be.visible");
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Sastra Jawir');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains('tr', /Sastra Jawir|English Literature/i).should("be.visible");
        cy.wait(500);
        cy.contains('tr', /Sastra Jawir/i).find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
        cy.contains('tr', /Sastra Jawir/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.2 - Klik btn Tambah di halaman list Jurusan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.get('form').should("be.visible");
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').should('be.visible');
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i)
            .parent()
            .find('input')
            .should('have.value', '');
        cy.wait(500);
    });

    it('PGT-2.3 - Isi form (Instansi + Jurusan) → klik btn Batal', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(800);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Sastra Palsu');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('form').should('not.exist');
        cy.contains('tr', /Sastra Palsu/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.4 - Tambah beberapa jurusan berbeda di 1 Instansi yang sama', () => {
        // Tambah Jurusan Ke-1
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Bahasa Jerman');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Tambah Jurusan Ke-2
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Bahasa Perancis');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Verifikasi keduanya ada di tabel sebagai row terpisah
        cy.contains('tr', /Bahasa Jerman/i).should('be.visible');
        cy.contains('tr', /Bahasa Perancis/i).should('be.visible');
        cy.wait(500);

        // Hapus Jurusan Ke-1
        cy.contains('tr', /Bahasa Jerman/i).find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
        cy.contains('tr', /Bahasa Jerman/i).should('not.exist');
        cy.wait(500);

        // Hapus Jurusan Ke-2
        cy.contains('tr', /Bahasa Perancis/i).find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
        cy.contains('tr', /Bahasa Perancis/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.5 - Tambah 2 jurusan dengan nama SAMA tapi Instansi BERBEDA', () => {
        // Tambah Jurusan Ke-1 di Instansi A
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Yayasan New School').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Bahasa Mandarin');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Tambah Jurusan Ke-2 dengan nama sama tapi Instansi B
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains("Sekolah Digital Indonesia").first().click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Bahasa Mandarin');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Keduanya berhasil ditambahkan (seharusnya ada 2 baris 'Bahasa Mandarin')
        cy.get('table tbody tr').filter(':contains("Bahasa Mandarin")').should('have.length.at.least', 2);
        cy.wait(500);

        // Hapus baris pertama
        cy.get('table tbody tr').filter(':contains("Bahasa Mandarin")').first().find('.lucide-trash').click();
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(2500);

        // Hapus baris kedua
        cy.get('table tbody tr').filter(':contains("Bahasa Mandarin")').first().find('.lucide-trash').click();
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);

        cy.get('table tbody tr').filter(':contains("Bahasa Mandarin")').should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.6 - Pilih Instansi tapi kosongkan Nama Jurusan → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama jurusan wajib diisi|Major is required|Major name is required|Jurusan wajib diisi/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-2.7 - Isi Nama Jurusan tapi tidak pilih Instansi → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Sastra Jawir');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-2.8 - Klik Simpan tanpa isi field apapun', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama jurusan wajib diisi|Major is required|Major name is required|Jurusan wajib diisi/i).should('be.visible');
        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-2.9 - Tambah jurusan dengan nama & instansi yang sudah ada (duplikat)', () => {
        // Buat jurusan pertama
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Teknik Mesin');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(3500);

        // Coba buat jurusan yang sama lagi
        cy.contains('button', /Add Major|Tambah Jurusan/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('Teknik Mesin');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Harus muncul pesan error duplikat
        cy.contains(/sudah ada|already exists|duplikat|telah digunakan/i).should('exist');
        cy.get('form').should('be.visible');
        cy.wait(2500);

        cy.contains('button', /Cancel|Batal/i).click({ force: true });
        cy.wait(2500);

        // Hapus jurusan pertama untuk clean up
        cy.get('table tbody tr').filter(':contains("Teknik Mesin")').first().find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
    });

    it('PGT-2.10 - Isi Nama Jurusan dengan spasi saja (whitespace only) → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('   ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama jurusan wajib diisi|Major is required|Major name is required|Jurusan wajib diisi/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-2.11 - Input Nama Jurusan dengan spasi di awal & akhir (misal "  IPA  ") → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('  IPA  ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Memastikan ter-trim (mencari td yang berisi tepat "IPA" tanpa spasi)
        cy.contains('td', /^IPA$/).should('be.visible');
        cy.wait(500);

        // Hapus data uji untuk cleanup
        cy.get('table tbody tr').filter(':contains("IPA")').first().find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(2000);
        cy.contains('td', /^IPA$/).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.12 - Input Nama Jurusan sangat panjang (300+ karakter) → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        const longName = 'a'.repeat(305);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type(longName);
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Menangani apakah disave (lalu didelete) atau ditolak (modal tetap terbuka)
        cy.get('body').then(($body) => {
            if ($body.find('form').length > 0) {
                cy.contains('button', /Cancel|Batal/i).click();
            } else {
                cy.get('table tbody tr').contains(/^a+/).first().find('.lucide-trash').click();
                cy.wait(500);
                cy.contains('button', /Hapus|Delete/i).click();
            }
        });
        cy.wait(500);
    });

    it('PGT-2.13 - Input Nama Jurusan dengan 1 karakter (misal "A") → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('A');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains('td', /^A$/).should('be.visible');
        cy.wait(3500);

        // Hapus data uji untuk cleanup
        cy.get('table tbody tr').filter(':contains("A")').first().find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
    });

    it('PGT-2.14 - Input Nama Jurusan dengan karakter spesial "@#$%" → klik Simpan', () => {
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('@#$%');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error muncul (atau modal tetap terbuka)
        cy.get('body').then(($body) => {
            if ($body.find('form').length > 0) {
                cy.contains('button', /Cancel|Batal/i).click();
            } else {
                // Jika sistem membolehkan, hapus untuk clean up
                cy.get('table tbody tr').filter(':contains("@#$%")').first().find('.lucide-trash').click();
                cy.wait(500);
                cy.contains('button', /Hapus|Delete/i).click();
            }
        });
        cy.wait(500);
    });

    it('PGT-2.15 - Load halaman list Jurusan', () => {
        cy.contains('th', /Nama Jurusan|Jurusan|Major Name|Major/i).should('be.visible');
        cy.contains('th', /Instansi|Institution/i).should('be.visible');
        cy.contains('th', /Status/i).should('be.visible');
        cy.get('table thead th').should('have.length.at.least', 4);
        cy.wait(500);
    });

    it('PGT-2.16 - Cek setiap row di list Jurusan', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('.lucide-square-pen').should('be.visible');
        cy.get('table tbody tr').first().find('.lucide-trash').should('be.visible');
        cy.wait(500);
    });

    it('PGT-2.17 - Tambah 2 jurusan berturut-turut → reload halaman → Default sort: jurusan terbaru tampil di paling atas (newest-first)', () => {
        // Tambah Jurusan Ke-1
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('SortTest1');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(4500);

        // Tambah Jurusan Ke-2
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('SortTest2');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(4500);

        // Default sort: jurusan terbaru (Z_Sort_Test_2) tampil di paling atas
        cy.get('table tbody tr').first().contains('SortTest2').should('be.visible');

        // Clean up: Hapus Jurusan Ke-2
        cy.get('table tbody tr').contains('SortTest2').closest('tr').find('.lucide-trash').click();
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(4500);

        // Hapus Jurusan Ke-1
        cy.get('table tbody tr').contains('SortTest1').closest('tr').find('.lucide-trash').click();
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.18 - Aktifkan Filter Instansi (pilih 1 instansi)', () => {
        // Klik dropdown filter instansi di list page
        cy.get('body').then(($body) => {
            const filterBtn = $body.find('button:contains("Pilih Instansi"), button:contains("Semua Instansi"), button:contains("Filter Instansi")');
            if (filterBtn.length > 0) {
                cy.wrap(filterBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').first().click();
            }
        });
        cy.wait(500);

        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(1000);

        // Verifikasi langsung pada kontainer tbody untuk mencegah DOM detachment error
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('not.contain.text', 'Yayasan New School');
        cy.wait(500);
    });

    it('PGT-2.18 - Aktifkan Filter Instansi (pilih 1 instansi)', () => {
        // Klik dropdown filter instansi di list page
        cy.get('body').then(($body) => {
            const filterBtn = $body.find('button:contains("Pilih Instansi"), button:contains("Semua Instansi"), button:contains("Filter Instansi")');
            if (filterBtn.length > 0) {
                cy.wrap(filterBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').first().click();
            }
        });
        cy.wait(2500);

        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(1500);

        // Verifikasi langsung pada kontainer tbody untuk mencegah DOM detachment error
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('not.contain.text', 'Yayasan New School');
        cy.wait(500);
    });

    it('PGT-2.19 - Aktifkan Filter Status = "Aktif"', () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').eq(1).click();
            }
        });
        cy.wait(1500);

        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click();
        cy.wait(2500);

        // Hanya boleh menampilkan status Aktif/Active (Tidak Aktif/Inactive tidak boleh ada)
        cy.contains('[data-slot="badge"], td', /^(Tidak Aktif|Inactive)$/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.20 - Aktifkan Filter Status = "Tidak Aktif"', () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').eq(1).click();
            }
        });
        cy.wait(500);

        cy.get('[role="option"]').contains(/^(Tidak Aktif|Inactive)$/i).click();
        cy.wait(1500);

        // Hanya boleh menampilkan status Tidak Aktif/Inactive (Aktif/Active tidak boleh ada)
        cy.contains('[data-slot="badge"], td', /^(Aktif|Active)$/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.21 - Aktifkan Filter Status = "Semua"', () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active"), button:contains("Tidak Aktif"), button:contains("Inactive")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').eq(1).click();
            }
        });
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Semua|All|Semua Status)$/i).click();
        cy.wait(1500);
    });

    it('PGT-2.22 - Aktifkan Filter Instansi + Filter Status secara bersamaan (kombinasi)', () => {
        // Klik filter instansi
        cy.get('body').then(($body) => {
            const filterBtn = $body.find('button:contains("Pilih Instansi"), button:contains("Semua Instansi"), button:contains("Filter Instansi")');
            if (filterBtn.length > 0) {
                cy.wrap(filterBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').first().click();
            }
        });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(1000);

        // Klik filter status
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active"), button:contains("Tidak Aktif"), button:contains("Inactive")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click();
            } else {
                cy.get('button[role="combobox"]').eq(1).click();
            }
        });
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click();
        cy.wait(1500);

        // Verifikasi instansi Sekolah Digital Indonesia & status Aktif saja
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('not.contain.text', 'Yayasan New School');
        cy.contains('[data-slot="badge"], td', /^(Tidak Aktif|Inactive)$/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.23 - Aktifkan filter → cari keyword yang tidak ada', () => {
        // Ketik keyword yang tidak mungkin ada
        cy.get('input[placeholder="Cari"]').clear().type('gibran_ganteng_sekali_tidak_ada_jurusan_ini_123');
        cy.wait(1500);

        // Verifikasi Empty State UI muncul
        cy.contains(/tidak ditemukan|not found/i).should('be.visible');
        cy.get('table tbody tr').should('have.length', 1);
        cy.wait(500);

        // Cleanup
        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(500);
    });

    it('PGT-2.24 - Ketik nama jurusan di search box', () => {
        // Tambah jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('SearchMajorTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Cari berdasarkan nama jurusan
        cy.get('input[placeholder="Cari"]').clear().type('SearchMajorTest');
        cy.wait(1500);

        // Verifikasi list hanya menampilkan data yang cocok
        cy.get('table tbody').should('contain.text', 'SearchMajorTest');
        cy.wait(500);

        // Bersihkan pencarian & hapus data uji
        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(1500);
        cy.get('table tbody tr').contains('SearchMajorTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.25 - Ketik nama Instansi di search box', () => {
        // Cari berdasarkan nama instansi
        cy.get('input[placeholder="Cari"]').clear().type('Sekolah Digital Indonesia');
        cy.wait(1500);

        // Verifikasi hasil pencarian (menampilkan Sekolah Digital Indonesia dan menyembunyikan lainnya)
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('not.contain.text', 'Yayasan New School');
        cy.wait(500);

        // Cleanup
        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(500);
    });

    it('PGT-2.26 - Ketik keyword yang tidak match ("xyz123abc")', () => {
        cy.get('input[placeholder="Cari"]').clear().type('xyz123abc');
        cy.wait(1500);

        // Verifikasi Empty State UI muncul
        cy.contains(/tidak ditemukan|not found/i).should('be.visible');
        cy.get('table tbody tr').should('have.length', 1);
        cy.wait(500);

        // Cleanup
        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(500);
    });

    it('PGT-2.27 - Setelah search, clear search box (kosongkan)', () => {
        cy.get('input[placeholder="Cari"]').clear().type('xyz123abc');
        cy.wait(1500);
        cy.contains(/tidak ditemukan|not found/i).should('be.visible');

        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(1500);

        cy.contains(/tidak ditemukan|not found/i).should('not.exist');
        cy.get('table tbody tr').should('have.length.gt', 1);
    });

    it('PGT-2.28 - Cari dengan huruf besar vs kecil (misal "IPA" vs "ipa")', () => {
        // Tambah jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('IpaCaseTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Cari HURUF BESAR
        cy.get('input[placeholder="Cari"]').clear().type('IPACASETEST');
        cy.wait(1500);
        cy.get('table tbody').should('contain.text', 'IpaCaseTest');

        // Cari huruf kecil
        cy.get('input[placeholder="Cari"]').clear().type('ipacasetest');
        cy.wait(1500);
        cy.get('table tbody').should('contain.text', 'IpaCaseTest');

        // Cleanup
        cy.get('input[placeholder="Cari"]').clear();
        cy.wait(1500);
        cy.get('table tbody tr').contains('IpaCaseTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.29 - Klik icon pencil (Edit) di row jurusan', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);

        // Ambil data dari baris pertama sebelum klik edit
        cy.get('table tbody tr').first().within(() => {
            cy.get('td').eq(0).invoke('text').as('rowInstansi');
            cy.get('td').eq(1).invoke('text').as('rowMajorName');
            cy.get('td').eq(2).invoke('text').as('rowStatus');
        });

        cy.wait(3000);

        cy.get('.lucide-square-pen').first().closest('button').click();
        cy.wait(1000);

        // Verifikasi prefilled data di modal dialog
        cy.get('[role="dialog"]').should('be.visible');

        // Nama Jurusan harus ter-prefill sesuai baris
        cy.get('@rowMajorName').then((majorName) => {
            cy.get('[role="dialog"]')
                .find('input')
                .invoke('val')
                .then((val) => {
                    expect(majorName.trim()).to.contain(val.trim());
                });
        });

        // Instansi harus ter-prefill sesuai baris
        cy.get('@rowInstansi').then((instansi) => {
            cy.get('[role="dialog"]').contains('button', instansi.trim()).should('be.visible');
        });

        // Status harus ter-prefill sesuai baris
        cy.get('@rowStatus').then((status) => {
            cy.get('[role="dialog"]').contains('button', status.trim()).should('be.visible');
        });
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(500);
    });

    it('PGT-2.30 - Ubah Nama Jurusan ke nilai baru → klik Simpan', () => {
        // Tambah jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(2500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('EditTest');
        cy.wait(2500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan uji
        cy.get('table tbody tr').contains('EditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(3000);
        cy.get('[role="dialog"]').find('input').clear().type('EditTestUpdated');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Verifikasi toast & terupdate
        cy.contains(/berhasil diperbarui|berhasil|success|updated/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'EditTestUpdated').should('be.visible');
        cy.wait(2500);

        // Cleanup
        cy.get('table tbody tr').contains('EditTestUpdated').closest('tr').find('.lucide-trash').click();
        cy.wait(2500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.31 - Ubah Status dari "Aktif" ke "Tidak Aktif" → klik Simpan', () => {
        // Tambah jurusan uji (default Aktif)
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('EditStatusTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Ubah Status ke Tidak Aktif
        cy.get('table tbody tr').contains('EditStatusTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(3000);

        // Klik combobox Status di dalam modal
        cy.get('[role="dialog"]').contains('button', /Aktif|Active/i).click();
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Tidak Aktif|Inactive)$/i).click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Verifikasi status berubah jadi Tidak Aktif (badge abu)
        cy.contains(/berhasil diperbarui|berhasil|success|updated/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');

        cy.get('table tbody tr').contains('EditStatusTest').closest('tr').within(() => {
            cy.contains(/^(Tidak Aktif|Inactive)$/i)
                .closest('[data-slot="badge"]')
                .should('have.class', 'bg-[var(--color-gray-500)]/5');
        });
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('EditStatusTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.32 - Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan', () => {
        // Tambah jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('EditStatusTest2');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Ubah Status ke Tidak Aktif pertama
        cy.get('table tbody tr').contains('EditStatusTest2').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').contains('button', /Aktif|Active/i).click();
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Tidak Aktif|Inactive)$/i).click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Ubah dari Tidak Aktif kembali ke Aktif
        cy.get('table tbody tr').contains('EditStatusTest2').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').contains('button', /Tidak Aktif|Inactive/i).click();
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi status berubah jadi Aktif (badge hijau)
        cy.contains(/berhasil diperbarui|berhasil|success|updated/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');

        cy.get('table tbody tr').contains('EditStatusTest2').closest('tr').within(() => {
            cy.contains(/^(Aktif|Active)$/i)
                .closest('[data-slot="badge"]')
                .should('have.class', 'bg-[var(--color-success-accent,var(--color-green-500))]/5');
        });
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('EditStatusTest2').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.33 - Ubah Instansi jurusan ke instansi lain → klik Simpan', () => {
        // Tambah jurusan uji pada instansi awal (misal: Sekolah Digital Indonesia)
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('MoveInstansiTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan uji -> ubah instansi ke instansi lain (misal: SMK Digital Indonesia)
        cy.get('table tbody tr').contains('MoveInstansiTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').contains('button', 'Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Academy Cazh').click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Verifikasi Toast success & modal tertutup
        cy.contains(/berhasil diperbarui|berhasil|success|updated/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');

        // Filter berdasarkan instansi baru untuk memastikan jurusan pindah
        cy.contains('button', 'Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Academy Cazh').click();
        cy.wait(1000);
        cy.contains('td', 'MoveInstansiTest').should('be.visible');

        // Cleanup
        cy.get('table tbody tr').contains('MoveInstansiTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.34 - Ubah field di modal Edit → klik Batal', () => {
        // Tambah jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('CancelEditTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buka modal Edit, ubah field Nama Jurusan, lalu klik Batal
        cy.get('table tbody tr').contains('CancelEditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type('ChangedButCanceled');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        // Verifikasi modal tertutup & data tidak berubah
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'CancelEditTest').should('be.visible');
        cy.contains('td', 'ChangedButCanceled').should('not.exist');

        // Cleanup
        cy.get('table tbody tr').contains('CancelEditTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.35 - Kosongkan Nama Jurusan di modal Edit → klik Simpan', () => {
        // Buka modal Edit untuk salah satu jurusan yang ada (atau buat sementara jika perlu)
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('EmptyNameTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buka modal Edit & kosongkan field Nama Jurusan
        cy.get('table tbody tr').contains('EmptyNameTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error validation, modal tetap terbuka, data tidak tersimpan
        cy.contains(/Nama jurusan wajib diisi|wajib diisi|required/i).should('be.visible');
        cy.get('[role="dialog"]').should('be.visible');

        // Batalkan modal & Cleanup
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('EmptyNameTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.36 - Ubah Nama Jurusan jadi nama yang sudah ada di Instansi yang sama (duplikat)', () => {
        // Buat jurusan ke-1
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('DuplicateTarget');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buat jurusan ke-2
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('DuplicateSource');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan ke-2 -> ubah namanya menjadi sama dengan jurusan ke-1 ('DuplicateTarget')
        cy.get('table tbody tr').contains('DuplicateSource').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type('DuplicateTarget');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error duplikat, modal tetap terbuka, data tidak tersimpan
        cy.contains(/sudah ada|sudah terdaftar|duplicate|already exists/i).should('be.visible');

        // Batal & Cleanup kedua jurusan uji
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('DuplicateSource').closest('tr').find('.lucide-trash').click();
        cy.wait(2500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(3500);

        cy.get('table tbody tr').contains('DuplicateTarget').closest('tr').find('.lucide-trash').click();
        cy.wait(2500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.37 - Ubah Nama Jurusan jadi karakter spesial "@#$%" → klik Simpan', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('SpecialCharEditTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan uji -> ubah ke karakter spesial
        cy.get('table tbody tr').contains('SpecialCharEditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type('@#$%');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error validasi karakter, modal tetap terbuka, data tidak tersimpan
        cy.contains(/hanya|format|tidak valid|invalid/i).should('be.visible');

        // Batal & Cleanup
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('SpecialCharEditTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.38 - Ubah Nama Jurusan jadi sangat panjang (>255 karakter) → klik Simpan', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('MaxLengthEditTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        const longName = 'A'.repeat(256);

        // Edit jurusan uji -> ubah nama ke >255 karakter
        cy.get('table tbody tr').contains('MaxLengthEditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type(longName, { delay: 0 });
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error max length
        cy.contains(/value|255|too|long|maksimal|terlalu panjang|exceed/i, { timeout: 10000 }).should('exist');

        // Batal & Cleanup
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('MaxLengthEditTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.39 - Ubah Nama Jurusan jadi spasi saja (whitespace only) → klik Simpan', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('WhitespaceEditTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan uji -> ubah nama ke spasi saja
        cy.get('table tbody tr').contains('WhitespaceEditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type('   ');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        // Verifikasi error 'Nama jurusan wajib diisi'
        cy.contains(/Nama jurusan wajib diisi|wajib diisi|required/i).should('be.visible');

        // Batal & Cleanup
        cy.get('[role="dialog"]').contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('WhitespaceEditTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.40 - Ubah Nama Jurusan dengan spasi di awal & akhir → klik Simpan', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('TrimEditTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Edit jurusan uji -> beri spasi di awal & akhir
        cy.get('table tbody tr').contains('TrimEditTest').closest('tr').find('.lucide-square-pen').closest('button').click();
        cy.wait(1000);
        cy.get('[role="dialog"]').find('input').clear().type('   TrimEditTestCleaned   ');
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Verifikasi Toast success, modal tertutup, dan tersimpan clean (tanpa spasi tepi)
        cy.contains(/berhasil diperbarui|berhasil|success|updated/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'TrimEditTestCleaned').should('be.visible');

        // Cleanup
        cy.get('table tbody tr').contains('TrimEditTestCleaned').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.41 - Klik trash icon di row jurusan', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('DeleteDialogTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Klik icon trash di row jurusan
        cy.get('table tbody tr').contains('DeleteDialogTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);

        // Verifikasi dialog konfirmasi hapus muncul dengan tombol Hapus & Batal
        cy.get('[role="dialog"]').should('be.visible');
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).should('be.visible');
        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).should('be.visible');

        // Batalkan penghapusan & Cleanup
        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('DeleteDialogTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.42 - Verifikasi konten dialog konfirmasi Hapus', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('ContentDialogTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Klik icon trash di row jurusan
        cy.get('table tbody tr').contains('ContentDialogTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);

        // Verifikasi konten teks dialog menampilkan nama jurusan / pesan konfirmasi
        cy.get('[role="dialog"]').contains(/ContentDialogTest|Hapus|Delete/i).should('be.visible');

        // Konfirmasi Hapus untuk cleanup
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.43 - Klik btn "Hapus" di dialog konfirmasi', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('ConfirmDeleteTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buka dialog konfirmasi Hapus & klik 'Hapus'
        cy.get('table tbody tr').contains('ConfirmDeleteTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);

        // Verifikasi Toast 'berhasil dihapus', dialog tertutup, & row hilang dari list
        cy.contains(/berhasil dihapus|berhasil|deleted|success/i, { timeout: 10000 }).should('exist');
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'ConfirmDeleteTest').should('not.exist');
    });

    it('PGT-2.44 - Buka dialog Hapus → klik btn "Batal"', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('CancelDeleteBtnTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buka dialog konfirmasi Hapus & klik 'Batal'
        cy.get('table tbody tr').contains('CancelDeleteBtnTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Batal|Cancel/i).click();
        cy.wait(500);

        // Verifikasi dialog tertutup & row TIDAK terhapus
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'CancelDeleteBtnTest').should('be.visible');

        // Cleanup
        cy.get('table tbody tr').contains('CancelDeleteBtnTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.45 - Buka dialog Hapus → tekan Esc di keyboard', () => {
        // Buat jurusan uji
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type('EscDeleteTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Buka dialog konfirmasi Hapus & tekan tombol Escape (Esc)
        cy.get('table tbody tr').contains('EscDeleteTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.get('body').type('{esc}');
        cy.wait(500);

        // Verifikasi dialog tertutup & row TIDAK terhapus
        cy.get('[role="dialog"]').should('not.exist');
        cy.contains('td', 'EscDeleteTest').should('be.visible');

        // Cleanup
        cy.get('table tbody tr').contains('EscDeleteTest').closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-2.46 - Search sampai hasil tinggal 1 row → hapus row tersebut', () => {
        const uniqueName = 'UniqueSearchDeleteTest';

        // Buat jurusan uji dengan nama unik
        cy.contains('button', /Add Major|Tambah Jurusan/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Major|Jurusan/i).parent().find('input').type(uniqueName);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Lakukan pencarian nama unik hingga hasil menyisakan 1 row
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear().type(uniqueName);
        cy.wait(1000);
        cy.get('table tbody tr').should('have.length', 1);

        // Hapus row hasil pencarian tersebut
        cy.get('table tbody tr').contains(uniqueName).closest('tr').find('.lucide-trash').click();
        cy.wait(500);
        cy.get('[role="dialog"]').contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);

        // Verifikasi empty state UI (0 hasil pencarian saat search aktif)
        cy.contains(/tidak ada data|no data|tidak ditemukan|empty/i).should('be.visible');

        // Reset filter search
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear();
        cy.wait(1000);
    });
});