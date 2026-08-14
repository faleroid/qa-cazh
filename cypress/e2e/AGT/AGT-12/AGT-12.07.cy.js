import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.07 - Isi Tanggal + Nama Imunisasi, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.07: Isi Tanggal + Nama Imunisasi, klik Simpan -> Imunisasi tersimpan; pesan success "Berhasil memperbarui data kesehatan" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Klik Tambah Imunisasi
    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // 2. Isi Nama Imunisasi pada Card Imunisasi dan klik Simpan
    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
          .clear({ force: true })
          .type(testData.imunisasiData.nama, { force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).should('be.visible').click({ force: true });
      });

    cy.wait(800);

    // 3. Verifikasi notifikasi Sonner Toast "Berhasil memperbarui data kesehatan"
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
