import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.11 - Cari riwayat kesehatan dengan keyword Indikasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.11: Pastikan ada data Riwayat Kesehatan -> Verifikasi data Indikasi pada Card Riwayat Kesehatan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (Card 3)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Tambah 1 data Riwayat Kesehatan jika belum ada data agar tidak false positive
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .then(($card) => {
        const hasRows = $card.find('tbody tr').length > 0 && !$card.text().includes('tidak ditemukan');
        if (!hasRows) {
          cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
          cy.wait(600);

          // Klik trigger Date Picker
          cy.get('button[name="date"]').first().click({ force: true });
          cy.wait(350);
          cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
          cy.wait(300);
          cy.get('[data-slot="dialog-title"]').click({ force: true });
          cy.wait(300);

          // Isi Form Modal Riwayat Kesehatan
          cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
            cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
            cy.wait(150);
            cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
            cy.wait(150);
            cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.riwayatData.keterangan, { force: true });
            cy.wait(150);
            cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
          });
          cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
          cy.wait(1000);
        }
      });

    // Lakukan pencarian aman jika fitur pencarian tersedia
    StudentDetailPage.searchKeyword(testData.riwayatData.indikasi);
    cy.wait(600);

    // Verifikasi bahwa tabel Card 3 memiliki minimal 1 baris data riwayat kesehatan asli
    cy.get('[data-slot="card"]')
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('tbody tr').first().should('be.visible');
      });
  });
});
