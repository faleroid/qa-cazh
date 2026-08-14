import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.16 - Cek field pada form Tambah Riwayat Kesehatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.16: Cek field pada form Tambah Riwayat Kesehatan -> Menampilkan field Tanggal Kejadian, Indikator, Tindakan, Deskripsi, serta tombol Batal dan Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
      // 1. Label & Trigger Tanggal Kejadian (button name="date")
      cy.contains('label', /tanggal kejadian/i).should('be.visible');
      cy.get('button[name="date"]').should('be.visible');

      // 2. Label & Input Indikator (input name="indicator" placeholder="Masukkan Indikator")
      cy.contains('label', /indikator/i).should('be.visible');
      cy.get('input[name="indicator"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Indikator');

      // 3. Label & Input Tindakan (input name="action" placeholder="Masukkan Tindakan")
      cy.contains('label', /tindakan/i).should('be.visible');
      cy.get('input[name="action"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Tindakan');

      // 4. Label & Input Deskripsi (input name="description" placeholder="Masukkan Deskripsi")
      cy.contains('label', /deskripsi/i).should('be.visible');
      cy.get('input[name="description"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Masukkan Deskripsi');

      // 5. Tombol Batal & Simpan
      cy.contains('button', /batal/i).should('be.visible');
      cy.contains('button[type="submit"], button', 'Simpan').should('be.visible');
    });
  });
});
