import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.23: Kosongkan salah satu field required pada form Edit, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.23: Kosongkan salah satu field required pada form Edit, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi ada di tabel
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit pada baris pertama
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Kosongkan salah satu field required (misal: Apresiasi)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea')
        .last()
        .clear({ force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & error validasi required muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasValidation =
        text.includes('wajib') ||
        text.includes('harus diisi') ||
        text.includes('required') ||
        text.includes('apresiasi') ||
        $dialog.find('[aria-invalid="true"], [data-invalid="true"], [data-slot="form-message"]').length > 0;
      expect(hasValidation, 'Pesan error validasi required muncul pada form edit').to.be.true;
    });
  });
});
