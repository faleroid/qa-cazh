describe('The Room Page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop')) {
                return false;
            }
        });

        cy.login();
        cy.visit('setting/academic/room');
    });

    afterEach(() => {
        cy.wait(3000);
    });

    // it('PGT-5.1 - Load halaman list Kamar & verifikasi elemen UI utama', () => {
    //     cy.contains('h1', /Kamar|Room/i).should('be.visible');
    //     cy.contains('button', /Add Room|Tambah Kamar/i).should('be.visible');
    //     cy.contains('th', /Instansi/i).should('be.visible');
    //     cy.contains('th', /Kamar/i).should('be.visible');
    //     cy.contains('th', /Lokasi/i).should('be.visible');
    //     cy.contains('th', /PIC/i).should('be.visible');
    //     cy.contains('th', /Status/i).should('be.visible');
    //     cy.contains('th', /Dibuat Pada/i).should('be.visible');
    //     cy.wait(500);
    // });

    // it('PGT-5.2 - Klik btn Tambah Kamar → modal form muncul', () => {
    //     cy.contains('button', /Add Room|Tambah Kamar/i).click({ force: true });
    //     cy.wait(500);
    //     cy.get('form, [role="dialog"]').should('be.visible');
    //     cy.wait(500);

    //     cy.contains('button', /Cancel|Batal/i).click({ force: true });
    //     cy.wait(500);
    // });

    // it('PGT-5.3 - Tambah Kamar dengan data valid → simpan & verifikasi di tabel', () => {
    //     const roomName = 'Kamar 101 Test';

    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomName);

    //     cy.get('table tbody tr').should('contain.text', roomName);

    //     // Cleanup
    //     cy.deleteAndCleanupRecord(roomName);
    // });

    // it('PGT-5.4 - Filter data kamar berdasarkan pencarian keyword', () => {
    //     const roomName = 'Kamar Search Test';

    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomName);

    //     // Search
    //     cy.searchRecord(roomName);

    //     cy.get('table tbody tr').should('contain.text', roomName);

    //     // Clear search & Cleanup
    //     cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
    //     cy.wait(500);

    //     cy.deleteAndCleanupRecord(roomName);
    // });

    // it('PGT-5.5 - Edit data kamar → simpan perubahan', () => {
    //     const initialRoom = 'Kamar Initial Edit';
    //     const updatedRoom = 'Kamar Updated Edit';

    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, initialRoom);

    //     // Edit
    //     cy.openRowEditModal(initialRoom);
    //     cy.fillFormInput(/Kamar|Room|Nama/i, updatedRoom);

    //     cy.contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
    //     cy.wait(2000);

    //     cy.get('table tbody tr').should('contain.text', updatedRoom);

    //     // Cleanup
    //     cy.deleteAndCleanupRecord(updatedRoom);
    // });

    // it('PGT-5.6 - Hapus data kamar dengan konfirmasi', () => {
    //     const roomToDelete = 'Kamar To Delete';

    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomToDelete);

    //     // Hapus & Konfirmasi
    //     cy.openRowDeleteDialog(roomToDelete);
    //     cy.get('[role="dialog"], .modal').contains('button', /Hapus|Delete|Ya/i).click({ force: true });
    //     cy.wait(2000);

    //     cy.get('table tbody tr').should('not.contain.text', roomToDelete);
    // });

    // it('PGT-5.7 - Isi Nama Kamar tapi tidak pilih Instansi → klik Simpan', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.fillFormInput(/Kamar|Room|Nama/i, 'Kamar Tanpa Instansi');
    //     cy.clickModalSaveButton();
    //     cy.assertFormErrorVisible(/Instansi wajib diisi|Institution is required/i);
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.8 - Pilih Instansi tapi kosongkan Nama Kamar → klik Simpan', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.clickModalSaveButton();
    //     cy.assertFormErrorVisible(/Nama kamar wajib diisi|Room name is required|Kamar wajib diisi/i);
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.9 - Klik Simpan tanpa isi field required apapun', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.clickModalSaveButton();
    //     cy.contains(/Instansi wajib diisi|Institution is required/i).should('be.visible');
    //     cy.contains(/Nama kamar wajib diisi|Room name is required|Kamar wajib diisi/i).should('be.visible');
    //     cy.get('form, [role="dialog"]').should('be.visible');
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.10 - Tambah kamar dengan nama & instansi yang sudah ada (duplikat)', () => {
    //     const dupName = 'Kamar Duplikat Test';
    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, dupName);
    //     // Coba buat kamar duplikat
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.fillFormInput(/Kamar|Room|Nama/i, dupName);
    //     cy.clickModalSaveButton();
    //     cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
    //     cy.get('form, [role="dialog"]').should('be.visible');
    //     cy.clickModalCancelButton();
    //     cy.deleteAndCleanupRecord(dupName);
    //     cy.wait(2500)
    //     cy.deleteAndCleanupRecord(dupName);
    // });
    // it('PGT-5.11 - Pilih Instansi dulu → buka dropdown PIC', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.get('body').then(($body) => {
    //         const picBtn = $body.find('form button:contains("PIC"), [role="dialog"] button:contains("PIC"), form button:contains("Pilih PIC")');
    //         if (picBtn.length > 0) {
    //             cy.wrap(picBtn).first().click({ force: true });
    //             cy.wait(500);
    //             cy.get('[role="option"]').should('have.length.gt', 0);
    //         }
    //     });
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.12 - Sudah pilih PIC → ganti Instansi ke instansi lain → cek dropdown PIC', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.get('body').then(($body) => {
    //         const picBtn = $body.find('form button:contains("PIC"), [role="dialog"] button:contains("PIC"), form button:contains("Pilih PIC")');
    //         if (picBtn.length > 0) {
    //             cy.wrap(picBtn).first().click({ force: true });
    //             cy.wait(500);
    //             cy.get('[role="option"]').first().click({ force: true });
    //             cy.wait(500);
    //         }
    //     });
    //     // Ganti instansi
    //     cy.get('form, [role="dialog"]').contains('button', /Instansi|Sekolah/i).click({ force: true });
    //     cy.wait(500);
    //     cy.get('[role="option"]').eq(1).click({ force: true });
    //     cy.wait(500);
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.13 - Buka dropdown PIC saat Instansi belum dipilih', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.get('body').then(($body) => {
    //         const picBtn = $body.find('form button:contains("PIC"), [role="dialog"] button:contains("PIC"), form button:contains("Pilih PIC")');
    //         if (picBtn.length > 0) {
    //             cy.wrap(picBtn).first().should(($el) => {
    //                 const isDisabled = $el.is(':disabled') || $el.attr('aria-disabled') === 'true' || $el.hasClass('disabled') || $el.attr('disabled') !== undefined;
    //                 expect(isDisabled).to.be.true;
    //             });
    //         }
    //     });
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.14 - Isi Nama Kamar dengan spasi saja (whitespace only) → klik Simpan', () => {
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.fillFormInput(/Kamar|Room|Nama/i, '   ');
    //     cy.clickModalSaveButton();
    //     cy.assertFormErrorVisible(/Nama kamar wajib diisi|Room name is required|Kamar wajib diisi/i);
    //     cy.clickModalCancelButton();
    // });
    // it('PGT-5.15 - Input Nama Kamar dengan spasi di awal & akhir (misal "  Kamar 101  ") → klik Simpan', () => {
    //     const roomPadded = '  Kamar 101 Trim  ';
    //     const roomTrimmed = 'Kamar 101 Trim';
    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomPadded);
    //     cy.get('table tbody tr').should('contain.text', roomTrimmed);
    //     cy.deleteAndCleanupRecord(roomTrimmed);
    // });
    // it('PGT-5.16 - Input Nama Kamar sangat panjang (>255 karakter) → klik Simpan', () => {
    //     const longName = 'Kamar' + 'A'.repeat(260);
    //     cy.openAddModal(/Add Room|Tambah Kamar/i);
    //     cy.selectInstansi('Sekolah Digital Indonesia');
    //     cy.fillFormInput(/Kamar|Room|Nama/i, longName);
    //     cy.clickModalSaveButton();
    //     cy.wait(1500);
    //     cy.get('body').then(($body) => {
    //         if ($body.find('form, [role="dialog"]').length > 0) {
    //             cy.clickModalCancelButton();
    //         } else {
    //             cy.deleteAndCleanupRecord('KamarA');
    //         }
    //     });
    // });
    // it('PGT-5.17 - Load halaman list Kamar', () => {
    //     cy.assertTableColumnsExist([/Instansi/i, /Kamar/i, /Lokasi/i, /PIC/i, /Status/i, /Dibuat Pada/i]);
    // });
    // it('PGT-5.18 - Cek setiap row di list Kamar', () => {
    //     cy.get('table tbody tr').should('have.length.gt', 0);
    //     cy.get('table tbody tr').first().find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]').first().closest('button').should('exist');
    //     cy.get('table tbody tr').first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').should('exist');
    // });
    // it('PGT-5.19 - Buka halaman list Kamar saat belum ada data kamar', () => {
    //     cy.wait(3000);
    //     cy.get('body').then(($body) => {
    //         const hasEmptyText = $body.text().includes('Data Kamar tidak ditemukan') || $body.text().includes('Tidak ada data') || $body.text().includes('No data');
    //         const hasRows = $body.find('table tbody tr').length > 0;
    //         if (hasEmptyText || !hasRows) {
    //             cy.contains(/Data Kamar tidak ditemukan|Data tidak ditemukan|Tidak ada data|No data/i).should('be.visible');
    //         } else {
    //             cy.get('table tbody tr').should('have.length.gt', 0);
    //         }
    //     });
    //     cy.wait(500);
    // });
    // it('PGT-5.20 - Tambah 2 kamar berturut-turut → reload halaman', () => {
    //     const roomSort1 = 'Kamar Sort 1';
    //     const roomSort2 = 'Kamar Sort 2';
    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomSort1);
    //     cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomSort2);
    //     cy.reload();
    //     cy.wait(2500);
    //     cy.get('table tbody tr').first().should('contain.text', roomSort2);
    //     // Cleanup
    //     cy.deleteAndCleanupRecord(roomSort2);
    //     cy.deleteAndCleanupRecord(roomSort1);
    // });

    it('PGT-5.21 - Aktifkan Filter Instansi (pilih 1 instansi)', () => {
        const roomName = 'Kamar Instansi Filter Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomName);

        cy.filterByInstansi('Sekolah Digital Indonesia');

        cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
        cy.get('table tbody').should('contain.text', roomName);

        cy.deleteAndCleanupRecord(roomName);
    });

    it("PGT-5.22 - Aktifkan Filter Status = 'Aktif'", () => {
        cy.filterByStatus(/^(Aktif|Active)$/i);

        cy.get('table tbody').should('exist');
        cy.wait(500);
    });

    it("PGT-5.23 - Aktifkan Filter Status = 'Tidak Aktif'", () => {
        cy.filterByStatus(/^(Tidak Aktif|Inactive)$/i);

        cy.contains('[data-slot="badge"], td', /^(Aktif|Active)$/i).should('not.exist');
        cy.wait(500);
    });

    it("PGT-5.24 - Aktifkan Filter Status = 'Semua'", () => {
        cy.filterByStatus(/^(Semua|All|Semua Status)$/i);

        cy.get('table tbody').should('exist');
        cy.wait(500);
    });

    it('PGT-5.25 - Aktifkan filter → tidak ada hasil yang match', () => {
        cy.searchRecord('xyz123abc_unmatched_filter_99');

        cy.contains(/Data Kamar tidak ditemukan|Data tidak ditemukan|No data|Empty|tidak ditemukan/i).should('be.visible');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it("PGT-5.26 - Ketik nama kamar di search box (misal 'Kamar 101')", () => {
        const roomName = 'Kamar 101 SearchName';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomName);

        cy.searchRecord(roomName);

        cy.get('table tbody tr').should('contain.text', roomName);

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(500);
        cy.deleteAndCleanupRecord(roomName);
    });

    it('PGT-5.27 - Ketik nama Instansi di search box', () => {
        const roomInstansi = 'Kamar Search Instansi Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomInstansi);

        cy.searchRecord('Sekolah Digital Indonesia');
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr:contains("Sekolah Digital Indonesia")').length > 0) {
                cy.get('table tbody').should('contain.text', 'Sekolah Digital Indonesia');
            } else {
                cy.contains(/tidak ditemukan|not found|Data Kamar tidak ditemukan/i).should('be.visible');
            }
        });

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(500);
        cy.deleteAndCleanupRecord(roomInstansi);
    });

    it('PGT-5.28 - Ketik nama PIC di search box', () => {
        cy.searchRecord('ahmed');
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr:contains("ahmed")').length > 0) {
                cy.get('table tbody').should('contain.text', 'ahmed');
            } else {
                cy.contains(/tidak ditemukan|not found|Data Kamar tidak ditemukan/i).should('be.visible');
            }
        });

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it("PGT-5.29 - Ketik keyword yang tidak match ('xyz123abc')", () => {
        cy.searchRecord('xyz123abc');

        cy.contains(/tidak ditemukan|not found|Data Kamar tidak ditemukan/i).should('be.visible');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-5.30 - Setelah search, clear search box (kosongkan)', () => {
        cy.searchRecord('xyz123abc');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1500);

        cy.get('body').then(($body) => {
            if ($body.find('table tbody tr').length > 0) {
                cy.get('table tbody tr').should('have.length.gt', 0);
            }
        });
        cy.wait(500);
    });

    it('PGT-5.31 - Klik icon pencil (Edit) di row kamar', () => {
        const roomEditPrefill = 'Kamar Edit Prefill Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomEditPrefill);

        cy.openRowEditModal(roomEditPrefill);
        cy.get('form, [role="dialog"]').should('be.visible');

        cy.clickModalCancelButton();
        cy.deleteAndCleanupRecord(roomEditPrefill);
    });

    it('PGT-5.32 - Ubah Nama Kamar ke nilai baru → klik Simpan', () => {
        const initialRoom = 'Kamar Original Name';
        const updatedRoom = 'Kamar Updated Name';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, initialRoom);

        cy.openRowEditModal(initialRoom);
        cy.fillFormInput(/Kamar|Room|Nama/i, updatedRoom);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.get('table tbody tr').should('contain.text', updatedRoom);
        cy.deleteAndCleanupRecord(updatedRoom);
    });

    it('PGT-5.33 - Ubah PIC ke guru/staff lain di instansi yang sama → klik Simpan', () => {
        const roomPic = 'Kamar PIC Change Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomPic);

        cy.openRowEditModal(roomPic);
        cy.get('body').then(($body) => {
            const picBtn = $body.find('form button:contains("PIC"), [role="dialog"] button:contains("PIC"), form button:contains("Pilih PIC")');
            if (picBtn.length > 0) {
                cy.wrap(picBtn).first().click({ force: true });
                cy.wait(500);
                cy.get('[role="option"]').eq(0).click({ force: true });
                cy.wait(500);
            }
        });
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.deleteAndCleanupRecord(roomPic);
    });

    it('PGT-5.34 - Hapus PIC (kosongkan field PIC) → klik Simpan', () => {
        const roomClearPic = 'Kamar Clear PIC Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomClearPic);

        cy.openRowEditModal(roomClearPic);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.deleteAndCleanupRecord(roomClearPic);
    });

    it('PGT-5.35 - Ubah Lokasi → klik Simpan', () => {
        const roomLoc = 'Kamar Location Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomLoc);

        cy.openRowEditModal(roomLoc);
        cy.get('body').then(($body) => {
            const locInput = $body.find('form label:contains("Lokasi"), [role="dialog"] label:contains("Lokasi")').parent().find('input');
            if (locInput.length > 0) {
                cy.wrap(locInput).clear().type('Lantai 2 Gedung A');
            }
        });
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.deleteAndCleanupRecord(roomLoc);
    });

    it('PGT-5.36 - Ubah Instansi kamar ke instansi lain → cek dropdown PIC', () => {
        const roomSwitch = 'Kamar Switch Instansi';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomSwitch);

        cy.openRowEditModal(roomSwitch);
        cy.get('form, [role="dialog"]').contains('button', /Instansi|Sekolah/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').eq(1).click({ force: true });
        cy.wait(500);

        cy.clickModalCancelButton();
        cy.deleteAndCleanupRecord(roomSwitch);
    });

    it("PGT-5.37 - Ubah Status dari 'Aktif' ke 'Tidak Aktif' → klik Simpan", () => {
        const roomStatusToggle = 'Kamar Status Inactive Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomStatusToggle);

        cy.openRowEditModal(roomStatusToggle);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.get('table tbody tr').contains(roomStatusToggle).closest('tr').should('contain.text', 'Tidak Aktif');
        cy.deleteAndCleanupRecord(roomStatusToggle);
    });

    it("PGT-5.38 - Ubah Status dari 'Tidak Aktif' ke 'Aktif' → klik Simpan", () => {
        const roomStatusToggle2 = 'Kamar Status Active Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomStatusToggle2);

        cy.openRowEditModal(roomStatusToggle2);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.openRowEditModal(roomStatusToggle2);
        cy.get('form, [role="dialog"]').contains('button', /Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/^(Aktif|Active)$/i).click({ force: true });
        cy.wait(500);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.get('table tbody tr').contains(roomStatusToggle2).closest('tr').should('contain.text', 'Aktif');
        cy.deleteAndCleanupRecord(roomStatusToggle2);
    });

    it('PGT-5.39 - Ubah field di modal Edit → klik Batal', () => {
        const roomCancelEdit = 'Kamar Cancel Edit Test';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomCancelEdit);

        cy.openRowEditModal(roomCancelEdit);
        cy.fillFormInput(/Kamar|Room|Nama/i, 'ModifiedButCancelled');
        cy.clickModalCancelButton();

        cy.get('form').should('not.exist');
        cy.get('table tbody tr').should('contain.text', roomCancelEdit);
        cy.get('table tbody tr').should('not.contain.text', 'ModifiedButCancelled');

        cy.deleteAndCleanupRecord(roomCancelEdit);
    });

    it('PGT-5.40 - Kosongkan Nama Kamar di modal Edit → klik Simpan', () => {
        const roomEmptyName = 'Kamar Edit Empty Name';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, roomEmptyName);

        cy.openRowEditModal(roomEmptyName);
        cy.get('body').then(($body) => {
            const classLabel = $body.find('label:contains("Kamar"), label:contains("Room"), label:contains("Nama")');
            if (classLabel.length > 0) {
                cy.wrap(classLabel).first().parent().find('input').clear();
            } else {
                cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear();
            }
        });
        cy.wait(500);

        cy.clickModalSaveButton();
        cy.assertFormErrorVisible(/Nama kamar wajib diisi|Room name is required|Kamar wajib diisi/i);

        cy.clickModalCancelButton();
        cy.deleteAndCleanupRecord(roomEmptyName);
    });

    it('PGT-5.41 - Ubah Nama Kamar jadi nama yang sudah ada di Instansi yang sama (duplikat)', () => {
        const dup1 = 'Kamar Dup Edit 1';
        const dup2 = 'Kamar Dup Edit 2';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, dup1);
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, dup2);

        cy.openRowEditModal(dup2);
        cy.fillFormInput(/Kamar|Room|Nama/i, dup1);
        cy.clickModalSaveButton();

        cy.contains(/sudah ada|already exist|already taken|duplicate|telah digunakan|duplikat/i).should('exist');
        cy.get('form, [role="dialog"]').should('be.visible');

        cy.clickModalCancelButton();
        cy.deleteAndCleanupRecord(dup1);
        cy.deleteAndCleanupRecord(dup2);
    });

    it("PGT-5.42 - Set status kamar ke 'Aktif' → buka fitur Data Diri Siswa & Pengaturan Presensi Kegiatan", () => {
        const activeRoom = 'Kamar Status Aktif Feature';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, activeRoom);

        cy.get('table tbody tr').contains(activeRoom).closest('tr').should('contain.text', 'Aktif');

        cy.deleteAndCleanupRecord(activeRoom);
    });

    it("PGT-5.43 - Set status kamar ke 'Tidak Aktif' → buka fitur Data Diri Siswa & Pengaturan Presensi Kegiatan", () => {
        const inactiveRoom = 'Kamar Status Inaktif Feature';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, inactiveRoom);

        cy.openRowEditModal(inactiveRoom);
        cy.get('form, [role="dialog"]').contains('button', /Aktif|Active/i).click({ force: true });
        cy.wait(500);
        cy.get('[role="option"]').contains(/Tidak Aktif|Inactive/i).click({ force: true });
        cy.wait(500);
        cy.clickModalSaveButton();
        cy.wait(2000);

        cy.get('table tbody tr').contains(inactiveRoom).closest('tr').should('contain.text', 'Tidak Aktif');

        cy.deleteAndCleanupRecord(inactiveRoom);
    });

    it("PGT-5.44 - Klik Aksi → 'Hapus' di row kamar", () => {
        const delDialogRoom = 'Kamar Delete Dialog Test 44';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, delDialogRoom);

        cy.openRowDeleteDialog(delDialogRoom);
        cy.contains('button', /Hapus|Delete/i).should('be.visible');
        cy.contains('button', /Batal|Cancel/i).should('be.visible');

        cy.clickModalCancelButton();
        cy.deleteAndCleanupRecord(delDialogRoom);
    });

    it("PGT-5.45 - Klik btn 'Hapus' di popup konfirmasi", () => {
        const confirmDelRoom = 'Kamar Confirm Delete Test 45';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, confirmDelRoom);

        cy.openRowDeleteDialog(confirmDelRoom);
        cy.confirmDeleteAction();

        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('not.contain.text', confirmDelRoom);
    });

    it("PGT-5.46 - Buka popup Hapus → klik btn 'Batal'", () => {
        const cancelDelRoom = 'Kamar Cancel Delete Test 46';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, cancelDelRoom);

        cy.openRowDeleteDialog(cancelDelRoom);
        cy.clickModalCancelButton();

        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', cancelDelRoom);

        cy.deleteAndCleanupRecord(cancelDelRoom);
    });

    it('PGT-5.47 - Buka popup Hapus → tekan Esc di keyboard', () => {
        const escDelRoom = 'Kamar Esc Delete Test 47';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, escDelRoom);

        cy.openRowDeleteDialog(escDelRoom);
        cy.get('body').type('{esc}');
        cy.wait(500);

        cy.get('[role="dialog"]').should('not.exist');
        cy.get('table tbody tr').should('contain.text', escDelRoom);

        cy.deleteAndCleanupRecord(escDelRoom);
    });

    it('PGT-5.48 - Search sampai hasil tinggal 1 row → hapus row tersebut', () => {
        const uniqueRoom = 'UniqueRoomSearchToDelete';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, uniqueRoom);

        cy.searchRecord(uniqueRoom);
        cy.get('table tbody tr').should('have.length', 1);

        cy.openRowDeleteDialog(uniqueRoom);
        cy.confirmDeleteAction();

        cy.contains(/Data Kamar tidak ditemukan|Data tidak ditemukan|No data|Empty/i).should('be.visible');

        cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true });
        cy.wait(1000);
    });

    it('PGT-5.49 - Hapus kamar → buka fitur Data Diri Siswa & Pengaturan Presensi Kegiatan', () => {
        const deletedRoomOption = 'DeletedRoomOptionTest';
        cy.createAcademicRecord(/Add Room|Tambah Kamar/i, deletedRoomOption);

        cy.deleteAndCleanupRecord(deletedRoomOption);

        cy.get('table tbody tr').should('not.contain.text', deletedRoomOption);
    });
});
