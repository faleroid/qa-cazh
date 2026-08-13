import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.12 - Kosongkan salah satu field required, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.12: Kosongkan salah satu field required, klik Simpan → Sistem menampilkan pesan error "Instansi wajib diisi"', () => {
    // 1. Buka Modal Import Progres
    cy.contains('button', 'Import Progres').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Klik tombol Simpan tanpa memilih Instansi
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(800);

    // 3. Verifikasi presisi pesan error "Instansi wajib diisi"
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.contains('[data-slot="form-message"]', 'Instansi wajib diisi').should('be.visible');
    });
  });
});
