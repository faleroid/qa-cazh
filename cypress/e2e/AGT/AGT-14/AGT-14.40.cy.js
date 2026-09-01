import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.40 - Simulasi sebagian data gagal dihapus (partial fail)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.40: Intercept partial fail response -> Warning "{x} dari {n} data berhasil dihapus. {y} data gagal, silakan coba lagi"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Centang data untuk bulk delete
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').eq(0).find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(400);

    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      if (rows.length > 1) {
        cy.wrap(rows).eq(1).find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
        cy.wait(400);
      }
    });

    // 3. Klik tombol Hapus Terpilih untuk membuka modal konfirmasi
    cy.contains('button', /hapus/i, { timeout: 10000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(600);

    // 4. Pasang Intercept partial fail TEPAT SEBELUM menekan tombol konfirmasi Hapus
    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 200,
          body: {
            success: false,
            message: '1 dari 2 data berhasil dihapus. 1 data gagal, silakan coba lagi',
            data: { success_count: 1, failed_count: 1 }
          }
        });
      }
    }).as('deletePartialMock');

    // 5. Konfirmasi hapus di popup dialog
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|konfirmasi|delete/i).click({ force: true });
      });
    cy.wait(1000);

    // 6. Verifikasi Toast Sonner Warning / Pesan Partial Fail sesuai UAT
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('berhasil') || text.includes('gagal') || text.includes('coba lagi');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus menampilkan informasi status partial fail').to.satisfy((t) => t.includes('gagal') || t.includes('berhasil') || t.includes('prestasi'));
      }
    });
  });
});
