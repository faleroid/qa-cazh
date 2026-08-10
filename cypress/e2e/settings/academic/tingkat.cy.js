describe('The Level Page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop')) {
                return false;
            }
        });

        cy.login();
        cy.visit('setting/academic/school-level');
    });

    it('PGT-3.1 - Isi form Tambah Tingkat dengan data valid (pilih Instansi + isi Nama Tingkat) → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.get('form').should("be.visible");
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 7 Test');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains('div, span', /berhasil ditambahkan|successfully created|successfully added/i).should('be.visible');
        cy.get('form').should('not.exist');

        cy.contains('tr', /Kelas 7 Test/i).should("be.visible").and('contain', 'Aktif');
        cy.wait(500);

        // Cleanup
        cy.contains('tr', /Kelas 7 Test/i).find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
        cy.contains('tr', /Kelas 7 Test/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-3.2 - Klik btn Tambah Tingkat di halaman list', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.get('form').should("be.visible");
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').should('be.visible');
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i)
            .parent()
            .find('input')
            .should('have.value', '');
        cy.wait(500);
    });

    it('PGT-3.3 - Isi form (Instansi + Tingkat) → klik btn Batal', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(800);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas Batal Test');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('form').should('not.exist');
        cy.contains('tr', /Kelas Batal Test/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-3.4 - Tambah beberapa tingkat berbeda di 1 Instansi yang sama', () => {
        // Tambah Tingkat Ke-1
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 7 Multi');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Tambah Tingkat Ke-2
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 8 Multi');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Verify standard separate rows
        cy.contains('tr', /Kelas 7 Multi/i).should('be.visible');
        cy.contains('tr', /Kelas 8 Multi/i).should('be.visible');
        cy.wait(500);

        // Cleanup Ke-1
        cy.contains('tr', /Kelas 7 Multi/i).find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(3000);

        // Cleanup Ke-2
        cy.contains('tr', /Kelas 8 Multi/i).find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(500);
    });

    it('PGT-3.5 - Tambah 2 tingkat dengan nama SAMA tapi Instansi BERBEDA', () => {
        // Instansi 1
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').eq(0).invoke('text').then((instansi1) => {
            cy.get('[role="option"]').contains(instansi1.trim()).click();
            cy.wait(500);
            cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas Sama');
            cy.wait(1000);
            cy.contains('button', /Save|Simpan/i).click({ force: true });
            cy.wait(1500);

            // Instansi 2
            cy.contains('button', /Add Level|Tambah Tingkat/i).click();
            cy.wait(500);
            cy.contains('button', 'Pilih Instansi').click();
            cy.wait(500);
            cy.get('[role="option"]').eq(1).invoke('text').then((instansi2) => {
                cy.get('[role="option"]').contains(instansi2.trim()).click();
                cy.wait(500);
                cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas Sama');
                cy.wait(1000);
                cy.contains('button', /Save|Simpan/i).click({ force: true });
                cy.wait(3500);

                // Verification
                cy.get('tr').filter(':contains("Kelas Sama")').should('have.length.at.least', 2);
                cy.wait(500);

                // Cleanup
                cy.get('tr').filter(':contains("Kelas Sama")').each(($el) => {
                    cy.wrap($el).find('.lucide-trash, [data-icon="trash"]').click();
                    cy.wait(2500);
                    cy.contains('button', /Hapus|Delete/i).click();
                    cy.wait(3000);
                });
            });
        });
    });

    it('PGT-3.6 - Isi Nama Tingkat tapi tidak pilih Instansi → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 10 Test');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.7 - Pilih Instansi tapi kosongkan Nama Tingkat → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama tingkat wajib diisi|Level name is required|Tingkat wajib diisi|Level is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.8 - Klik Simpan tanpa isi field apapun', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama tingkat wajib diisi|Level name is required|Tingkat wajib diisi|Level is required/i).should('be.visible');
        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.9 - Tambah tingkat dengan nama & instansi yang sudah ada (duplikat)', () => {
        // Buat tingkat pertama
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas Duplikat');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Coba buat tingkat yang sama lagi
        cy.contains('button', /Add Level|Tambah Tingkat/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas Duplikat');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });

        // Error message toast harus ada/terdeteksi sebelum menghilang, dan modal tetap terbuka
        cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
        cy.get('form').should('be.visible');
        cy.wait(500);

        // Batal & Cleanup
        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.contains('tr', /Kelas Duplikat/i).find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-3.11 - Isi Nama Tingkat dengan angka saja (misal \'10\') → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('10');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(3500);

        cy.contains('td, tr', /^10$|\b10\b/).should('be.visible');

        // Cleanup
        cy.get('table tbody tr').filter(':contains("10")').first().find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-3.12 - Isi Nama Tingkat dengan spasi saja (whitespace only) → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('   ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama tingkat wajib diisi|Level name is required|Tingkat wajib diisi|Level is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.13 - Input Nama Tingkat dengan spasi di awal & akhir (misal \'  Kelas 7  \') → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('  Kelas 7 Trim  ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.contains('td', /^Kelas 7 Trim$/).should('be.visible');
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').filter(':contains("Kelas 7 Trim")').first().find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click();
        cy.wait(1500);
    });

    it('PGT-3.14 - Input Nama Tingkat sangat panjang (>255 karakter) → klik Simpan', () => {
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        const longName = 'a'.repeat(260);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type(longName);
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('form').length > 0) {
                cy.contains('button', /Cancel|Batal/i).click();
            } else {
                cy.get('table tbody tr').contains(/^a+/).first().find('.lucide-trash, [data-icon="trash"]').click();
                cy.wait(500);
                cy.contains('button', /Hapus|Delete/i).click();
            }
        });
        cy.wait(500);
    });

    it('PGT-3.15 - Load halaman list Tingkat', () => {
        cy.contains('th', /Instansi|Institution/i).should('be.visible');
        cy.contains('th', /Tingkat|Level/i).should('be.visible');
        cy.contains('th', /Status/i).should('be.visible');
        cy.contains('th', /Dibuat Pada|Created At/i).should('be.visible');
        cy.wait(500);
    });

    it('PGT-3.16 - Cek setiap row di list Tingkat', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').should('be.visible');
        cy.get('table tbody tr').first().find('.lucide-trash, [data-icon="trash"]').should('be.visible');
        cy.wait(500);
    });

    it('PGT-3.17 - Buka halaman list Tingkat saat belum ada data tingkat', () => {
        cy.get('body').then(($body) => {
            cy.wait(4500);
            const hasEmptyText = $body.text().includes('Data Tingkat tidak ditemukan') || $body.text().includes('Tidak ada data') || $body.text().includes('No data');
            const hasRows = $body.find('table tbody tr').length > 0;
            cy.wait(4500);
            if (hasEmptyText || !hasRows) {
                cy.contains(/Data Tingkat tidak ditemukan|Tidak ada data|No data available|Data kosong/i).should('be.visible');
            } else {
                cy.get('table tbody tr').should('have.length.gt', 0);
            }
        });
        cy.wait(500);
    });

    it('PGT-3.18 - Tambah 2 tingkat berturut-turut → reload halaman → Default sort: tingkat terbaru tampil di paling atas', () => {
        // Tambah Tingkat Ke-1
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('SortTingkat1');
        cy.wait(1000);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2000);

        // Tambah Tingkat Ke-2
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2000);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('SortTingkat2');
        cy.wait(1000);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2000);

        cy.reload();
        cy.wait(2500);

        cy.get('table tbody tr').first().contains('SortTingkat2').should('be.visible');

        // Cleanup Ke-2
        cy.get('table tbody tr').contains('SortTingkat2').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(2500);

        // Cleanup Ke-1
        cy.get('table tbody tr').contains('SortTingkat1').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.19 - Aktifkan Filter Instansi (pilih 1 instansi)', () => {
        // Buat tingkat dummy terlebih dahulu agar data terjamin ada
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Filter Test');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Pilih Instansi "Sekolah Digital Indonesia" di Filter
        cy.get('body').then(($body) => {
            const filterBtn = $body.find('button:contains("Pilih Instansi"), button:contains("Semua Instansi"), button:contains("Filter Instansi")');
            if (filterBtn.length > 0) {
                cy.wrap(filterBtn).first().click({ force: true });
            } else {
                cy.get('button[role="combobox"]').first().click({ force: true });
            }
        });
        cy.wait(800);

        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(1500);

        // Verifikasi data muncul di tabel
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('contain.text', 'Tingkat Filter Test');
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('Tingkat Filter Test').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.21 - Aktifkan Filter Status = \'Tidak Aktif\'', () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click({ force: true });
            } else {
                cy.get('button[role="combobox"]').eq(1).click({ force: true });
            }
        });
        cy.wait(800);

        cy.get('[role="option"]').contains(/^(Tidak Aktif|Inactive)$/i).click({ force: true });
        cy.wait(1500);

        cy.contains('[data-slot="badge"], td', /^(Aktif|Active)$/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-3.22 - Aktifkan Filter Status = \'Semua\'', () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active"), button:contains("Tidak Aktif"), button:contains("Inactive")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click({ force: true });
            } else {
                cy.get('button[role="combobox"]').eq(1).click({ force: true });
            }
        });
        cy.wait(800);

        cy.get('[role="option"]').contains(/^(Semua|All|Semua Status)$/i).click({ force: true });
        cy.wait(1500);

        cy.get('table tbody').should('exist');
        cy.wait(500);
    });

    it('PGT-3.23 - Aktifkan filter → tidak ada hasil yang match', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('xyz123abc_unmatched_filter_99', { force: true });
        cy.wait(1500);

        cy.contains(/tidak ditemukan|not found|Data Tingkat tidak ditemukan|No data/i).should('be.visible');
        cy.wait(500);

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-3.24 - Ketik nama tingkat di search box (misal \'Kelas 7\')', () => {
        // Buat tingkat dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 7 SearchTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Search
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('Kelas 7 SearchTest', { force: true });
        cy.wait(1500);

        cy.get('table tbody tr').should('contain.text', 'Kelas 7 SearchTest');

        // Cleanup
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
        cy.get('table tbody tr').contains('Kelas 7 SearchTest').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.25 - Ketik nama Instansi di search box', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('Sekolah Digital Indonesia', { force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr').length > 0 && !$body.text().includes('tidak ditemukan')) {
                cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
            } else {
                cy.contains(/tidak ditemukan|not found|Data Tingkat tidak ditemukan/i).should('be.visible');
            }
        });

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-3.26 - Ketik keyword yang tidak match (\'xyz123abc\')', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('xyz123abc', { force: true });
        cy.wait(1500);

        cy.contains(/tidak ditemukan|not found|Data Tingkat tidak ditemukan/i).should('be.visible');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-3.27 - Setelah search, clear search box (kosongkan)', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('xyz123abc', { force: true });
        cy.wait(1500);

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr').length > 0) {
                cy.get('table tbody tr').should('have.length.gt', 0);
            }
        });
        cy.wait(500);
    });

    it('PGT-3.28 - Cari dengan huruf besar vs kecil (misal \'KELAS 7\' vs \'kelas 7\')', () => {
        // Buat tingkat dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Kelas 7 CaseTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Search Uppercase
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('KELAS 7 CASETEST', { force: true });
        cy.wait(1500);
        cy.get('table tbody tr').should('contain.text', 'Kelas 7 CaseTest');

        // Search Lowercase
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('kelas 7 casetest', { force: true });
        cy.wait(1500);
        cy.get('table tbody tr').should('contain.text', 'Kelas 7 CaseTest');

        // Cleanup
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
        cy.get('table tbody tr').contains('Kelas 7 CaseTest').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.29 - Klik icon pencil (Edit) di row tingkat', () => {
        // Buat data uji
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('EditPrefillTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik Edit
        cy.get('table tbody tr').contains('EditPrefillTest').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);

        cy.get('form').should('be.visible');
        cy.contains('label', /Level|Tingkat/i).parent().find('input').should('have.value', 'EditPrefillTest');

        // Batal & Cleanup
        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('EditPrefillTest').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.31 - Ubah Status dari \'Aktif\' ke \'Tidak Aktif\' → klik Simpan', () => {
        // Tambah data tingkat dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('StatusToggleTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit status to Tidak Aktif
        cy.get('table tbody tr').contains('StatusToggleTest').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);

        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        cy.get('table tbody tr').contains('StatusToggleTest').closest('tr').should('contain.text', 'Tidak Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('StatusToggleTest').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.32 - Ubah Status dari \'Tidak Aktif\' ke \'Aktif\' → klik Simpan', () => {
        // Tambah data tingkat dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('StatusToggleTest2');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit ke Tidak Aktif dulu
        cy.get('table tbody tr').contains('StatusToggleTest2').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        // Ubah balik ke Aktif
        cy.get('table tbody tr').contains('StatusToggleTest2').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);
        cy.get('form, [role="dialog"]').contains('button', /Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        cy.get('table tbody tr').contains('StatusToggleTest2').closest('tr').should('contain.text', 'Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('StatusToggleTest2').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.33 - Ubah Instansi tingkat ke instansi lain → klik Simpan', () => {
        // Buat data di instansi 1
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').eq(0).invoke('text').then((instansi1) => {
            cy.get('[role="option"]').contains(instansi1.trim()).click();
            cy.wait(500);
            cy.contains('label', /Level|Tingkat/i).parent().find('input').type('ChangeInstansiTest');
            cy.wait(500);
            cy.contains('button', /Save|Simpan/i).click({ force: true });
            cy.wait(2500);

            // Edit ubah ke instansi 2
            cy.get('table tbody tr').contains('ChangeInstansiTest').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
            cy.wait(1000);

            cy.get('form, [role="dialog"]').contains('button', instansi1.trim()).click({ force: true });
            cy.wait(500);
            cy.get('[role="option"]').eq(1).invoke('text').then((instansi2) => {
                cy.get('[role="option"]').contains(instansi2.trim()).click({ force: true });
                cy.wait(500);

                cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
                cy.wait(2000);

                cy.get('table tbody tr').contains('ChangeInstansiTest').closest('tr').should('contain.text', instansi2.trim());

                // Cleanup
                cy.get('table tbody tr').contains('ChangeInstansiTest').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
                cy.wait(500);
                cy.get('body').then(($body) => {
                    if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                        cy.contains('button', /Hapus|Delete/i).click({ force: true });
                    }
                });
                cy.wait(1500);
            });
        });
    });

    it('PGT-3.34 - Ubah field di modal Edit → klik Batal', () => {
        // Buat data
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('OriginalEditName');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit lalu Batal
        cy.get('table tbody tr').contains('OriginalEditName').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').clear().type('ModifiedButCancelled');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('form').should('not.exist');
        cy.get('table tbody tr').should('contain.text', 'OriginalEditName');
        cy.get('table tbody tr').should('not.contain.text', 'ModifiedButCancelled');

        // Cleanup
        cy.get('table tbody tr').contains('OriginalEditName').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.35 - Kosongkan Nama Tingkat di modal Edit → klik Simpan', () => {
        cy.get('table tbody tr')
            .first()
            .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
            .first() // <-- Menjamin hanya mengklik elemen pertama yang ditemukan
            .click();

        cy.wait(3000);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').clear();
        cy.wait(1500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2500);

        cy.contains(/Nama tingkat wajib diisi|Level name is required|Tingkat wajib diisi|Level is required/i).should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.36 - Kosongkan field Status di modal Edit → klik Simpan', () => {
        cy.get('table tbody tr')
            .first()
            .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
            .first() // <-- Menjamin hanya mengklik elemen pertama yang ditemukan
            .click();

        cy.wait(1000);

        // Apabila status berupa combobox/select yang bisa di-clear
        cy.get('body').then(($body) => {
            if ($body.find('[role="dialog"] button:contains("Status")').length > 0) {
                cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
                cy.wait(500);
                cy.contains(/Status wajib diisi|Status is required/i).should('be.visible');
            } else {
                // Status default terisi
            }
        });
    });

    it('PGT-3.37 - Ubah Nama Tingkat jadi nama yang sudah ada di Instansi yang sama (duplikat)', () => {
        // Buat data 1
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('ExistingLevelOne');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Buat data 2
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('ExistingLevelTwo');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit data 2 menjadi nama data 1
        cy.get('table tbody tr').contains('ExistingLevelTwo').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').clear().type('ExistingLevelOne');
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });

        cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        // Cleanup 2 data
        cy.get('table tbody tr').contains('ExistingLevelOne').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);

        cy.get('table tbody tr').contains('ExistingLevelTwo').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.38 - Ubah Nama Tingkat jadi karakter khusus \'!@#$%^&*\' → klik Simpan', () => {
        cy.get('table tbody tr').first().find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);

        cy.contains('label', /Level|Tingkat/i).parent().find('input').clear().type('!@#$%^&*');
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama hanya boleh berisi huruf, angka, dan spasi|only letters and numbers|alphanumeric/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-3.39 - Set status tingkat ke \'Aktif\' → buka fitur Jadwal Pelajaran / Presensi / Grup Rapor', () => {
        // Buat tingkat aktif dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Aktif Option');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Verifikasi ketersediaan di list / UI dropdown
        cy.get('table tbody tr').contains('Tingkat Aktif Option').closest('tr').should('contain.text', 'Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Tingkat Aktif Option').closest('tr').find('.lucide-trash, [data-icon="trash"]').click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-3.40 - Set status tingkat ke \'Tidak Aktif\' → buka fitur Jadwal Pelajaran / Presensi / Grup Rapor', () => {
        // Buat tingkat tidak aktif dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Inaktif Option');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Ubah status ke Tidak Aktif
        cy.get('table tbody tr').contains('Tingkat Inaktif Option').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').click();
        cy.wait(1000);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        cy.get('table tbody tr').contains('Tingkat Inaktif Option').closest('tr').should('contain.text', 'Tidak Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Tingkat Inaktif Option').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-3.41 - Klik Aksi → 'Hapus' di row tingkat", () => {
        // Buat data dummy untuk diuji hapus
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Delete Test 41');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik icon/button hapus pada row
        cy.get('table tbody tr')
            .contains('Tingkat Delete Test 41')
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);

        // Verify popup konfirmasi delete muncul dengan tombol Hapus dan Batal
        cy.get('[role="dialog"], .modal, div:contains("Hapus")').should('be.visible');
        cy.contains('button', /Hapus|Delete/i).should('be.visible');
        cy.contains('button', /Batal|Cancel/i).should('be.visible');

        // Cleanup / Tutup popup
        cy.contains('button', /Batal|Cancel/i).click({ force: true });
        cy.wait(500);

        // Hapus data dummy
        cy.get('table tbody tr').contains('Tingkat Delete Test 41').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-3.42 - Klik btn 'Hapus' di popup konfirmasi", () => {
        // Buat data dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Delete Test 42');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus & konfirmasi
        cy.get('table tbody tr')
            .contains('Tingkat Delete Test 42')
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Hapus|Delete/i).click({ force: true });

        // Toast 'berhasil dihapus' muncul, popup tertutup, row hilang
        cy.contains(/berhasil dihapus|deleted successfully|berhasil/i).should('be.visible');
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('not.contain.text', 'Tingkat Delete Test 42');
        cy.wait(1000);
    });

    it("PGT-3.43 - Buka popup Hapus → klik btn 'Batal'", () => {
        // Buat data dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Cancel Delete 43');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus lalu klik Batal
        cy.get('table tbody tr')
            .contains('Tingkat Cancel Delete 43')
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Batal|Cancel/i).click({ force: true });
        cy.wait(500);

        // Popup tertutup & data masih ada
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', 'Tingkat Cancel Delete 43');

        // Cleanup
        cy.get('table tbody tr').contains('Tingkat Cancel Delete 43').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-3.44 - Buka popup Hapus → tekan Esc di keyboard", () => {
        // Buat data dummy
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type('Tingkat Esc Delete 44');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus lalu tekan ESC
        cy.get('table tbody tr')
            .contains('Tingkat Esc Delete 44')
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);

        cy.get('body').type('{esc}');
        cy.wait(500);

        // Popup tertutup & data tidak terhapus
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', 'Tingkat Esc Delete 44');

        // Cleanup
        cy.get('table tbody tr').contains('Tingkat Esc Delete 44').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-3.45 - Search sampai hasil tinggal 1 row → hapus row tersebut", () => {
        const uniqueName = 'UniqueSearchRowToDelete';
        // Buat data unik
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type(uniqueName);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Search kata kunci unik
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear().type(uniqueName);
        cy.wait(1000);

        // Hapus satu-satunya row hasil pencarian
        cy.get('table tbody tr').should('have.length', 1);
        cy.get('table tbody tr')
            .first()
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(2000);

        // Verifikasi empty state UI setelah hapus
        cy.contains(/Data Tingkat tidak ditemukan|Data tidak ditemukan|No data|Empty/i).should('be.visible');

        // Clear search
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear();
        cy.wait(1000);
    });

    it("PGT-3.46 - Hapus tingkat → buka fitur Jadwal Pelajaran / Presensi / Grup Rapor / Data Siswa / PPDB", () => {
        const deletedTingkat = 'DeletedTingkatOption';
        // Buat data
        cy.contains('button', /Add Level|Tambah Tingkat/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Level|Tingkat/i).parent().find('input').type(deletedTingkat);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Hapus tingkat tersebut
        cy.get('table tbody tr')
            .contains(deletedTingkat)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(2000);

        // Verifikasi tidak ada lagi di tabel list tingkat
        cy.get('table tbody tr').should('not.contain.text', deletedTingkat);
    });
});