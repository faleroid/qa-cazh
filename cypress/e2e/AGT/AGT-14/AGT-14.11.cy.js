import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.11 - Cek field pada form Tambah Prestasi', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.11: Cek field pada form Tambah Prestasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Klik tombol Tambah Prestasi untuk membuka form
    cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 2. Verifikasi modal Dialog Tambah Prestasi muncul
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        // A. Verifikasi Label & Field: Tanggal Kejadian (required)
        cy.contains('label, span, p, div', /tanggal/i).should('exist');
        cy.get('button[name="date"], button[data-slot="form-control"], button[data-slot="popover-trigger"], button:contains("Tanggal"), input[name="date"]')
          .should('exist');

        // B. Verifikasi Label & Field: Kategori Prestasi (required)
        cy.contains('label, span, p, div', /kategori/i).should('exist');
        cy.get('input[name="category"], input[placeholder*="Kategori"]')
          .should('exist');

        // C. Verifikasi Label & Field: Poin Prestasi (required)
        cy.contains('label, span, p, div', /poin/i).should('exist');
        cy.get('input[name="point"], input[name="poin"], input[type="number"]')
          .should('exist');

        // D. Verifikasi Label & Field: Deskripsi (required)
        cy.contains('label, span, p, div', /deskripsi/i).should('exist');
        cy.get('input[name="description"], textarea[name="description"], textarea')
          .should('exist');

        // E. Verifikasi Label & Field: Apresiasi (required)
        cy.contains('label, span, p, div', /apresiasi/i).should('exist');
        cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea')
          .should('exist');

        // F. Verifikasi Label & Field: Foto (optional)
        cy.contains('label, span, p, div', /foto/i).should('exist');
        cy.get('input[type="file"]')
          .should('exist');

        // G. Verifikasi Tombol Aksi (Batal & Simpan)
        cy.contains('button', /batal/i).should('be.visible');
        cy.contains('button[type="submit"], button', /simpan/i).should('be.visible');
      });
  });
});
