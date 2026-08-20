import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.10 - Cari data dengan keyword tidak ditemukan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.10: Tab Progres → Cari keyword random/invalid → Sistem menampilkan list kosong (no result)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.wait(800);

    // Verifikasi bahwa tabel dalam keadaan kosong (empty state / no result)
    cy.get('tbody', { timeout: 15000 }).then(($tbody) => {
      const text = $tbody.text().toLowerCase();
      const isEmpty = text.includes('tidak') || text.includes('kosong') || text.includes('belum') || text.includes('no result') || $tbody.find('tr').length === 0 || ($tbody.find('tr').length === 1 && (text.includes('tidak ada') || text.includes('tidak ditemukan')));
      expect(isEmpty, 'Tabel Tab Progres harus menampilkan pesan data tidak ditemukan / list kosong').to.be.true;
    });
  });
});
