import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.12 - Kosongkan salah satu field required, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.12: Kosongkan salah satu field required, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Buka form Tambah Prestasi
    cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);
    cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should('be.visible');

    // 2. Isi Tanggal Kejadian
    cy.get('[role="dialog"]').within(() => {
      cy.get('button[name="date"], button[data-slot="form-control"], button[data-slot="popover-trigger"], button:contains("Tanggal")')
        .first()
        .click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($b) => {
      const dayBtn = $b.find('table.rdp-month_grid tbody button, [role="gridcell"] button, .rdp-day button, .rdp-day').filter(':visible').first();
      if (dayBtn.length) {
        cy.wrap(dayBtn).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Isi field required lainnya, tetapi KOSONGKAN salah satu field required (Apresiasi)
    cy.get('[role="dialog"]').within(() => {
      // Isi Kategori
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(testData.prestasiData.kategori, { force: true });
      cy.wait(200);

      // Isi Poin
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type(testData.prestasiData.poin, { force: true });
      cy.wait(200);

      // Isi Deskripsi
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(testData.prestasiData.deskripsi, { force: true });
      cy.wait(200);

      // KOSONGKAN Apresiasi (salah satu field required yang dikosongkan)
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea').last().clear({ force: true });
      cy.wait(200);

      // 5. Klik tombol Simpan (atau cek kondisi tombol simpan)
      cy.contains('button[type="submit"], button', /simpan/i).then(($btn) => {
        if (!$btn.is(':disabled')) {
          cy.wrap($btn).click({ force: true });
        }
      });
    });

    cy.wait(500);

    // 6. Verifikasi modal tetap terbuka & muncul pesan error validasi required / button disabled
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasValidation =
        text.includes('wajib') ||
        text.includes('harus diisi') ||
        text.includes('required') ||
        text.includes('apresiasi') ||
        $dialog.find('[aria-invalid="true"], [data-invalid="true"], [data-slot="form-message"]').length > 0 ||
        $dialog.find('button[type="submit"]:disabled, button:contains("Simpan"):disabled').length > 0;
      expect(hasValidation, 'Pesan error validasi required muncul atau tombol simpan tidak aktif').to.be.true;
    });
  });
});
