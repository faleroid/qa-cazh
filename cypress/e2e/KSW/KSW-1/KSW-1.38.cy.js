import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.38 - Upload lampiran dengan format selain JPG/JPEG/PNG/MP4/PDF', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.38: Buka modal Tambah Riwayat → Upload lampiran dengan format selain JPG/JPEG/PNG/MP4/PDF (progressActivityData.json) → Sistem menampilkan error validasi format file', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Upload file dengan format selain JPG/JPEG/PNG/MP4/PDF (cypress/fixtures/progressActivityData.json)
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/progressActivityData.json', { force: true });
    cy.wait(600);

    // 3. Klik Simpan untuk memicu pengiriman form & validasi
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1200);

    // 4. Verifikasi Error Notification / Form Message Tampil
    cy.get('body').then(($body) => {
      const hasError = $body.find('[data-sonner-toast], [role="status"], [data-slot="form-message"], .text-destructive').length > 0;
      expect(hasError, 'Pesan error format file invalid harus tampil').to.be.true;
    });
  });
});
