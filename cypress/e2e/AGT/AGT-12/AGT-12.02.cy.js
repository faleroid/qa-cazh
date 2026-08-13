import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.02 - Cek field pada section Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.02: Cek field pada section Kesehatan -> Menampilkan field optional: Riwayat Kesehatan, Disabilitas, Hasil Tes Buta Warna, Tinggi Badan, Berat Badan, Golongan Darah', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();
    StudentDetailPage.verifyKesehatanFields();
  });
});
