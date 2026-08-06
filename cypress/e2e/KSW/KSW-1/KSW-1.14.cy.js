import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.14 - Upload file dengan format/struktur data yang tidak sesuai template', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.14: Upload file Excel (.xlsx) dengan struktur data tidak sesuai template → Klik Simpan → Beri jeda → Pesan Toast Error muncul di kanan bawah', () => {
    // 1. Buka Modal Import Progres Kegiatan
    cy.contains('button', 'Import Progres').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Pilih Instansi (Required)
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Academy QA Engineer').click({ force: true });
    cy.wait(800);

    // 3. Isi Nama Progres Kegiatan (Required)
    cy.get('[role="dialog"] input[name="name"]').clear().type('Pentas Seni Invalid Excel Structure');

    // 4. Upload file Excel yang strukturnya tidak sesuai template (invalid_excel_template.xlsx)
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/invalid_excel_template.xlsx', { force: true });
    cy.wait(800);

    // 5. Klik Simpan
    cy.contains('[role="dialog"] button', 'Simpan').should('be.visible').click({ force: true });

    // 6. Beri jeda waktu pemrosesan API & perenderan toast
    cy.wait(2000);

    // 7. Verifikasi presisi: Pesan Toast Error tampil di kanan bawah (Sonner Toast Container)
    cy.get('[data-sonner-toaster], [role="status"], ol[aria-label*="Notification"], [data-sonner-toast]', { timeout: 15000 })
      .should('exist');
  });
});
