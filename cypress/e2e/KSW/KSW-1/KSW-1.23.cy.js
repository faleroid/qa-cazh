import ProgressActivityPage from '../../../pages/ProgressActivityPage';

describe('KSW-1.23 - Kosongkan salah satu field required, klik Simpan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.23: Isi Instansi & Anggota, namun kosongkan salah satu field required (Nama Progres Kegiatan) → Klik Simpan → Form gagal dikirim & pesan error required tampil', () => {
    // 1. Buka Modal Tambah Progres Kegiatan
    cy.contains('button', 'Tambah Progres Kegiatan').should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.get('[role="dialog"]').should('be.visible');

    // 2. Isi Field Required 1: Instansi
    cy.get('[role="dialog"] button[data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(600);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Academy QA Engineer').click({ force: true });
    cy.wait(800);

    // 3. Isi Field Required 2: Anggota (Rocky Gibraltar)
    cy.get('[role="dialog"] input[placeholder="Masukan Nomor Kartu atau Nama"]')
      .click({ force: true })
      .clear()
      .type('Rocky Gibraltar');
    cy.wait(1200);
    cy.get('div.absolute.z-50 button').first().click({ force: true });
    cy.wait(800);

    // 4. Kosongkan HANYA 1 Field Required: Nama Progres Kegiatan
    cy.get('[role="dialog"] input[name="name"]').clear();

    // 5. Klik Simpan
    cy.contains('[role="dialog"] button', 'Simpan').click({ force: true });
    cy.wait(800);

    // 6. Verifikasi ketat: Modal tetap terbuka dan pesan error validasi required pada Nama Progres Kegiatan tampil
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.get('.text-destructive, [data-slot="form-message"], [data-invalid="true"]').should('exist');
    });
  });
});
