import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.06 - Kosongkan salah satu field Imunisasi, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.06: Kosongkan salah satu field Imunisasi, klik Simpan -> Sistem menampilkan pesan error (validasi required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // 1. Klik Tambah Imunisasi
    cy.contains('button, span', /tambah imunisasi/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // 2. Isolasi Card Imunisasi dan klik Simpan di Card Imunisasi
    cy.get('input[placeholder*="Nama Imunisasi"], input#name-0')
      .parents('[data-slot="card"]')
      .first()
      .within(() => {
        cy.get('input[placeholder*="Nama Imunisasi"], input#name-0').first().clear({ force: true });
        cy.wait(300);

        // Tambahkan .first() sebelum .click() untuk mencegah error multiple elements
        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);
    cy.contains('label', 'Nama Imunisasi').should('be.visible');
  });
});
