import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.40 - Upload lampiran valid (JPG/JPEG/PNG/MP4/PDF, ≤ 10MB)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.40: Buka modal Tambah Riwayat → Upload lampiran valid (signature.jpeg, ≤ 10MB) → File berhasil di-upload & dapat di-preview saat diklik', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Upload file gambar valid (cypress/fixtures/signature.jpeg)
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/signature.jpeg', { force: true });
    cy.wait(1000);

    // 3. Verifikasi Thumbnail Preview Gambar (img[src^="blob:"]) Tampil pada Modal Form
    cy.get('[role="dialog"] img[src^="blob:"], [role="dialog"] img[alt*="signature"]')
      .should('be.visible')
      .and('have.class', 'object-cover');

    // 4. Klik Thumbnail Gambar untuk Membuka Preview Lightbox / Modal
    cy.get('[role="dialog"] img[src^="blob:"], [role="dialog"] img[alt*="signature"]')
      .click({ force: true });
    cy.wait(800);

    // 5. Verifikasi Gambar Berhasil Di-preview di Layar
    cy.get('img[src^="blob:"]').should('exist');
  });
});
