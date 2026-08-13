import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.09 - Cek kolom pada tabel List Riwayat Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.09: Cek kolom pada tabel List Riwayat Kesehatan -> Menampilkan kolom: Checkbox, Tanggal Kejadian, Indikasi, Tindakan, Keterangan, Dibuat Oleh, Aksi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan agar seluruh card tabel tampil penuh di layar browser Cypress
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(500);
    StudentDetailPage.verifyRiwayatKesehatanColumns();
  });
});
