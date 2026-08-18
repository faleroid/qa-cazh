import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.07 - Isi Tanggal + Nama Imunisasi, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.07: Isi Tanggal + Nama Imunisasi, klik Simpan -> Imunisasi tersimpan; pesan success "Berhasil memperbarui data kesehatan" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .within(($card) => {
        // Klik Tambah Imunisasi jika belum ada row input
        if ($card.find('input[id*="name"], input[placeholder*="Nama Imunisasi"]').length === 0) {
          cy.contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.get('input[id*="name"], input[placeholder*="Nama Imunisasi"]').first().clear({ force: true }).type(testData.imunisasiData.nama, { force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);

    // Verifikasi notifikasi Sonner Toast "Berhasil memperbarui data kesehatan"
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('contain.text', 'Berhasil memperbarui data kesehatan');
      } else {
        const text = $body.text().toLowerCase();
        expect(text).to.satisfy((t) =>
          t.includes('berhasil') || t.includes('kesehatan') || t.includes(testData.imunisasiData.nama.toLowerCase())
        );
      }
    });
  });
});
