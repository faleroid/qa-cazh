import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.13 - Kosongkan salah satu field required, klik Simpan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.13: Kosongkan salah satu field required, klik Simpan", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    cy.get("body").then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Isi field lainnya, tetapi KOSONGKAN Sanksi (input[name="penalty"])
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type(testData.pelanggaranData.poin, { force: true });
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }); // Kosongkan salah satu field
      cy.wait(200);

      // 3. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 4. Verifikasi modal tetap terbuka karena validasi error required pada field yang kosong
    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasValidation = text.includes("wajib") || text.includes("harus diisi") || text.includes("required") || $dialog.find('[aria-invalid="true"], [data-invalid="true"], [data-slot="form-message"]').length > 0;
      expect(hasValidation, "Pesan validasi required muncul untuk field yang dikosongkan").to.be.true;
    });
  });
});

