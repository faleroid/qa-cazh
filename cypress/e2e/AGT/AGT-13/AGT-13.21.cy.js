import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.21 - Isi semua field required + Foto valid, klik Simpan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.21: Isi semua field required + Foto valid, klik Simpan", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();
    cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true });
    cy.wait(600);

    // 1. Date trigger
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[name="date"]').first().click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($body) => {
      const dayBtn = $body.find('table.rdp-month_grid tbody button, [role="gridcell"] button').filter(':contains("15"), :contains("10"), :contains("1")').first();
      if (dayBtn.length) {
        cy.wrap(dayBtn).click({ force: true });
        cy.wait(300);
      }
    });

    // 2. Tipe Pelanggaran
    cy.get('[role="dialog"]', { timeout: 10000 }).within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]').first().click({ force: true });
      cy.wait(300);
    });
    cy.get('body').then(($body) => {
      const opt = $body.find('[role="option"], [data-slot="select-item"]').first();
      if (opt.length) {
        cy.wrap(opt).click({ force: true });
        cy.wait(300);
      }
    });

    // 3. Form input fields
    cy.get('[role="dialog"]').within(() => {
      // Kategori
      cy.get('input[name="category"], input[placeholder*="tata tertib"]').first().clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);

      // Poin
      cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type(testData.pelanggaranData.poin, { force: true });
      cy.wait(200);

      // Deskripsi
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(testData.pelanggaranData.deskripsi, { force: true });
      cy.wait(200);

      // Sanksi (name="penalty")
      cy.get('input[name="penalty"], input[placeholder*="Peringatan"]').first().clear({ force: true }).type(testData.pelanggaranData.sanksi, { force: true });
      cy.wait(200);

      // Upload Valid Foto
      cy.get('input[type="file"]').first().selectFile('cypress/fixtures/signature.png', { force: true });
      cy.wait(300);

      // Submit
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    cy.wait(1500);
    cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
  });
});

