import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.33 - Cek field pada form Tambah Riwayat', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.33: Buka modal Tambah Riwayat → Verifikasi keberadaan field Tanggal*, Persentase (%)*, Deskripsi*, dan Lampiran (Opsional)', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Verifikasi Ke-4 Field Utama pada Modal Dialog Tambah Riwayat sesuai HTML DOM Aktual
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      // Field 1: Tanggal (Required)
      cy.contains('label', 'Tanggal').should('be.visible');
      cy.get('button:contains("DD/MM/YYYY")').should('be.visible');

      // Field 2: Persentase (%) (Required)
      cy.contains('label', /persentase/i).should('be.visible');
      cy.get('input[name="percentage"]').should('be.visible').and('have.attr', 'type', 'number');

      // Field 3: Deskripsi (Required)
      cy.contains('label', 'Deskripsi').should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');

      // Field 4: Lampiran (Opsional)
      cy.contains('label', /lampiran/i).should('be.visible');
      cy.get('input[type="file"]').should('exist');

      // Tombol Footer
      cy.contains('button', 'Batal').should('be.visible');
      cy.contains('button', 'Simpan').should('be.visible');
    });
  });
});
