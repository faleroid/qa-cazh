import SpmbLandingPage from '../../pages/SpmbLandingPage';

describe('AGT-15: Anggota - PPDB - Landingpage SPMB (Public)', () => {
  beforeEach(() => {
    SpmbLandingPage.visitPartner();
  });

  it('AGT-15.1: Landingpage partner menampilkan semua section sesuai konfigurasi', () => {
    SpmbLandingPage.assertPartnerSections();
  });

  it('AGT-15.2: Tombol Daftar Sekarang menampilkan daftar Instansi SPMB', () => {
    SpmbLandingPage.clickApply();
    SpmbLandingPage.assertInstitutionList();
  });

  it('AGT-15.3: Tombol Daftar Sekarang Instansi membuka landingpage SPMB Instansi', () => {
    SpmbLandingPage.clickApply();
    SpmbLandingPage.assertInstitutionList();
    SpmbLandingPage.clickInstitutionApply();
    SpmbLandingPage.assertInstanceUrl();
  });

  it('AGT-15.4: Landingpage SPMB Instansi dapat diakses langsung melalui URL', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertInstanceUrl();
  });

  it('AGT-15.5: Section Beranda menampilkan judul, tombol daftar, dan alur pendaftaran', () => {
    SpmbLandingPage.clickApply();
    SpmbLandingPage.assertHomeSection();
  });

  it('AGT-15.6: Judul Web tampil sesuai konfigurasi Beranda', () => {
    SpmbLandingPage.getPublicHomeTitle().then((publicTitle) => {
      SpmbLandingPage.assertConfiguredTitleMatchesPublic(publicTitle);
    });
  });

  it('AGT-15.7: Info kuota tersedia dan tombol daftar aktif', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertAvailableQuota();
  });

  it('AGT-15.8: Tombol daftar saat kuota tersedia menampilkan formulir SPMB', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertAvailableQuota();
    SpmbLandingPage.clickInstitutionApply();
    SpmbLandingPage.assertRegistrationForm();
  });

  it('AGT-15.9: Kuota penuh menutup atau menonaktifkan pendaftaran', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertFullQuotaState();
  });

  it('AGT-15.10: Section Alur Pendaftaran menampilkan tahapan dan deskripsi', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertAdmissionProcess();
  });

  it('AGT-15.11: Section Jadwal & Biaya menampilkan jadwal, tanggal, dan biaya', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertScheduleAndFees();
  });

  it('AGT-15.12: Nama Jadwal Pendaftaran tampil sesuai konfigurasi', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertScheduleName();
  });

  it('AGT-15.13: Range tanggal jadwal pendaftaran tampil', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertDateRange();
  });

  it('AGT-15.14: Harga untuk semua jurusan menampilkan harga dan harga coret', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertSinglePrice();
  });

  it('AGT-15.15: Harga tidak untuk semua jurusan menampilkan harga per jurusan', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertPricePerMajor();
  });

  it('AGT-15.16: Harga coret sama dengan harga tidak ditampilkan sebagai diskon', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertNoDiscountRendering();
  });

  it('AGT-15.17: Instansi tanpa jadwal aktif menampilkan empty state jadwal', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertNoScheduleEmptyState();
  });

  it('AGT-15.18: Section Persyaratan menampilkan deskripsi persyaratan', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertRequirements();
  });

  it('AGT-15.19: Persyaratan kosong menampilkan empty state atau pesan belum tersedia', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertRequirementsEmptyState();
  });

  it('AGT-15.20: Section Informasi menampilkan informasi pendaftaran', () => {
    SpmbLandingPage.visitInstance();
    SpmbLandingPage.assertInformation();
  });
});
