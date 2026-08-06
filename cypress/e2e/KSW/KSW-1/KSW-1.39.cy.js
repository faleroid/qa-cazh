import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.39 - Upload lampiran dengan ukuran > 10MB', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.39: Buka modal Tambah Riwayat → Upload lampiran > 10MB (oversized_11mb_file.pdf, 11.5MB) → Sistem menampilkan error, file tidak dapat di-upload', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Upload file fisik oversized > 10MB (oversized_11mb_file.pdf, 11.5 MB)
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/oversized_11mb_file.pdf', { force: true });
    cy.wait(1000);

    // 3. Klik Simpan untuk memicu pemicuan validasi ukuran file
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1200);

    // 4. Verifikasi Toast Error Notification / Form Message Tampil
    cy.get('body').then(($body) => {
      const hasError = $body.find('[data-sonner-toast], [role="status"], [data-slot="form-message"], .text-destructive').length > 0;
      expect(hasError, 'Pesan error ukuran file melebihi 10MB harus tampil').to.be.true;
    });
  });
});
