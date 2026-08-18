import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.08 - Klik icon Hapus pada baris Imunisasi', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.08: Klik icon Hapus pada baris Imunisasi -> Imunisasi langsung terhapus TANPA popup confirmation', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .then(($card) => {
        // Jika belum ada row imunisasi, klik Tambah Imunisasi terlebih dahulu agar trash button tersedia
        if ($card.find('button.text-destructive, button svg.lucide-trash, button:has(svg.lucide-trash)').length === 0) {
          cy.wrap($card).contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.wrap($card).within(() => {
          cy.get('button.text-destructive, button svg.lucide-trash, button:has(svg.lucide-trash)')
            .first()
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .should('be.visible')
            .click({ force: true });
        });
      });

    cy.wait(800);

    // Verifikasi bahwa TIDAK ADA popup konfirmasi dialog yang terbuka (langsung terhapus TANPA popup)
    cy.get('body').then(($body) => {
      const dialogs = $body.find('[role="dialog"], [data-slot="dialog-content"]');
      expect(dialogs.length, 'Penghapusan baris imunisasi harus terjadi secara langsung TANPA popup konfirmasi').to.equal(0);
    });
  });
});
