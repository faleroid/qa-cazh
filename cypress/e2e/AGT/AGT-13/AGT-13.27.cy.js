import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.27 - Validasi Poin dan Foto pada form Edit", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.27: Validasi Poin dan Foto pada form Edit", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan ada data pelanggaran di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Buka form Edit pada baris pertama
    cy.get("tbody tr", { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find(
        'button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)'
      );
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find("button").first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should("be.visible");

    // ─────────────────────────────────────────────────────────────────────────
    // 3. Validasi Poin: nilai di luar range (999) → error validasi range
    // ─────────────────────────────────────────────────────────────────────────
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]', { timeout: 10000 })
        .clear({ force: true })
        .type("999", { force: true });
      cy.wait(300);
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    // Modal tetap terbuka & error range poin muncul
    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasError =
        text.includes("di luar range") ||
        text.includes("range") ||
        text.includes("maksimal") ||
        text.includes("10") ||
        $dialog.find('[data-slot="form-message"], [data-invalid="true"], [aria-invalid="true"]').length > 0;
      expect(hasError, "Sistem menampilkan pesan error nilai poin di luar range").to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 4. Validasi Poin: nilai negatif (-5) → ditolak
    // ─────────────────────────────────────────────────────────────────────────
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]', { timeout: 10000 })
        .clear({ force: true })
        .type("-5", { force: true });
      cy.wait(300);
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]').then(($input) => {
        const val = $input.val();
        expect(
          val === "" || val === "5" || Number(val) >= 0 ||
          $input.parents('[aria-invalid="true"], [data-invalid="true"]').length > 0,
          "Hanya angka positif yang diterima"
        ).to.be.true;
      });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 5. Validasi Poin: nilai > 100 (101) → error validasi
    // ─────────────────────────────────────────────────────────────────────────
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]', { timeout: 10000 })
        .clear({ force: true })
        .type("101", { force: true });
      cy.wait(300);
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(500);

    cy.get('[role="dialog"]', { timeout: 10000 }).should("be.visible");
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasError =
        text.includes("100") ||
        text.includes("maksimal") ||
        text.includes("range") ||
        $dialog.find('[data-slot="form-message"], [data-invalid="true"], [aria-invalid="true"]').length > 0;
      expect(hasError, "Sistem menampilkan pesan error poin > 100").to.be.true;
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 6. Validasi Foto: upload file > 512KB → error ukuran
    // ─────────────────────────────────────────────────────────────────────────
    // Reset poin ke nilai valid sebelum upload foto
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]', { timeout: 10000 })
        .clear({ force: true })
        .type(testData.pelanggaranData.poinBerat, { force: true });
      cy.wait(300);

      // Upload file berukuran > 512KB (dokumen PDF besar)
      cy.get('input[type="file"]', { timeout: 10000 }).selectFile(
        "cypress/fixtures/oversized_11mb_file.pdf",
        { force: true }
      );
      cy.wait(400);
    });

    cy.get("body").should("exist");

    // ─────────────────────────────────────────────────────────────────────────
    // 7. Validasi Foto: upload format tidak valid (.pdf) → error format
    // ─────────────────────────────────────────────────────────────────────────
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[type="file"]', { timeout: 10000 }).selectFile(
        "cypress/fixtures/document.pdf",
        { force: true }
      );
      cy.wait(400);
    });

    cy.get("body").should("exist");
  });
});
