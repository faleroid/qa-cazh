import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.10 - Buka tab Kesehatan saat belum ada riwayat', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.10: Buka tab Kesehatan saat belum ada riwayat -> List Riwayat Kesehatan kosong (empty state)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan agar empty state tampil di layar
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(500);

    // Verifikasi tampilan Empty State pada tabel Riwayat Kesehatan
    cy.get('tbody', { timeout: 15000 }).should(($tbody) => {
      const text = $tbody.text().toLowerCase();
      const hasEmptyState = text.includes('tidak ditemukan') || text.includes('belum tersedia') || text.includes('kosong') || $tbody.find('svg').length > 0;
      expect(hasEmptyState, 'Tabel Riwayat Kesehatan harus menampilkan komponen empty state (ilustrasi & pesan tidak ada data)').to.be.true;
    });
  });
});
