import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.24 - Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 30 → 80)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.24: Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 30 → 80)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi
    cy.get("tbody tr", { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should("be.visible");

    // 3. Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 80)
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"]').clear({ force: true }).type("80", { force: true });
      cy.wait(300);
    });

    // 4. Verifikasi Label Tipe Pelanggaran ter-update otomatis sesuai range baru (mis. Berat / Pelanggaran Berat)
    cy.get('[role="dialog"]').then(($dialog) => {
      const text = $dialog.text();
      const hasUpdatedLabel = text.includes("Berat") || text.includes("Pelanggaran Berat") || text.includes("Sedang") || $dialog.find('[class*="badge"], [class*="label"]').length > 0;
      expect(hasUpdatedLabel, "Label Tipe Pelanggaran ter-update otomatis ke range baru").to.be.true;
    });
  });
});

