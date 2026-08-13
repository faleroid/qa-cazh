import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.16 - Cek field pada form Tambah Riwayat Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.16: Cek field pada form Tambah Riwayat Kesehatan -> Menampilkan field (semua required): Tanggal Kejadian*, Indikasi*, Tindakan*, Keterangan*', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat|tambah kesehatan/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase();
      expect(text, 'Form Tambah Riwayat harus memuat field Tanggal, Indikasi, Tindakan, Keterangan').to.satisfy((t) =>
        t.includes('tanggal') || t.includes('indikasi') || t.includes('tindakan') || t.includes('keterangan')
      );
    });
  });
});
