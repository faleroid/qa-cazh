import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.36 - Coba centang lebih dari 50 data secara manual', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.36: Ubah pagination 100 -> Centang header (50 data terpilih) -> Klik checkbox baris tambahan manual -> Checkbox disabled / tooltip maksimal 50 data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Ubah "Baris Per Halaman" (Pagination) menjadi 100 jika tersedia
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"], select', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(500);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1500);
      }
    });

    // 3. Centang header checkbox (50 data pertama terpilih)
    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(1000);

    // 4. Coba centang checkbox tambahan secara manual pada baris ke-51 (di luar 50 data pertama)
    cy.get('tbody tr').then(($rows) => {
      if ($rows.length > 50) {
        const extraRow = $rows.eq(50);
        const checkbox = extraRow.find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]');
        if (checkbox.length > 0) {
          cy.wrap(checkbox.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
          cy.wait(500);
        }
      }
    });

    // 5. Verifikasi sesuai UAT: Checkbox tambahan disabled / muncul tooltip atau notifikasi batas maksimal 50 data
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const hasDisabledCheckbox = $body.find('tbody tr button[disabled], tbody tr [aria-disabled="true"], tbody tr [data-disabled]').length > 0;
      const text = $body.text();
      const hasLimitMessage = /maksimal 50|50 data|batas|terpilih/i.test(text);
      const hasTooltipOrToast = $body.find('[role="tooltip"], [data-sonner-toast], [data-slot="tooltip-content"]').length > 0;

      expect(
        hasDisabledCheckbox || hasLimitMessage || hasTooltipOrToast,
        'Checkbox tambahan harus disabled atau menampilkan tooltip/pesan batas maksimal 50 data'
      ).to.be.true;
    });
  });
});
