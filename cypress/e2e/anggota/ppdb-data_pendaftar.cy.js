import ppdbDataPendaftarPage from '../../pages/PpdbDataPendaftarPage';

describe('Data Pendaftar PPDB - E2E Full Regression Suite (AGT-8.1 - AGT-8.20)', () => {

    beforeEach(() => {
        cy.login();
        ppdbDataPendaftarPage.visitPage();
    });

    afterEach(() => {
        cy.wait(1000);
    });

    it('AGT-8.1: Load halaman Data Pendaftar (Anggota → SPMB → Data Pendaftar)', () => {
        ppdbDataPendaftarPage.verifyHeaderAndDescription();
    });

    it('AGT-8.2: Cek default filter instansi saat load', () => {
        ppdbDataPendaftarPage.verifyDefaultInstansiFilter();
    });

    it('AGT-8.3: Buka halaman Data Pendaftar saat belum ada data', () => {
        ppdbDataPendaftarPage.verifyEmptyStateUI();
    });

    it('AGT-8.4: Cek Tombol Aksi di setiap row', () => {
        ppdbDataPendaftarPage.verifyFixedActionColumnAndDefaultMenu();
    });

    it('AGT-8.5: Cek Tombol Aksi untuk row dengan Status = Diterima', () => {
        ppdbDataPendaftarPage.verifyActionMenuDiterimaStatus();
    });

    it('AGT-8.6: Cek Tombol Bayar visibility', () => {
        ppdbDataPendaftarPage.verifyBayarButtonVisibilityRule();
    });

    it('AGT-8.7: Cek default pagination page size', () => {
        ppdbDataPendaftarPage.verifyDefaultPaginationSize();
    });

    it('AGT-8.8: Ganti pagination ke 50/100/500/1000/2000', () => {
        ppdbDataPendaftarPage.changePaginationSize('50');
    });

    it('AGT-8.9: Cek loading indicator saat sistem memuat data', () => {
        ppdbDataPendaftarPage.verifyLoadingIndicatorOnDataFetch();
    });

    it('AGT-8.10: Ganti filter Instansi', () => {
        ppdbDataPendaftarPage.changeInstansiFilter('Academy Cazh');
    });

    it('AGT-8.11: Cek section Statistik di atas list', () => {
        ppdbDataPendaftarPage.verifyFiveStatistikSummaryCards();
    });

    it('AGT-8.12: Cek Statistik Status', () => {
        ppdbDataPendaftarPage.verifyStatistikStatusBreakdown();
    });

    it('AGT-8.13: Cek Statistik Status Lainnya', () => {
        ppdbDataPendaftarPage.verifyStatistikStatusCustom();
    });

    it('AGT-8.14: Cek value statistik saat filter instansi diganti', () => {
        ppdbDataPendaftarPage.verifyStatistikUpdateOnFilterChange();
    });

    it('AGT-8.15: Cek value statistik saat belum ada data pendaftar', () => {
        ppdbDataPendaftarPage.verifyStatistikZeroStateWhenNoData();
    });

    it('AGT-8.16: Aktifkan Filter Instansi / Tahun Ajaran / Jurusan / Tingkat / Kelas', () => {
        ppdbDataPendaftarPage.applyFiveAcademicFilters();
    });

    it('AGT-8.17: Aktifkan Filter Status (Daftar Baru/Daftar Ulang/Diterima/Tidak Diterima/Mengundurkan Diri)', () => {
        ppdbDataPendaftarPage.applyStatusFilter('Daftar Baru');
    });

    it('AGT-8.18: Aktifkan Filter Status Lainnya (status custom dari Pengaturan Web SPMB)', () => {
        ppdbDataPendaftarPage.applyStatusCustomFilter('Status Kustom Test');
    });

    it('AGT-8.19: Aktifkan Filter Metode Bayar / Jalur Penerimaan', () => {
        ppdbDataPendaftarPage.applyPaymentAndJalurFilter();
    });

    it('AGT-8.20: Filter kombinasi (semua 9 kriteria) → tidak ada hasil', () => {
        ppdbDataPendaftarPage.applyNineFiltersCombinationNoMatch();
    });

});
