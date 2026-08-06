import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.37 - Isi Presentase Pencapaian dengan angka desimal 1.5-95.5 (mis. 87.5)', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.37: Buka modal Tambah Riwayat → Isi Presentase Pencapaian dengan angka desimal 87.5 → Sistem menerima input (dianggap valid)', () => {
    // 1. Masuk ke Halaman Detail & Buka Modal Tambah Riwayat
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);
    cy.contains('button', 'Tambah Riwayat').should('be.visible').click({ force: true });
    cy.wait(1000);

    // 2. Isi Presentase Pencapaian dengan Angka Desimal Valid (87.5)
    cy.get('[role="dialog"] input[name="percentage"]')
      .clear({ force: true })
      .type('87.5', { force: true })
      .should('have.value', '87.5');

    // 3. Verifikasi input desimal valid & tidak memiliki aria-invalid=true
    cy.get('[role="dialog"] input[name="percentage"]').should('have.attr', 'aria-invalid', 'false');
  });
});
