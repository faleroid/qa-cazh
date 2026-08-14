import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.18 - Isi semua field required, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.18: Isi semua field required, klik Simpan -> Riwayat tersimpan; pesan success "Berhasil menambahkan Riwayat Kesehatan" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
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

    // 4. Isi sisa field required (Indikator, Tindakan, Deskripsi) dengan data khusus AGT-12.18 & Simpan
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      // Indikator ("Cidera Engkel Kaki")
      cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.indikasi, { force: true });
      cy.wait(200);

      // Tindakan ("Kompres Es & Perban Elastis di UKS")
      cy.get('input[name="action"], input[placeholder*="Tindakan"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.tindakan, { force: true });
      cy.wait(200);

      // Deskripsi ("Diberikan pertolongan pertama oleh petugas UKS")
      cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first()
        .should('be.visible')
        .clear({ force: true })
        .type(testData.tambahRiwayatData.keterangan, { force: true });
      cy.wait(200);

      // Simpan
      cy.contains('button[type="submit"], button', 'Simpan')
        .should('be.visible')
        .click({ force: true });
    });

    // Assert Sonner Toast Notifikasi Success: 'Berhasil menambahkan Riwayat Kesehatan'
    cy.get('[data-sonner-toast]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Berhasil menambahkan Riwayat Kesehatan');

    cy.get('body').should('contain.text', testData.tambahRiwayatData.indikasi);
  });
});
