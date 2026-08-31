import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.15 - Isi Poin Prestasi dengan nilai negatif (mis. -5)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.15: Isi Poin Prestasi dengan nilai negatif (mis. -5)', () => {
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

    // 3. Isi SELURUH field form, tetapi isi Poin dengan angka negatif (-5)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(testData.prestasiData.kategori, { force: true });
      cy.wait(200);

      // Poin negatif
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type('-5', { force: true });
      cy.wait(200);

      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(testData.prestasiData.deskripsi, { force: true });
      cy.wait(200);

      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea').last().clear({ force: true }).type(testData.prestasiData.apresiasi, { force: true });
      cy.wait(200);

      // 5. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 6. Verifikasi modal tetap terbuka & nilai negatif ditolak / error validasi
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').then(($input) => {
        const val = $input.val();
        expect(
          val === '' || val === '5' || Number(val) >= 0 || $input.parents('[aria-invalid="true"], [data-invalid="true"]').length > 0,
          'Hanya angka positif yang diterima'
        ).to.be.true;
      });
    });
  });
});
