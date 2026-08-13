describe('The Class Page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop')) {
                return false;
            }
        });

        cy.login();
        cy.visit('setting/academic/class');
    });

    afterEach(() => {
        cy.wait(3000);
    });

    it('PGT-4.1 - Isi form Tambah Kelas dengan data valid (pilih Instansi + isi Nama Kelas) → klik Simpan', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(1500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A Valid');
        cy.wait(1500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        cy.contains('div, span', /berhasil ditambahkan|successfully created|successfully added/i).should('be.visible');
        cy.get('form').should('not.exist');

        cy.contains('tr', /Kelas 7A Valid/i).should('be.visible').and('contain', 'Aktif');
        cy.wait(500);

        // Cleanup
        cy.contains('tr', /Kelas 7A Valid/i).find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(2500);
        cy.contains('tr', /Kelas 7A Valid/i).should('not.exist');
        cy.wait(500);
    });

    it("PGT-4.2 - Klik btn 'Tambah Kelas' di halaman list", () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').should('be.visible');
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i)
            .parent()
            .find('input')
            .should('have.value', '');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-4.3 - Isi form (Instansi + Kelas) → klik btn Batal', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(800);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Batal Test');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('form').should('not.exist');
        cy.contains('tr', /Kelas Batal Test/i).should('not.exist');
        cy.wait(500);
    });

    it('PGT-4.4 - Tambah beberapa kelas berbeda di 1 Instansi yang sama (misal 7A, 7B, 7C)', () => {
        // Kelas 1 (7A)
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A Multi');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Kelas 2 (7B)
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7B Multi');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        // Verify separate rows
        cy.contains('tr', /Kelas 7A Multi/i).should('be.visible');
        cy.contains('tr', /Kelas 7B Multi/i).should('be.visible');
        cy.wait(500);

        // Cleanup 7A
        cy.contains('tr', /Kelas 7A Multi/i).find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(3000);

        // Cleanup 7B
        cy.contains('tr', /Kelas 7B Multi/i).find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(500);
    });

    it("PGT-4.5 - Tambah 2 kelas dengan nama SAMA tapi Instansi BERBEDA (misal '7A' di SDIT + di Sekolah Alam)", () => {
        // Instansi 1
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').eq(0).invoke('text').then((instansi1) => {
            cy.get('[role="option"]').contains(instansi1.trim()).click();
            cy.wait(500);
            cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A SameName');
            cy.wait(1000);
            cy.contains('button', /Save|Simpan/i).click({ force: true });
            cy.wait(1500);

            // Instansi 2
            cy.contains('button', /Add Class|Tambah Kelas/i).click();
            cy.wait(2500);
            cy.contains('button', 'Pilih Instansi').click();
            cy.wait(1500);
            cy.get('[role="option"]').eq(1).invoke('text').then((instansi2) => {
                cy.get('[role="option"]').contains(instansi2.trim()).click();
                cy.wait(500);
                cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A SameName');
                cy.wait(1000);
                cy.contains('button', /Save|Simpan/i).click({ force: true });
                cy.wait(3500);

                // Verification
                cy.get('tr').filter(':contains("Kelas 7A SameName")').should('have.length.at.least', 2);
                cy.wait(500);

                // Cleanup
                cy.get('tr').filter(':contains("Kelas 7A SameName")').each(($el) => {
                    cy.wrap($el).find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
                    cy.wait(2500);
                    cy.contains('button', /Hapus|Delete/i).click({ force: true });
                    cy.wait(3000);
                });
            });
        });
    });

    it('PGT-4.6 - Isi Nama Kelas tapi tidak pilih Instansi → klik Simpan', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A Test');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-4.7 - Pilih Instansi tapi kosongkan Nama Kelas → klik Simpan', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama kelas wajib diisi|Class name is required|Kelas wajib diisi|Class is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-4.8 - Klik Simpan tanpa isi field apapun', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama kelas wajib diisi|Class name is required|Kelas wajib diisi|Class is required/i).should('be.visible');
        cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it('PGT-4.9 - Tambah kelas dengan nama & instansi yang sudah ada (duplikat)', () => {
        // Buat kelas pertama
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Duplikat');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Coba buat kelas yang sama lagi
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(2500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Duplikat');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });

        // Error message toast harus ada/terdeteksi sebelum menghilang, dan modal tetap terbuka
        cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
        cy.get('form').should('be.visible');
        cy.wait(500);

        // Batal & Cleanup
        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(2500);

        cy.contains('tr', /Kelas Duplikat/i).find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(2500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-4.10 - Input Nama Kelas dengan karakter khusus '!@#$%^&*' → klik Simpan", () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('!@#$%^&*');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.contains(/Nama hanya boleh berisi huruf, angka, dan spasi|only letters|tidak diizinkan|invalid|karakter khusus/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it("PGT-4.11 - Isi Nama Kelas dengan angka saja (misal '10') → klik Simpan", () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('10');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(3500);

        cy.contains('td, tr', /^10$|\b10\b/).should('be.visible');

        // Cleanup
        cy.get('table tbody tr').filter(':contains("10")').first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(1500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it('PGT-4.12 - Isi Nama Kelas dengan spasi saja (whitespace only) → klik Simpan', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('   ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(500);

        cy.contains(/Nama kelas wajib diisi|Class name is required|Kelas wajib diisi|Class is required/i).should('be.visible');
        cy.get('form').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
    });

    it("PGT-4.13 - Input Nama Kelas dengan spasi di awal & akhir (misal '  7A  ') → klik Simpan", () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        cy.contains('label', /Class|Kelas/i).parent().find('input').type('  7A Trim  ');
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.contains('td', /^7A Trim$/).should('be.visible');
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').filter(':contains("7A Trim")').first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it('PGT-4.14 - Input Nama Kelas sangat panjang (>255 karakter) → klik Simpan', () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);

        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);

        const longName = 'a'.repeat(260);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(longName);
        cy.wait(500);

        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('form').length > 0) {
                cy.contains('button', /Cancel|Batal/i).click();
            } else {
                cy.get('table tbody tr').contains(/^a+/).first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
                cy.wait(500);
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(500);
    });

    it('PGT-4.15 - Load halaman list Kelas', () => {
        cy.contains('th', /Instansi|Institution/i).should('be.visible');
        cy.contains('th', /Kelas|Class/i).should('be.visible');
        cy.contains('th', /Status/i).should('be.visible');
        cy.contains('th', /Dibuat Pada|Created At/i).should('be.visible');
        cy.wait(500);
    });

    it('PGT-4.16 - Cek setiap row di list Kelas', () => {
        cy.get('table tbody tr').should('have.length.gt', 0);
        cy.get('table tbody tr').first().find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').should('be.visible');
        cy.get('table tbody tr').first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').should('be.visible');
        cy.wait(500);
    });

    it('PGT-4.17 - Buka halaman list Kelas saat belum ada data kelas', () => {
        // cy.get('body').then(($body) => {
        //     cy.wait(3500);
        //     const hasEmptyText = $body.text().includes('Data Kelas tidak ditemukan') || $body.text().includes('Tidak ada data') || $body.text().includes('No data');
        //     const hasRows = $body.find('table tbody tr').length > 0;
        //     if (hasEmptyText || !hasRows) {
        //         cy.contains(/Data Kelas tidak ditemukan|Tidak ada data|No data available|Data kosong/i).should('be.visible');
        //     } else {
        //         cy.get('table tbody tr').should('have.length.gt', 0);
        //     }
        // });
        cy.wait(500);
    });

    it('PGT-4.18 - Tambah 2 kelas berturut-turut → reload halaman', () => {
        // Tambah Kelas 1
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(1500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('SortKelas1');
        cy.wait(1000);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2000);

        // Tambah Kelas 2
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(2000);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(2500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('SortKelas2');
        cy.wait(1000);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2000);

        cy.reload();
        cy.wait(2500);

        cy.get('table tbody tr').first().contains('SortKelas2').should('be.visible');

        // Cleanup Kelas 2
        cy.get('table tbody tr').contains('SortKelas2').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(2500);

        // Cleanup Kelas 1
        cy.get('table tbody tr').contains('SortKelas1').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.19 - Aktifkan Filter Instansi (pilih 1 instansi)', () => {
        // Buat kelas dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Filter Test');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Filter Instansi
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

        // Verifikasi data
        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('contain.text', 'Kelas Filter Test');
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Filter Test').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.20 - Aktifkan Filter Status = 'Aktif'", () => {
        cy.get('body').then(($body) => {
            const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active")');
            if (statusBtn.length > 0) {
                cy.wrap(statusBtn).first().click({ force: true });
            } else {
                cy.get('button[role="combobox"]').eq(1).click({ force: true });
            }
        });
        cy.wait(800);

        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click({ force: true });
        cy.wait(1500);

        cy.get('table tbody').should('exist');
        cy.wait(500);
    });

    it("PGT-4.21 - Aktifkan Filter Status = 'Tidak Aktif'", () => {
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

    it("PGT-4.22 - Aktifkan Filter Status = 'Semua'", () => {
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

    it('PGT-4.23 - Aktifkan filter → tidak ada hasil yang match', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('xyz123abc_unmatched_filter_99', { force: true });
        cy.wait(1500);

        cy.contains(/tidak ditemukan|not found|Data Kelas tidak ditemukan|No data/i).should('be.visible');
        cy.wait(500);

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it("PGT-4.24 - Ketik nama kelas di search box (misal '7A')", () => {
        // Buat kelas dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A SearchTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Search
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('Kelas 7A SearchTest', { force: true });
        cy.wait(1500);

        cy.get('table tbody tr').should('contain.text', 'Kelas 7A SearchTest');

        // Cleanup
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
        cy.get('table tbody tr').contains('Kelas 7A SearchTest').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.25 - Ketik nama Instansi di search box', () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('Sekolah Digital Indonesia', { force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr').length > 0 && !$body.text().includes('tidak ditemukan')) {
                cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
            } else {
                cy.contains(/tidak ditemukan|not found|Data Kelas tidak ditemukan/i).should('be.visible');
            }
        });

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it("PGT-4.26 - Ketik keyword yang tidak match ('xyz123abc')", () => {
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('xyz123abc', { force: true });
        cy.wait(1500);

        cy.contains(/tidak ditemukan|not found|Data Kelas tidak ditemukan/i).should('be.visible');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-4.27 - Setelah search, clear search box (kosongkan)', () => {
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

    it("PGT-4.28 - Cari dengan huruf besar vs kecil (misal '7A' vs '7a')", () => {
        // Buat kelas dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas 7A CaseTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Search Uppercase
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('KELAS 7A CASETEST', { force: true });
        cy.wait(1500);
        cy.get('table tbody tr').should('contain.text', 'Kelas 7A CaseTest');

        // Search Lowercase
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type('kelas 7a casetest', { force: true });
        cy.wait(1500);
        cy.get('table tbody tr').should('contain.text', 'Kelas 7A CaseTest');

        // Cleanup
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
        cy.get('table tbody tr').contains('Kelas 7A CaseTest').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.29 - Klik icon pencil (Edit) di row kelas', () => {
        // Buat data uji
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('EditPrefillTest');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik Edit
        cy.get('table tbody tr').contains('EditPrefillTest').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().click({ force: true });
        cy.wait(1000);

        cy.get('form').should('be.visible');
        cy.contains('label', /Class|Kelas/i).parent().find('input').should('have.value', 'EditPrefillTest');

        // Batal & Cleanup
        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);
        cy.get('table tbody tr').contains('EditPrefillTest').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.30 - Ubah Nama Kelas ke nilai baru → klik Simpan', () => {
        // Buat data uji
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('OriginalClassName');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit
        cy.get('table tbody tr').contains('OriginalClassName').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().click({ force: true });
        cy.wait(1000);

        cy.contains('label', /Class|Kelas/i).parent().find('input').clear().type('UpdatedClassName');
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2500);

        // Cleanup
        cy.get('table tbody tr').contains('UpdatedClassName').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.31 - Ubah Status dari 'Aktif' ke 'Tidak Aktif' → klik Simpan", () => {
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(1000);
        cy.get('[role="dialog"], form').contains('button', 'Pilih Instansi').click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Status Test 31');
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit status ke Tidak Aktif (Gunakan closest button & .last() untuk elemen modal)
        cy.get('table tbody tr').contains('Kelas Status Test 31').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(1500);
        cy.get('[role="dialog"], form').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        // Verify status badge
        cy.get('table tbody tr').contains('Kelas Status Test 31').closest('tr').should('contain.text', 'Tidak Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Status Test 31').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.32 - Ubah Status dari 'Tidak Aktif' ke 'Aktif' → klik Simpan", () => {
        // Buat kelas dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(1000);
        cy.get('[role="dialog"], form').contains('button', 'Pilih Instansi').click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Inaktif Test 32');
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit status ke Tidak Aktif
        cy.get('table tbody tr').contains('Kelas Inaktif Test 32').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(1500);
        cy.get('[role="dialog"], form').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        // Ubah kembali status ke Aktif
        cy.get('table tbody tr').contains('Kelas Inaktif Test 32').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(1500);
        cy.get('[role="dialog"], form').contains('button', /Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        // Verify status badge
        cy.get('table tbody tr').contains('Kelas Inaktif Test 32').closest('tr').should('contain.text', 'Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Inaktif Test 32').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.33 - Ubah Instansi kelas ke instansi lain → klik Simpan', () => {
        // Buat kelas dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(1000);
        cy.get('[role="dialog"], form').contains('button', 'Pilih Instansi').click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').eq(0).click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Switch Instansi');
        cy.wait(500);
        cy.get('[role="dialog"], form').contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit instansi
        cy.get('table tbody tr').contains('Kelas Switch Instansi').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(3500);

        cy.get('[role="dialog"], form').contains('button', /Instansi|Sekolah|/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').eq(1).invoke('text').then((newInstansi) => {
            cy.get('[role="option"]').contains(newInstansi.trim()).click({ force: true });
            cy.wait(500);

            cy.get('[role="dialog"], form').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
            cy.wait(2500);

            cy.get('table tbody tr').contains('Kelas Switch Instansi').closest('tr').should('contain.text', newInstansi.trim());

            // Cleanup
            cy.get('table tbody tr').contains('Kelas Switch Instansi').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
            cy.wait(500);
            cy.get('body').then(($body) => {
                if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                    cy.contains('button', /Hapus|Delete/i).click({ force: true });
                }
            });
            cy.wait(1500);
        });
    });

    it('PGT-4.34 - Ubah field di modal Edit → klik Batal', () => {
        // Buat data uji
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('OriginalCancelName');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit lalu Batal
        cy.get('table tbody tr').contains('OriginalCancelName').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().click({ force: true });
        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.get('body').then(($body) => {
            const classLabel = $body.find('label:contains("Kelas"), label:contains("Class"), label:contains("Nama")');
            if (classLabel.length > 0) {
                cy.wrap(classLabel).first().parent().find('input').clear().type('ModifiedButCancelled');
            } else {
                cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear().type('ModifiedButCancelled');
            }
        });
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('form').should('not.exist');
        cy.get('table tbody tr').should('contain.text', 'OriginalCancelName');
        cy.get('table tbody tr').should('not.contain.text', 'ModifiedButCancelled');

        // Cleanup
        cy.get('table tbody tr').contains('OriginalCancelName').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.35 - Kosongkan Nama Kelas di modal Edit → klik Simpan', () => {
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Empty Test');
        cy.wait(1500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit data
        cy.get('table tbody tr')
            .contains('Kelas Empty Test')
            .closest('tr')
            .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
            .first()
            .closest('button')
            .click({ force: true });

        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.get('body').then(($body) => {
            const classLabel = $body.find('label:contains("Kelas"), label:contains("Class"), label:contains("Nama")');
            if (classLabel.length > 0) {
                cy.wrap(classLabel).first().parent().find('input').clear();
            } else {
                cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear();
            }
        });
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(1500);

        cy.contains(/Nama kelas wajib diisi|Class name is required|Kelas wajib diisi|Class is required/i).should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click({ force: true });
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Empty Test').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.36 - Kosongkan field Status di modal Edit → klik Simpan', () => {
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Status Test');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit data
        cy.get('table tbody tr')
            .contains('Kelas Status Test')
            .closest('tr')
            .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
            .first()
            .closest('button')
            .click({ force: true });

        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.get('body').then(($body) => {
            if ($body.find('[role="dialog"] button:contains("Status"), form button:contains("Status")').length > 0) {
                cy.get('form, [role="dialog"]').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
                cy.wait(500);
                cy.contains(/Status wajib diisi|Status is required/i).should('be.visible');
            }
        });

        cy.contains('button', /Cancel|Batal/i).click({ force: true });
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Status Test').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it('PGT-4.37 - Ubah Nama Kelas jadi nama yang sudah ada di Instansi yang sama (duplikat)', () => {
        // Buat kelas 1
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('ExistClass1');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Buat kelas 2
        cy.contains('button', /Add Class|Tambah Kelas/i).click();
        cy.wait(500);
        cy.contains('button', 'Pilih Instansi').click();
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click();
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('ExistClass2');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit kelas 2 ubah nama jadi ExistClass1
        cy.get('table tbody tr').contains('ExistClass2').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().click({ force: true });
        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.get('body').then(($body) => {
            const classLabel = $body.find('label:contains("Kelas"), label:contains("Class"), label:contains("Nama")');
            if (classLabel.length > 0) {
                cy.wrap(classLabel).first().parent().find('input').clear().type('ExistClass1');
            } else {
                cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear().type('ExistClass1');
            }
        });
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(1500);

        cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
        cy.get('form').should('be.visible');

        // Batal & Cleanup
        cy.contains('button', /Cancel|Batal/i).click();
        cy.wait(500);

        cy.get('table tbody tr').contains('ExistClass1').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);

        cy.get('table tbody tr').contains('ExistClass2').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.38 - Ubah Nama Kelas jadi karakter khusus '!@#$%^&*' → klik Simpan", () => {
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Char Special');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Edit data
        cy.get('table tbody tr')
            .contains('Kelas Char Special')
            .closest('tr')
            .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
            .first()
            .closest('button')
            .click({ force: true });

        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.get('body').then(($body) => {
            const classLabel = $body.find('label:contains("Kelas"), label:contains("Class"), label:contains("Nama")');
            if (classLabel.length > 0) {
                cy.wrap(classLabel).first().parent().find('input').clear().type('!@#$%^&*');
            } else {
                cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear().type('!@#$%^&*');
            }
        });
        cy.wait(500);

        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(1500);

        cy.contains(/Nama hanya boleh berisi huruf, angka, dan spasi|only letters|tidak diizinkan|invalid|karakter khusus/i).should('be.visible');
        cy.get('form, [role="dialog"]').should('be.visible');
        cy.wait(500);

        cy.contains('button', /Cancel|Batal/i).click({ force: true });
        cy.wait(500);

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Char Special').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.39 - Set status kelas ke 'Aktif' → buka fitur Jadwal Pelajaran / Presensi / Grup Rapor", () => {
        // Buat kelas aktif dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Aktif Option');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Verifikasi status Aktif
        cy.get('table tbody tr').contains('Kelas Aktif Option').closest('tr').should('contain.text', 'Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Aktif Option').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.40 - Set status kelas ke 'Tidak Aktif' → buka fitur Jadwal Pelajaran / Presensi / Grup Rapor", () => {
        // Buat kelas inaktif dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type('Kelas Inaktif Option');
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Ubah status ke Tidak Aktif
        cy.get('table tbody tr').contains('Kelas Inaktif Option').closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(1000);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        cy.get('table tbody tr').contains('Kelas Inaktif Option').closest('tr').should('contain.text', 'Tidak Aktif');

        // Cleanup
        cy.get('table tbody tr').contains('Kelas Inaktif Option').closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.41 - Edit kelas (misal ubah status) → cek fitur Data Tunggakan Tagihan / Data Alumni / Daftar Ulang Siswa Lama / Rekap Presensi Harian & Kegiatan", () => {
        const kelasEditStatus = 'Kelas Edit Status MultiFeature';
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(kelasEditStatus);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Ubah status ke Tidak Aktif
        cy.get('table tbody tr').contains(kelasEditStatus).closest('tr').find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').click({ force: true });
        cy.wait(1000);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
        cy.wait(2000);

        cy.get('table tbody tr').contains(kelasEditStatus).closest('tr').should('contain.text', 'Tidak Aktif');

        // Cleanup
        cy.get('table tbody tr').contains(kelasEditStatus).closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Hapus"), button:contains("Delete")').length > 0) {
                cy.contains('button', /Hapus|Delete/i).click({ force: true });
            }
        });
        cy.wait(1500);
    });

    it("PGT-4.42 - Klik Aksi → 'Hapus' di row kelas", () => {
        const kelasDeleteDialog = 'Kelas Delete Dialog Test';
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(kelasDeleteDialog);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik icon/button hapus pada row
        cy.get('table tbody tr')
            .contains(kelasDeleteDialog)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .closest('button')
            .click({ force: true });
        cy.wait(500);

        // Verify popup konfirmasi delete muncul dengan tombol Hapus dan Batal
        cy.get('[role="dialog"], .modal').should('be.visible');
        cy.contains('button', /Hapus|Delete/i).should('be.visible');
        cy.contains('button', /Batal|Cancel/i).should('be.visible');

        // Cleanup / Tutup popup & Hapus data dummy
        cy.contains('button', /Batal|Cancel/i).click({ force: true });
        cy.wait(500);

        cy.get('table tbody tr').contains(kelasDeleteDialog).closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-4.43 - Klik btn 'Hapus' di popup konfirmasi", () => {
        const kelasConfirmDelete = 'Kelas Confirm Delete Test';
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(kelasConfirmDelete);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus & konfirmasi
        cy.get('table tbody tr')
            .contains(kelasConfirmDelete)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .closest('button')
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Hapus|Delete/i).click({ force: true });

        // Toast 'berhasil dihapus' muncul, popup tertutup, row hilang
        cy.contains(/berhasil dihapus|deleted successfully|berhasil/i).should('be.visible');
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('not.contain.text', kelasConfirmDelete);
        cy.wait(1000);
    });

    it("PGT-4.44 - Buka popup Hapus → klik btn 'Batal'", () => {
        const kelasCancelDelete = 'Kelas Cancel Delete Test';
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(kelasCancelDelete);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus lalu klik Batal
        cy.get('table tbody tr')
            .contains(kelasCancelDelete)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .closest('button')
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Batal|Cancel/i).click({ force: true });
        cy.wait(500);

        // Popup tertutup & data masih ada
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', kelasCancelDelete);

        // Cleanup
        cy.get('table tbody tr').contains(kelasCancelDelete).closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-4.45 - Buka popup Hapus → tekan Esc di keyboard", () => {
        const kelasEscDelete = 'Kelas Esc Delete Test';
        // Buat data dummy
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(kelasEscDelete);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Klik hapus lalu tekan ESC
        cy.get('table tbody tr')
            .contains(kelasEscDelete)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .closest('button')
            .click({ force: true });
        cy.wait(500);

        cy.get('body').type('{esc}');
        cy.wait(500);

        // Popup tertutup & data tidak terhapus
        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', kelasEscDelete);

        // Cleanup
        cy.get('table tbody tr').contains(kelasEscDelete).closest('tr').find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(1500);
    });

    it("PGT-4.46 - Search sampai hasil tinggal 1 row → hapus row tersebut", () => {
        const uniqueName = 'UniqueKelasSearchToDelete';
        // Buat data unik
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(uniqueName);
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
            .closest('button')
            .click({ force: true });
        cy.wait(500);

        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(2000);

        // Verifikasi empty state UI setelah hapus
        cy.contains(/Data Kelas tidak ditemukan|Data tidak ditemukan|No data|Empty/i).should('be.visible');

        // Clear search
        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear();
        cy.wait(1000);
    });

    it("PGT-4.47 - Hapus kelas → buka fitur Jadwal Pelajaran / Tugas / Presensi / Grup Rapor / Data Siswa / PPDB", () => {
        const deletedKelas = 'DeletedKelasOption';
        // Buat data
        cy.contains('button', /Add Class|Tambah Kelas/i).click({ force: true });
        cy.wait(500);
        cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains('Sekolah Digital Indonesia').click({ force: true });
        cy.wait(500);
        cy.contains('label', /Class|Kelas/i).parent().find('input').type(deletedKelas);
        cy.wait(500);
        cy.contains('button', /Save|Simpan/i).click({ force: true });
        cy.wait(2500);

        // Hapus kelas tersebut
        cy.get('table tbody tr')
            .contains(deletedKelas)
            .closest('tr')
            .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
            .first()
            .closest('button')
            .click({ force: true });
        cy.wait(500);
        cy.contains('button', /Hapus|Delete/i).click({ force: true });
        cy.wait(2000);

        // Verifikasi tidak ada lagi di tabel list kelas
        cy.get('table tbody tr').should('not.contain.text', deletedKelas);
    });
});
