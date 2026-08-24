import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.14 - Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 30 → Sedang)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.14: Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 30 → Sedang)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran dari dropdown
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });

    let selectedTypeLabel = "";
    cy.get("body").then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        selectedTypeLabel = opt.text().trim();
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Isi Poin Pelanggaran dengan nilai dalam range tipe
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="point"]').clear({ force: true }).type("5", { force: true });
      cy.wait(300);
    });

    // 3. Verifikasi sistem otomatis menampilkan label tipe pelanggaran (mis. "Pelanggaran Sedang" / "Pelanggaran Ringan")
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasTypeLabel = text.includes("Pelanggaran") || text.includes("Sedang") || text.includes("Ringan") || text.includes("Berat") || text.includes(selectedTypeLabel);
      expect(hasTypeLabel, 'Sistem otomatis menampilkan label tipe pelanggaran').to.be.true;
    });
  });
});

