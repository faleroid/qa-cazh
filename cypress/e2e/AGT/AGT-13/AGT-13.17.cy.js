import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.17 - Isi Poin Pelanggaran dengan angka > 100 (mis. 101)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.17: Isi Poin Pelanggaran dengan angka > 100 (mis. 101)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Tanggal Kejadian
    StudentDetailPage.fillTanggalKejadian();

    // 2. Pilih Tipe Pelanggaran
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

    // 3. Isi SELURUH field form, tetapi dengan Poin > 100 (101)
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type("101", { force: true }); // Point > 100
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & Poin > 100 ditolak / error validasi range poin muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const isRejected = text.includes("100") || text.includes("range") || text.includes("di luar") || text.includes("maksimal") || $dialog.find('[data-slot="form-message"], [aria-invalid="true"], [data-invalid="true"]').length > 0;
      expect(isRejected, "Poin > 100 ditolak atau menampilkan pesan validasi").to.be.true;
    });
  });
});

