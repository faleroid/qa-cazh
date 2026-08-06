import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.34 - Kosongkan salah satu field required, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.34: Buka modal Tambah Riwayat → Isi Tanggal & Persentase, namun kosongkan HANYA 1 field required (Deskripsi) → Klik Simpan → Error validasi Deskripsi wajib diisi tampil', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Isi Field Required 1: Tanggal
    cy.get('[role="dialog"] button:contains("DD/MM/YYYY")').click({ force: true });
    cy.wait(600);
    cy.get('button[aria-label*="Today"], button[aria-label*="August"], td[data-day] button').first().click({ force: true });
    cy.wait(600);

    // 3. Isi Field Required 2: Persentase (80%), namun kosongkan HANYA 1 Field Required: Deskripsi
    cy.get('[role="dialog"] input[name="percentage"]').clear({ force: true }).type('80', { force: true });
    cy.get('[role="dialog"] textarea[name="description"]').clear({ force: true });

    // 4. Klik Simpan
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(1000);

    // 5. Verifikasi Modal Tetap Terbuka & Error HANYA Tampil pada Field Deskripsi
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.contains('[data-slot="form-message"]', 'Deskripsi wajib diisi').should('be.visible');
    });
  });
});
