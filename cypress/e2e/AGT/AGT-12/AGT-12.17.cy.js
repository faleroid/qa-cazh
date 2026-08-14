import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.17 - Kosongkan salah satu field required, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.17: Kosongkan salah satu field required (misal: Tindakan dikosongkan), klik Simpan -> Menampilkan pesan error validasi [data-slot="form-message"] pada field tersebut', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .click({ force: true });
    cy.wait(600);

    // 1. Klik Simpan tanpa mengisi field sama sekali
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });
    cy.wait(400);

    // Assert elemen data-invalid="true" & pesan error validasi data-slot="form-message"
    cy.get('[role="dialog"]').within(() => {
      cy.get('[data-slot="form-item"][data-invalid="true"]').should('exist');
      cy.get('[data-slot="form-message"]')
        .should('be.visible')
        .and('contain.text', 'wajib diisi');

      cy.get('[data-slot="form-message"]').should('contain.text', 'Tanggal Kejadian wajib diisi');
      cy.get('[data-slot="form-message"]').should('contain.text', 'Indikator wajib diisi');
      cy.get('[data-slot="form-message"]').should('contain.text', 'Tindakan wajib diisi');
    });

    // 2. Isi Tanggal Kejadian & Indikator, namun biarkan Tindakan kosong
    cy.get('button[name="date"]').click({ force: true });
    cy.wait(400);

    cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")')
      .first()
      .click({ force: true });
    cy.wait(300);

    cy.get('[data-slot="dialog-title"]').click({ force: true });
    cy.wait(300);

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="indicator"]').clear({ force: true }).type(testData.riwayatData.indikasi, { force: true });
      cy.get('input[name="action"]').clear({ force: true }); // Dikosongkan
      cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
    });

    cy.wait(400);

    // Assert dialog tetap terbuka & pesan error spesifik "Tindakan wajib diisi" muncul
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('[data-slot="form-message"]').should('contain.text', 'Tindakan wajib diisi');
    });
  });
});
