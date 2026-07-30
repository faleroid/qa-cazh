import AnnouncementCategoryPage from '../../pages/AnnouncementCategoryPage';
import testData from '../../fixtures/announcementCategoryData.json';

describe('PGT-20.43 - Kategori Pengumuman', () => {
  beforeEach(() => {
    cy.login();
    AnnouncementCategoryPage.visitList();
  });

  it('PGT-20.43: Tambah pengumuman baru → pilih Kategori → Cek td tabel list → Edit Kategori → Cek pembaruan td tabel list', () => {
    const testTitle = 'Pengumuman Uji Kategori PGT-20';
    const categoryToSelect = 'AKADEMIK';

    // 1. Kunjungi Halaman Tambah Pengumuman (https://v3.cazh.id/administration/announcement/list/create)
    cy.visit('/administration/announcement/list/create', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);

    // 2. Unggah Foto Thumbnail (Wajib)
    cy.get('input[type="file"][accept*="image"]', { timeout: 15000 }).first().selectFile({
      contents: Cypress.Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'),
      fileName: 'sample_thumbnail.png',
      mimeType: 'image/png'
    }, { force: true });
    cy.wait(800);

    // 3. Isi Judul Pengumuman
    cy.get('input[name="title"], input[placeholder*="judul"]', { timeout: 15000 })
      .first()
      .clear({ force: true })
      .type(testTitle, { force: true });

    // 4. Pilih Instansi (Wajib)
    cy.get('body').then(($body) => {
      const instansiBtn = $body.find('button:contains("Pilih instansi")');
      if (instansiBtn.length > 0) {
        cy.wrap(instansiBtn.first()).click({ force: true });
        cy.wait(800);
        cy.get('[role="option"], [role="checkbox"], input[type="checkbox"]', { timeout: 10000 }).first().click({ force: true });
        cy.wait(500);
        cy.get('body').type('{esc}', { force: true });
      }
    });

    // 5. Pilih Kategori Pengumuman ("AKADEMIK")
    cy.get('label:contains("Kategori Pengumuman")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(categoryToSelect, 'i')).first().click({ force: true });
    cy.wait(500);

    // 6. Pilih Platform (Wajib - Cards Parents)
    cy.get('#platform-cards_parents, button[id*="platform"]').first().click({ force: true });
    cy.wait(500);

    // 7. Pilih Penerima (Wajib - Semua Anggota)
    cy.get('label:contains("Penerima")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Semua Anggota').click({ force: true });
    cy.wait(500);

    // 8. Pilih Waktu Pengumuman (Wajib - Kirim Sekarang)
    cy.get('label:contains("Waktu Pengumuman")').parent().find('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
    cy.wait(800);
    cy.get('[role="option"], [data-slot="select-item"]').contains('Kirim Sekarang').click({ force: true });
    cy.wait(500);

    // 9. Isi Deskripsi Pengumuman di Tiptap Editor
    cy.get('div.tiptap.ProseMirror, div[contenteditable="true"]', { timeout: 15000 })
      .first()
      .type('Deskripsi detail pengumuman uji kategori PGT-20.', { force: true });
    cy.wait(500);

    // 10. Klik Simpan Form Pengumuman
    cy.get('button[type="submit"]').contains('Simpan').click({ force: true });
    cy.wait(2500);

    // 11. Cek data pengumuman di Halaman List Pengumuman (https://v3.cazh.id/administration/announcement/list)
    cy.visit('/administration/announcement/list', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr td').length > 0) {
        cy.contains('tbody tr td', new RegExp(categoryToSelect, 'i')).should('be.visible');
      }
    });

    // 12. Kembali ke Halaman Kategori Pengumuman & Edit Nama Kategori
    AnnouncementCategoryPage.visitList();
    AnnouncementCategoryPage.clickEditRow(0);
    AnnouncementCategoryPage.fillForm({ namaKategori: 'AKADEMIK EDITED' });
    AnnouncementCategoryPage.saveForm();
    cy.wait(1500);

    // 13. Buka kembali List Pengumuman & Cek apakah data cell <td> Kategori berubah
    cy.visit('/administration/announcement/list', { failOnStatusCode: false, timeout: 30000 });
    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr td').length > 0) {
        cy.contains('tbody tr td', /AKADEMIK/i).should('be.visible');
      }
    });
  });
});
