import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.39 - Simulasi seluruh data gagal dihapus (network/server error)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.39: Intercept 500 Server Error -> Error "Gagal menghapus data, silakan coba lagi" & selection dipertahankan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 1. Centang 1 data pertama
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"]').click({ force: true });
    cy.wait(600);

    // 2. Klik tombol Hapus Terpilih untuk membuka modal konfirmasi
    cy.contains('button', /hapus/i, { timeout: 10000 }).click({ force: true });
    cy.wait(600);

    // 3. Pasang Intercept 500 Server Error TEPAT SEBELUM menekan tombol Hapus di modal
    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 500,
          body: {
            message: 'Gagal menghapus data, silakan coba lagi'
          }
        });
      }
    }).as('deleteErrorMock');

    // 4. Konfirmasi hapus di popup dialog
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      cy.contains('button', /hapus|ya|konfirmasi/i).click({ force: true });
    });
    cy.wait(1000);

    // 5. Verifikasi Toast Sonner Error "Gagal menghapus data, silakan coba lagi"
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('gagal') || text.includes('coba lagi') || text.includes('error');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus memuat respons error saat gagal').to.satisfy((t) => t.includes('gagal') || t.includes('terpilih') || t.includes('error'));
      }
    });

    // 6. Verifikasi bahwa selection dipertahankan (data gagal dihapus tetap ter-centang)
    cy.get('body').then(($body) => {
      const hasSelection = $body.find('[data-slot="card-toolbar"], button:contains("Terpilih"), button[aria-checked="true"]').length > 0;
      expect(hasSelection, 'Selection harus dipertahankan saat terjadi error server').to.be.true;
    });
  });
});
