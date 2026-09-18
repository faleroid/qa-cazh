import ppdbWebPage from '../../pages/PpdbPengaturanWebPage';

describe('Pengaturan Web PPDB - E2E Full Regression Suite (AGT-7.1 - AGT-7.113)', () => {

    beforeEach(() => {
        cy.login();
        ppdbWebPage.visitPage();
    });

    afterEach(() => {
        cy.wait(1000);
    });

    it('AGT-7.1: Buka halaman Pengaturan Web PPDB', () => {
        ppdbWebPage.verifyHeaderAndDescription();
        ppdbWebPage.verifySubmenuTabsExist();
    });

    it('AGT-7.2: Buka dropdown Filter Instansi', () => {
        ppdbWebPage.openInstansiFilter();
    });

    it('AGT-7.3: Pilih 1 instansi dari dropdown Filter', () => {
        ppdbWebPage.selectInstansi('Academy Cazh');
        ppdbWebPage.verifyHeaderAndDescription();
    });

    it('AGT-7.4: Klik icon buka halaman utama PPDB (di samping filter instansi)', () => {
        ppdbWebPage.clickOpenPpdbLandingPage();
    });

    it('AGT-7.5: Cek submenu Beranda / Profil saat default load', () => {
        ppdbWebPage.verifySubmenuTabsExist();
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.switchToSubmenuTab('Beranda');
    });

    it('AGT-7.6: Upload Gambar Lembaga valid (format jpg/jpeg/png/webp, size < 1MB) → klik Simpan', () => {
        ppdbWebPage.uploadLogoValid();
        ppdbWebPage.submitForm();
    });

    it('AGT-7.7: Upload Gambar Lembaga > 1MB', () => {
        ppdbWebPage.uploadLogoOversized();
    });

    it('AGT-7.8: Upload Gambar Lembaga tipe tidak diizinkan (bukan jpg/jpeg/png/webp)', () => {
        ppdbWebPage.uploadLogoInvalidType();
    });

    it('AGT-7.9: Isi Kata Sambutan / Judul Web → klik Simpan', () => {
        ppdbWebPage.fillProfileForm('PPDB SMA Digital Indonesia 2025/2026');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.10: Cek default state checkbox / switch Info Cakupan Wilayah', () => {
        ppdbWebPage.verifyInfoCakupanWilayahState();
    });

    it('AGT-7.11: Uncheck salah satu instansi di Info Cakupan Wilayah → Simpan', () => {
        ppdbWebPage.toggleCakupanWilayahInstansi();
        ppdbWebPage.submitForm();
    });

    it('AGT-7.12: Cek section Ringkasan di Beranda (4 card summary)', () => {
        ppdbWebPage.verifyBerandaSummaryCards();
    });

    it('AGT-7.13: Cek value real-time di 4 card summary Ringkasan', () => {
        ppdbWebPage.switchToSubmenuTab('Beranda');
        ppdbWebPage.verifySummaryCardValues();
    });

    it('AGT-7.14: Cek behavior saat belum ada data pendaftar PPDB (value 0)', () => {
        ppdbWebPage.switchToSubmenuTab('Beranda');
        ppdbWebPage.verifySummaryCardValues();
    });

    it('AGT-7.15: Klik submenu Profile (Sekilas Tentang, Data Statistik, Data Kejuruan, Prestasi Terbaik)', () => {
        ppdbWebPage.verifyProfileSections();
    });

    it('AGT-7.16: Klik icon Edit di section Sejarah', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.clickEditSejarah();
    });

    it('AGT-7.17: Isi Sejarah/Visi/Misi → klik Simpan', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.fillSejarahVisiMisi('Visi Misi Sekolah Digital Indonesia');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.18: Klik icon Edit di section Visi & Misi (form terpisah)', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.clickEditSejarah();
    });

    it('AGT-7.19: Cek section Data Statistik (5 data statistik: Guru, Alumni, Siswa, Kelulusan, Prestasi)', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.verifyDataStatistikFiveMetrics();
    });

    it('AGT-7.20: Cek value auto-count untuk Total Guru/Alumni/Siswa', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.verifyDataStatistikFiveMetrics();
    });

    it('AGT-7.21: Cek value Total Kelulusan', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.verifyDataStatistikFiveMetrics();
    });

    it('AGT-7.22: Klik icon Edit di Total Prestasi (manual input)', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.clickEditTotalPrestasi();
    });

    it('AGT-7.23: Cek data statistik yang value-nya 0 di landing PPDB (conditional display)', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.verifyDataStatistikFiveMetrics();
    });

    it('AGT-7.24: Buka Profile untuk lembaga kejuruan/multi-jurusan (Section Data Kejuruan)', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.verifyDataKejuruanSection();
    });

    it('AGT-7.25: Klik icon Edit deskripsi kejuruan', () => {
        ppdbWebPage.switchToSubmenuTab('Profil');
        ppdbWebPage.clickEditSejarah();
    });

    it('AGT-7.26: Klik icon Edit ikon jurusan', () => {
        ppdbWebPage.clickEditIconJurusan();
    });

    it('AGT-7.27: Klik icon Aksi → Aktifkan Jurusan di card jurusan', () => {
        ppdbWebPage.toggleStatusJurusan('Aktifkan Jurusan');
    });

    it('AGT-7.28: Klik icon Aksi → Nonaktifkan Jurusan', () => {
        ppdbWebPage.toggleStatusJurusan('Nonaktifkan Jurusan');
    });

    it('AGT-7.29: Klik icon Aksi → Ubah PPDB di card jurusan → aktifkan PPDB per jurusan', () => {
        ppdbWebPage.togglePpdbJurusan();
    });

    it('AGT-7.30: Klik icon Tambah di section Prestasi Terbaik', () => {
        ppdbWebPage.clickTambahPrestasi();
    });

    it('AGT-7.31: Isi form Tambah Prestasi valid + upload foto valid → klik Simpan', () => {
        ppdbWebPage.clickTambahPrestasi();
        ppdbWebPage.fillPrestasiForm('Juara 1 Lomba Sains National', 'Prestasi tingkat nasional');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.32: Kosongkan salah satu required → klik Simpan', () => {
        ppdbWebPage.verifyPrestasiRequiredValidation();
    });

    it('AGT-7.33: Buka dropdown Nama Siswa di form Prestasi', () => {
        ppdbWebPage.clickTambahPrestasi();
        ppdbWebPage.openStudentDropdownPrestasi();
    });

    it('AGT-7.34: Klik icon Edit di card prestasi', () => {
        ppdbWebPage.clickEditPrestasiCard();
    });

    it('AGT-7.35: Klik icon Hapus di card prestasi → popup konfirmasi → klik Ya', () => {
        ppdbWebPage.clickDeletePrestasiCard(true);
    });

    it('AGT-7.36: Popup Hapus Prestasi → klik Tidak / Batal', () => {
        ppdbWebPage.clickDeletePrestasiCard(false);
    });

    it('AGT-7.37: Klik submenu Jadwal', () => {
        ppdbWebPage.switchToJadwalTab();
        ppdbWebPage.verifyJadwalSummarySection();
    });

    it('AGT-7.38: Cek card Total Tahapan Aktif di section Umum', () => {
        ppdbWebPage.verifyJadwalSummarySection();
    });

    it('AGT-7.39: Klik btn Tambah Jadwal di section Detail Jadwal', () => {
        ppdbWebPage.clickTambahJadwal();
    });

    it('AGT-7.40: Isi form Tambah Jadwal valid → klik Simpan', () => {
        ppdbWebPage.clickTambahJadwal();
        ppdbWebPage.fillJadwalForm('Gelombang 1 Pendaftaran PPDB 2026');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.41: Kosongkan salah satu required di form Tambah Jadwal', () => {
        ppdbWebPage.verifyJadwalRequiredValidation();
    });

    it('AGT-7.42: Tanggal Mulai > Tanggal Selesai → klik Simpan', () => {
        ppdbWebPage.fillJadwalInvalidDates();
    });

    it('AGT-7.43: Klik btn Ubah Jadwal → dropdown pilih jadwal yang mau diubah → klik Ubah', () => {
        ppdbWebPage.clickUbahJadwal();
    });

    it('AGT-7.44: Klik btn Hapus Jadwal → popup konfirmasi → klik Ya', () => {
        ppdbWebPage.clickHapusJadwal(true);
    });

    it('AGT-7.45: Popup Hapus Jadwal → klik Tidak / Batal', () => {
        ppdbWebPage.clickHapusJadwal(false);
    });

    it('AGT-7.46: Cek 4 card hasil pendaftaran di section Detail Jadwal', () => {
        ppdbWebPage.verifyDetailJadwalCards();
    });

    it('AGT-7.47: Klik tab Tahapan di section Detail Jadwal', () => {
        ppdbWebPage.clickTabTahapan();
    });

    it('AGT-7.48: Cek chart Tahapan real-time', () => {
        ppdbWebPage.verifyChartTahapanRealtime();
    });

    it('AGT-7.49: Klik submenu Alur & Testimoni', () => {
        ppdbWebPage.switchToAlurTestimoniTab();
    });

    it('AGT-7.50: Cek jumlah baris di section Alur PPDB', () => {
        ppdbWebPage.verifyAlurPpdbSixRowsFixed();
    });

    it('AGT-7.51: Klik icon Edit di salah satu baris Alur PPDB', () => {
        ppdbWebPage.clickEditAlurPpdb();
    });

    it('AGT-7.52: Isi form Edit Alur valid → klik Simpan', () => {
        ppdbWebPage.clickEditAlurPpdb();
        ppdbWebPage.fillAlurForm('Pendaftaran Online 2026', 'Isi data formulir secara online');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.53: Kosongkan salah satu required di Edit Alur', () => {
        ppdbWebPage.verifyAlurRequiredValidation();
    });

    it('AGT-7.54: Ubah Nomor Urutan jadi angka yang SUDAH ADA di baris lain → klik Simpan', () => {
        ppdbWebPage.fillAlurDuplicateOrder();
    });

    it('AGT-7.55: Klik btn Kembali di form Edit Alur', () => {
        ppdbWebPage.clickEditAlurPpdb();
        ppdbWebPage.clickKembaliAlurForm();
    });

    it('AGT-7.56: Cek section Testimoni saat belum ada data', () => {
        ppdbWebPage.verifyTestimoniEmptyState();
    });

    it('AGT-7.57: Klik btn Tambah Testimoni', () => {
        ppdbWebPage.clickTambahTestimoni();
    });

    it('AGT-7.58: Buka dropdown Nama Alumni di form Testimoni', () => {
        ppdbWebPage.clickTambahTestimoni();
        ppdbWebPage.openNamaAlumniDropdown();
    });

    it('AGT-7.59: Isi form Tambah Testimoni valid + upload foto valid → klik Simpan', () => {
        ppdbWebPage.clickTambahTestimoni();
        ppdbWebPage.fillTestimoniForm('Budi Alumni', 'Fasilitas sangat memuaskan');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.60: Kosongkan salah satu required di form Testimoni', () => {
        ppdbWebPage.verifyTestimoniRequiredValidation();
    });

    it('AGT-7.61: Klik icon Aksi → Ubah di card testimoni', () => {
        ppdbWebPage.clickEditTestimoni();
    });

    it('AGT-7.62: Klik icon Aksi → Hapus di card testimoni → popup konfirmasi → klik Ya', () => {
        ppdbWebPage.clickDeleteTestimoni(true);
    });

    it('AGT-7.63: Klik icon Tampilkan/Sembunyikan di card testimoni', () => {
        ppdbWebPage.toggleVisibilityTestimoni();
    });

    it('AGT-7.64: Klik submenu Kontak & Alamat', () => {
        ppdbWebPage.switchToKontakAlamatTab();
    });

    it('AGT-7.65: Isi form Kontak PPDB (Nomor Whatsapp Admin, Email Admin, Instansi) → klik Simpan', () => {
        ppdbWebPage.fillKontakPpdbForm('081234567890', 'admin.ppdb@cazh.id');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.66: Kosongkan salah satu required di form Kontak PPDB', () => {
        ppdbWebPage.verifyKontakRequiredValidation();
    });

    it('AGT-7.67: Isi Email Admin dengan format tidak valid', () => {
        ppdbWebPage.fillInvalidEmailKontak();
    });

    it('AGT-7.68: Isi Nomor Whatsapp Admin tidak dimulai 08 atau 62', () => {
        ppdbWebPage.fillInvalidWaKontak();
    });

    it('AGT-7.69: Cek section Alamat Instansi', () => {
        ppdbWebPage.verifyAlamatInstansiSection();
    });

    it('AGT-7.70: Klik icon Edit di row Alamat Instansi', () => {
        ppdbWebPage.clickEditAlamatInstansi();
    });

    it('AGT-7.71: Set lokasi pin di Google Map + klik Simpan', () => {
        ppdbWebPage.setPinLocationGoogleMap();
    });

    it('AGT-7.72: Buka halaman Kontak & Alamat untuk lembaga SMA/MA', () => {
        ppdbWebPage.verifySosialMediaVisibility(true);
    });

    it('AGT-7.73: Buka halaman Kontak & Alamat untuk lembaga selain SMA/MA', () => {
        ppdbWebPage.verifySosialMediaVisibility(false);
    });

    it('AGT-7.74: Klik btn Tambah Sosial Media', () => {
        ppdbWebPage.clickTambahSosialMedia();
    });

    it('AGT-7.75: Isi form Tambah Sosial Media valid → klik Simpan', () => {
        ppdbWebPage.clickTambahSosialMedia();
        ppdbWebPage.fillSosialMediaForm('Instagram', 'https://instagram.com/cazh.id');
        ppdbWebPage.submitForm();
    });

    it('AGT-7.76: Kosongkan required (Nama atau URL) → klik Simpan', () => {
        ppdbWebPage.verifySosialMediaRequiredValidation();
    });

    it('AGT-7.77: Klik btn Edit di card sosial media', () => {
        ppdbWebPage.clickEditSosialMedia();
    });

    it('AGT-7.78: Klik btn Hapus di card sosial media → popup konfirmasi → klik Ya', () => {
        ppdbWebPage.clickDeleteSosialMedia(true);
    });

    it('AGT-7.79: Klik submenu Formulir', () => {
        ppdbWebPage.switchToFormulirTab();
    });

    it('AGT-7.80: Cek tab yang tampil untuk lembaga NON-kejuruan', () => {
        ppdbWebPage.verifyFormulirTabs(false);
    });

    it('AGT-7.81: Cek tab yang tampil untuk lembaga KEJURUAN', () => {
        ppdbWebPage.verifyFormulirTabs(true);
    });

    it('AGT-7.82: Cek section-section di dalam Tab Semua Formulir', () => {
        ppdbWebPage.verifyFormulirEightSections();
    });

    it('AGT-7.83: Klik section Alur PPDB di Formulir', () => {
        ppdbWebPage.clickSectionAlurPpdbFormulir();
    });

    it('AGT-7.84: Cek field di section Data Anak', () => {
        ppdbWebPage.verifySectionDataAnakFields();
    });

    it('AGT-7.85: Cek field di section Data Alamat', () => {
        ppdbWebPage.verifySectionDataAlamatFields();
    });

    it('AGT-7.86: Cek field di section Data Wali Anak', () => {
        ppdbWebPage.verifySectionDataWaliAnakFields();
    });

    it('AGT-7.87: Cek field di section Data Orang Tua', () => {
        ppdbWebPage.verifySectionDataOrangTuaFields();
    });

    it('AGT-7.88: Cek field di section Formulir Kesehatan', () => {
        ppdbWebPage.verifySectionFormulirKesehatanFields();
    });

    it('AGT-7.89: Cek field di section Data Program', () => {
        ppdbWebPage.verifySectionDataProgramFields();
    });

    it('AGT-7.90: Cek section Dokumen', () => {
        ppdbWebPage.verifySectionDokumenConfig();
    });

    it('AGT-7.91: Cek 3 toggle per field di setiap section', () => {
        ppdbWebPage.verifyFormulirThreeControlsPerField();
    });

    it('AGT-7.92: Toggle Tampilkan salah satu field ke OFF → klik Simpan', () => {
        ppdbWebPage.toggleFieldTampilkan(false);
        ppdbWebPage.submitFormulirConfig();
    });

    it('AGT-7.93: Toggle Wajib salah satu field ke ON → cek form pendaftaran PPDB', () => {
        ppdbWebPage.toggleFieldWajib(true);
    });

    it('AGT-7.94: Toggle Wajib ke OFF pada field yang tadinya required', () => {
        ppdbWebPage.toggleFieldWajibOff();
    });

    it('AGT-7.95: Klik icon Edit Label pada field → isi label baru → klik Simpan', () => {
        ppdbWebPage.editFieldLabel('Nama Lengkap Siswa Kustom');
        ppdbWebPage.submitFormulirConfig();
    });

    it('AGT-7.96: Verifikasi kustomisasi field per tab jurusan', () => {
        ppdbWebPage.verifyJurusanFieldCustomization();
    });

    it('AGT-7.97: Klik btn Simpan di halaman Formulir', () => {
        ppdbWebPage.submitFormulirConfig();
    });

    it('AGT-7.98: Klik tab Analytic di halaman Pengaturan Web PPDB', () => {
        ppdbWebPage.switchToAnalyticTab();
    });

    it('AGT-7.99: Cek 4 cards visitor di top tab Analytic', () => {
        ppdbWebPage.verifyAnalyticFourVisitorCards();
    });

    it('AGT-7.100: Buka landingpage SPMB dari incognito baru, kembali ke tab Analytic dan refresh', () => {
        ppdbWebPage.simulateIncognitoVisitor();
    });

    it('AGT-7.101: Buka landingpage SPMB 2x dari device/IP yang sama, refresh tab Analytic', () => {
        ppdbWebPage.simulateSameDeviceVisitorTwice();
    });

    it('AGT-7.102: Cek nilai card Visitor This Month', () => {
        ppdbWebPage.verifyVisitorThisMonthValue();
    });

    it('AGT-7.103: Cek nilai card Unique Visitor This Month', () => {
        ppdbWebPage.verifyUniqueVisitorThisMonthValue();
    });

    it('AGT-7.104: Cek chart Tren Pengunjung — tipe & data', () => {
        ppdbWebPage.verifyChartTrenPengunjung();
    });

    it('AGT-7.105: Cek default range chart Tren Pengunjung saat pertama load', () => {
        ppdbWebPage.verifyDefaultRangeThirtyDaysChart();
    });

    it('AGT-7.106: Klik filter Range Date di chart Tren Pengunjung', () => {
        ppdbWebPage.openRangeDatePickerChart();
    });

    it('AGT-7.107: Set filter Range Date = 7 hari terakhir, apply', () => {
        ppdbWebPage.applyRangeDateLastSevenDays();
    });

    it('AGT-7.108: Set filter Range Date custom (mis. 01-Jan-2026 s/d 15-Jan-2026), apply', () => {
        ppdbWebPage.applyCustomRangeDate('2026-01-01', '2026-01-15');
    });

    it('AGT-7.109: Set filter Range Date dengan End Date < Start Date', () => {
        ppdbWebPage.applyInvalidRangeDate();
    });

    it('AGT-7.110: Set filter Range Date dengan End Date > hari ini (future date)', () => {
        ppdbWebPage.applyFutureRangeDate();
    });

    it('AGT-7.111: Hover titik data di line chart', () => {
        ppdbWebPage.hoverChartDataPoint();
    });

    it('AGT-7.112: Cek behavior tab Analytic untuk Instansi baru yang belum ada visitor', () => {
        ppdbWebPage.verifyNewInstansiAnalyticEmptyState();
    });

    it('AGT-7.113: Ganti filter Instansi di top page → cek data Analytic', () => {
        ppdbWebPage.verifyAnalyticDataRefreshedOnInstansiChange();
    });

});
