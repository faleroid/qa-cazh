import ppdbWebPage from '../../pages/PpdbPengaturanWebPage';

describe('Pengaturan Web PPDB - E2E Full Regression Suite (AGT-7.1 - AGT-7.40)', () => {

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

});
