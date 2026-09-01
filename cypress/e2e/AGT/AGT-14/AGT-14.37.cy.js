import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.37 - Ubah filter/search saat ada data terpilih', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.37: Ubah filter/search saat ada data terpilih -> Notifikasi "Pilihan direset karena filter berubah" muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi tersedia
    StudentDetailPage.ensurePrestasiDataExists();

    // 2. Pastikan input search bersih sebelum memilih data
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().clear({ force: true });
    cy.wait(500);

    // 3. Centang baris data pertama
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);

    // 4. Ubah filter / search keyword untuk memicu reset seleksi
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().type('Prestasi{enter}', { force: true });

    // 5. Verifikasi notifikasi toast Sonner muncul dengan judul "Pilihan direset karena filter berubah"
    cy.get('[data-sonner-toast], [role="status"], [data-slot="toast"]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });
});
