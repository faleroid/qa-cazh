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
    StudentDetailPage.fillTanggalKejadian();

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

    // 3. Form input fields dengan data nyata pelanggaran sekolah
    cy.get('[role="dialog"]').within(() => {
      // Kategori
      cy.get('input[name="category"], input[placeholder*="tata tertib"]').first().clear({ force: true }).type(testData.pelanggaranData.kategori, { force: true });
      cy.wait(200);

      // Poin (Nilai valid 25 dalam range 21 - 40)
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
      
      // Jeda 5 detik setelah upload foto sebelum menekan tombol Simpan
      cy.wait(5000);

      // Submit
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });


    cy.wait(3000);
    cy.get('[role="dialog"]', { timeout: 20000 }).should('not.exist');

  });
});



