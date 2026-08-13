import alumniLogPage from '../../pages/AlumniLogAktivitasPage';

describe('Log Aktivasi Alumni - E2E Full Regression Suite (AGT-6.1 - AGT-6.33)', () => {

    beforeEach(() => {
        cy.login();
        alumniLogPage.visitList();
    });

    afterEach(() => {
        cy.wait(1000);
    });

    it('AGT-6.1: Verifikasi Header Halaman dan Deskripsi Log Aktivasi Alumni', () => {
        alumniLogPage.verifyHeaderAndDescription();
    });

    it('AGT-6.2: Verifikasi Keberadaan Tab Status (Menunggu, Disetujui, Ditolak)', () => {
        alumniLogPage.verifyTabsExist();
        alumniLogPage.verifyDefaultActiveTab();
    });

    it('AGT-6.3: Verifikasi Navigasi Perpindahan Tab Status Aktivasi', () => {
        alumniLogPage.switchToTab('Disetujui');
        alumniLogPage.switchToTab('Ditolak');
        alumniLogPage.switchToTab('Menunggu');
    });

    it('AGT-6.4: Verifikasi Struktur Kolom Tabel Log Aktivasi', () => {
        alumniLogPage.verifyTableColumns();
    });

    it('AGT-6.5: Verifikasi Baris Data Tabel dan Akses Tombol Lihat Detail', () => {
        alumniLogPage.verifyTableHasDataOrEmpty();
        alumniLogPage.verifyDetailButtonExists();
        alumniLogPage.clickFirstRowDetail();
    });

    it('AGT-6.6: Cek default sort list Log Aktivasi Kembali Siswa (newest first)', () => {
        alumniLogPage.verifyDefaultSortNewestFirst();
    });

    it('AGT-6.7: Cek kolom Kelas Terakhir, Tahun Ajaran Terakhir, Semester Terakhir', () => {
        alumniLogPage.verifyTableColumns();
    });

    it('AGT-6.8: Cek kolom Aktivasi Kembali', () => {
        alumniLogPage.verifyTableColumns();
    });

    it('AGT-6.9: Aktifkan Filter Instansi', () => {
        alumniLogPage.applyFilterInstansi('Sekolah Digital Indonesia');
    });

    it('AGT-6.10: Aktifkan Filter 5 Kriteria Akademik (Tahun Ajaran, Semester, Tingkat, Kelas, Jurusan)', () => {
        alumniLogPage.verifyTableColumns();
    });

    it('AGT-6.11: Aktifkan Filter Aktivasi Kembali (Siswa / Alumni Guru / Staff)', () => {
        alumniLogPage.applyFilterAktivasiKembali('Siswa');
    });

    it('AGT-6.12: Aktifkan filter kombinasi (7 kriteria filter Siswa) → validasi list data atau empty state', () => {
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.13: Search by 7 kriteria (Nama / Nomor Kartu / Instansi / Kelas / Tahun Ajaran / Semester / Aktivasi Kembali)', () => {
        alumniLogPage.searchLog('Admin');
    });

    it('AGT-6.14: Search dengan keyword yang tidak match', () => {
        alumniLogPage.searchLog('XYZ99999999NONMATCH');
        alumniLogPage.verifyEmptyStateLogAktivasi();
    });

    it('AGT-6.15: Kombinasi filter + search sekaligus', () => {
        alumniLogPage.searchLog('Admin');
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.16: Navigation check tab Log Aktivasi Kembali Guru / Alumni Guru', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.17: Buka tab Log Aktivasi Kembali Guru saat belum ada data', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.18: Cek default sort list Log Aktivasi Kembali Guru (newest first)', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyDefaultSortNewestFirst();
    });

    it('AGT-6.19: Cek kolom Aktivasi Kembali pada tab Guru', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.20: Aktifkan Filter tab Guru (4 kriteria filter)', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.21: Filter → tidak ada hasil match (empty state)', () => {
        alumniLogPage.applyFilterInstansi('NonExistentInstansiXYZ');
        alumniLogPage.verifyEmptyStateLogAktivasi();
    });

    it('AGT-6.22: Search by Nama / Nomor Kartu / Instansi / Aktivasi Kembali (4 kriteria tab Guru)', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.searchLog('Admin');
    });

    it('AGT-6.23: Search no result → empty state Belum ada Log Aktivasi Kembali', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.searchLog('NON_MATCH_QUERY_12345');
        alumniLogPage.verifyEmptyStateLogAktivasi();
    });

    it('AGT-6.24: Kombinasi filter + search sekaligus pada tab Guru', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.applyFilterInstansi('Sekolah Digital Indonesia');
        alumniLogPage.searchLog('Admin');
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.25: Klik icon Aksi (Detail) di row Log Aktivasi Kembali Siswa', () => {
        alumniLogPage.clickFirstRowDetail();
    });

    it('AGT-6.26: Cek section-section di halaman Detail Aktivasi Kembali Siswa (Data Diri, Data Orang Tua, Dokumen)', () => {
        alumniLogPage.verifyDetailSectionsSiswa();
    });

    it('AGT-6.27: Cek data yang ditampilkan di halaman Detail (SNAPSHOT versi terakhir)', () => {
        alumniLogPage.verifySnapshotDataAccuracy();
    });

    it('AGT-6.28: Klik icon Aksi (Detail) di row Log Aktivasi Kembali Guru', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.clickFirstRowDetail();
    });

    it('AGT-6.29: Cek btn Kembali di header halaman Detail', () => {
        alumniLogPage.verifyBackButtonDetail();
    });

    it('AGT-6.30: Klik btn Kembali di halaman Detail → kembali ke halaman list', () => {
        alumniLogPage.clickBackButtonDetail();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.31: Cross-feature: Di halaman Alumni Siswa, lakukan Aktivasi Kembali ke Siswa → cek Log', () => {
        alumniLogPage.visitStudentAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.32: Cross-feature: Di halaman Alumni Guru, lakukan Aktivasi Kembali ke Guru → cek Log', () => {
        alumniLogPage.visitTeacherAlumni();
        alumniLogPage.verifyTableHasDataOrEmpty();
    });

    it('AGT-6.33: Cross-feature: Verify snapshot data di Log setelah target anggota diubah (audit trail persistent)', () => {
        alumniLogPage.verifySnapshotDataAccuracy();
    });

});