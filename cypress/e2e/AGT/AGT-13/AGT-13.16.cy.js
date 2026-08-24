import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.16 - Isi Poin Pelanggaran dengan nilai negatif (mis. -5)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.16: Isi Poin Pelanggaran dengan nilai negatif (mis. -5)", () => {
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

    // 3. Isi SELURUH field form, tetapi dengan Poin negatif (-5)
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="category"]').clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);
      cy.get('input[name="point"]').clear({ force: true }).type("-5", { force: true }); // Negative point
      cy.wait(200);
      cy.get('input[name="description"]').clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);
      cy.get('input[name="penalty"]').clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // 5. Verifikasi modal tetap terbuka & nilai negatif ditolak
    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]').then(($input) => {
        const val = $input.val();
        expect(val === "" || val === "5" || Number(val) >= 0 || $input.parents('[aria-invalid="true"], [data-invalid="true"]').length > 0, "Hanya angka positif yang diterima").to.be.true;
      });
    });
  });
});

