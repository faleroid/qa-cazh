import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.36 - Isi Presentase Pencapaian dengan angka bulat 1-100 (mis. 75)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.36: Buka modal Tambah Riwayat → Isi Presentase Pencapaian dengan angka bulat 75 → Sistem menerima input (dianggap valid)', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Isi Presentase Pencapaian dengan Angka Bulat Valid (75)
    cy.get('[role="dialog"] input[name="percentage"]')
      .clear({ force: true })
      .type('75', { force: true })
      .should('have.value', '75');

    // 3. Verifikasi input valid & tidak memiliki aria-invalid=true
    cy.get('[role="dialog"] input[name="percentage"]').should('have.attr', 'aria-invalid', 'false');
  });
});
