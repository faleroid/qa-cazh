import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.10 - Buka tab Kesehatan saat belum ada riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.10: Buka tab Kesehatan saat belum ada riwayat -> List Riwayat Kesehatan kosong (empty state)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(500);

    // Verifikasi ketat bahwa Card 3 Riwayat Kesehatan menampilkan empty state dan TIDAK memuat baris data riil
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr').then(($rows) => {
          const text = $rows.text().toLowerCase();
          const hasDataRows = $rows.length > 0 && !text.includes('tidak ditemukan') && !text.includes('belum') && !text.includes('kosong');
          
          // Jika ada data baris riil di tabel, test case ini harus ERROR/GAGAL sesuai ekspektasi skenario
          expect(hasDataRows, 'Tabel Riwayat Kesehatan harus kosong (empty state), tidak boleh memuat baris data').to.be.false;
        });
      });
  });
});
