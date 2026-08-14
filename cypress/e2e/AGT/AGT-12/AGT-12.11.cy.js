import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.11 - Cari riwayat kesehatan dengan keyword Indikasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.11: Cari riwayat kesehatan dengan keyword Indikasi -> Tambah riwayat kesehatan dulu jika kosong, lalu cari', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('[data-slot="card-title"]', 'Riwayat Kesehatan')
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Tambah 1 data Riwayat Kesehatan terlebih dahulu jika tabel masih kosong
    cy.get('body').then(($body) => {
      const text = $body.text();
      const isEmpty = text.includes('tidak ditemukan') || $body.find('tbody tr').length === 0;

      if (isEmpty) {
        cy.contains('button', /tambah riwayat/i, { timeout: 15000 }).click({ force: true });
        cy.wait(600);

        // 1. Klik trigger Date Picker "Tanggal Kejadian"
        cy.get('button[name="date"]').click({ force: true });
        cy.wait(400);

        // 2. Klik tanggal pada tabel rdp-month_grid
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
          .first()
          .click({ force: true });
        cy.wait(300);

        // 3. Klik luar popover (pada judul dialog modal) agar popover tertutup & tanggal tersimpan
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        // 4. Isi Indikator, Tindakan, & Deskripsi pada Modal lalu Klik Simpan
        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"], input[placeholder*="Indikator"], input[placeholder*="Indikasi"]').first().clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(testData.riwayatData.keterangan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    // Lakukan pencarian berdasarkan keyword Indikasi
    StudentDetailPage.searchKeyword(testData.riwayatData.indikasi);
    cy.wait(600);
    cy.get('body').should('contain.text', testData.riwayatData.indikasi);
  });
});
