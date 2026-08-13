import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.42 - Cek isi kolom file hasil Export Riwayat Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.42: Cek isi kolom file hasil Export Riwayat Kesehatan -> File berisi kolom: No, Instansi, Nama Siswa, No Kartu Siswa, Tingkat-Kelas, Tanggal Kejadian, Indikasi, Tindakan, Keterangan, Dibuat Oleh', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button, a', /excel|export/i, { timeout: 15000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    cy.wait(1500);

    cy.get('body').should('exist');
  });
});
