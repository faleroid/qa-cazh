import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.22 - Kosongkan salah satu field required, klik Simpan (Edit)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.22: Kosongkan salah satu field required, klik Simpan -> Dialog tetap terbuka / sistem menampilkan pesan error', () => {
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

        cy.get('button[name="date"]').click({ force: true });
        cy.wait(400);
        cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
        cy.wait(300);
        cy.get('[data-slot="dialog-title"]').click({ force: true });
        cy.wait(300);

        cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
          cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
          cy.wait(200);
          cy.get('input[name="action"]').clear({ force: true }).type(testData.riwayatData.tindakan, { force: true });
          cy.wait(200);
          cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
        });
        cy.wait(1200);
      }
    });

    // Scroll ke baris pertama tabel dan klik tombol Edit spesifik (Ikon Pensil: svg.lucide-square-pen)
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible');
    cy.wait(300);

    cy.get('tbody tr').first().find('svg.lucide-square-pen').parents('button').first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    // Kosongkan field Indikator & Simpan
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first().clear({ force: true });
      cy.wait(200);
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });

    cy.wait(400);
    cy.get('[role="dialog"]').should('be.visible');
  });
});
