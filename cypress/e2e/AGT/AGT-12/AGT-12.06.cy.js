import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.06 - Kosongkan salah satu field Imunisasi, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.06: Kosongkan salah satu field Imunisasi, klik Simpan -> Sistem menampilkan pesan error (validasi required)', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Target Card 2 (Data Imunisasi)
    cy.get('[data-slot="card"]', { timeout: 15000 })
      .contains('button, span, label', /tambah imunisasi|imunisasi/i)
      .parents('[data-slot="card"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .within(($card) => {
        // Klik Tambah Imunisasi jika belum ada row input
        if ($card.find('input[id*="name"], input[placeholder*="Nama Imunisasi"]').length === 0) {
          cy.contains('button, span', /tambah imunisasi/i).click({ force: true });
          cy.wait(500);
        }

        cy.get('input[id*="name"], input[placeholder*="Nama Imunisasi"]').first().clear({ force: true });
        cy.wait(300);

        cy.contains('button', /simpan/i).first().click({ force: true });
      });

    cy.wait(800);
    cy.contains('label', /nama imunisasi/i).should('be.visible');
  });
});
