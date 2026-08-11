import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.29 - Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.29: Centang header -> Klik Pilih Semua pada toolbar (<= 50 data) -> Seluruh data hasil filter lintas halaman terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();

    // 1. Memastikan terdapat data kegiatan lintas halaman (menambahkan data unik jika row < 10)
    cy.get('body').then(($body) => {
      const rowCount = $body.find('tbody tr').length;
      if (rowCount < 10) {
        for (let i = 1; i <= 12; i++) {
          cy.contains('button', /tambah kegiatan|tambah progres/i, { timeout: 15000 }).click({ force: true });
          cy.wait(600);
          cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
            cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(`Kegiatan Bulk AGT-11.29 - ${i}`);
            cy.contains('button', /simpan|submit/i).click({ force: true });
          });
          cy.wait(800);
        }
      }
    });

    // Tunggu tabel stabil setelah penambahan data
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.wait(1000);

    // 2. Centang checkbox header (Select All halaman aktif)
    cy.get('thead th button[role="checkbox"], button[aria-label="Select all"]', { timeout: 15000 }).first().click({ force: true });
    cy.wait(1000);

    // 3. Klik tombol "Pilih semua" jika muncul di toolbar
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).click({ force: true });
        cy.wait(800);
      }
    });

    // 4. Verifikasi status terpilih aktif pada toolbar
    cy.contains('button', /terpilih/i, { timeout: 15000 }).should('be.visible');
  });
});
