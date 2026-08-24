import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.12 - Cek informasi range poin dan tipe pelanggaran di form", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.12: Cek informasi range poin dan tipe pelanggaran di form", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Pilih Tipe Pelanggaran terlebih dahulu dari dropdown
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

    // 2. Cek di bagian Poin Pelanggaran apakah placeholder input memuat informasi range poin (contoh: "1 - 10")
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.contains("label", /poin/i).should("be.visible");
      cy.get('input[name="point"]')
        .should("be.visible")
        .and("have.attr", "placeholder")
        .and("match", /\d+\s*-\s*\d+|1\s*-\s*10/);
    });
  });
});


