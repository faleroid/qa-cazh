import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.05 - Klik tombol Tambah Imunisasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.05: Klik tombol Tambah Imunisasi -> Tampil form pada Card Imunisasi dengan field Tanggal Imunisasi & Nama Imunisasi', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Target Card Imunisasi dan scroll ke posisi Card 2
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // 2. Klik tombol "Tambah Imunisasi" di dalam Card Imunisasi
    cy.get('[data-slot="card"]')
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.contains('button, span', /tambah imunisasi/i).click({ force: true });
      });

    cy.wait(600);

    // 3. Verifikasi detail elemen di dalam Card Imunisasi
    cy.get('[data-slot="card"]')
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        // Verifikasi Label & Trigger Button Tanggal Imunisasi
        cy.contains('label', /tanggal imunisasi/i).should('be.visible');
        cy.get('button[data-slot="dropdown-menu-trigger"], button[id*="date"], button:has(svg.lucide-calendar-days)').first().should('be.visible');

        // Verifikasi Label & Input Field Nama Imunisasi
        cy.contains('label', /nama imunisasi/i).should('be.visible');
        cy.get('input[id*="name"], input[placeholder*="Nama Imunisasi"], input[placeholder*="Masukkan Nama Imunisasi"]').first().should('be.visible');

        // Verifikasi Tombol Hapus (trash) per baris imunisasi
        cy.get('button.text-destructive, button svg.lucide-trash, button:has(svg.lucide-trash)').first().should('be.visible');
      });
  });
});
