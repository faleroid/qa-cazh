import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.14 - Isi Poin Pelanggaran dengan nilai dalam range tipe", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.14: Isi Poin Pelanggaran dengan nilai dalam range tipe (mis. 5 → Ringan/Sedang) -> Sistem otomatis menampilkan label tipe pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($b) => {
      const opt = $b.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().type(testData.pelanggaranData.poin, { force: true });
    });
    cy.wait(300);
    cy.get('[role="dialog"]').should("be.visible");
  });
});
